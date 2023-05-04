const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { glob } = require('glob');
const DEFAULT_HTML = '<html><body></body></html>';
const jsdom = new JSDOM(DEFAULT_HTML, {
  url: 'https://wtw-im.github.io/es-components',
  referrer: 'https://wtw-im.github.io',
  contentType: 'text/html',
  userAgent: 'node.js',
  includeNodeLocations: true
});
const { window } = jsdom;
const { Node } = window;
global.Node = Node;

const esComponents = require('../cjs');

function logDebug(...args) {
  if (process.env.DEBUG) console.log(...args);
}

function getTypeFileFromFolder(componentName, folder) {
  const files = fs.readdirSync(folder);
  return files.find(f => f === `${componentName}.d.ts`);
}

function findTypeFile(componentName, componentPath) {
  logDebug(`Finding type file for ${componentName} in ${componentPath}`);
  const file = getTypeFileFromFolder(componentName, componentPath);
  if (file) return path.join(componentPath, file);

  const files = fs
    .readdirSync(componentPath, { withFileTypes: true })
    .filter(f => f.isDirectory())
    .map(f => f.name);

  const result = files.find(f =>
    findTypeFile(componentName, path.join(componentPath, f))
  );
  if (result)
    return findTypeFile(componentName, path.join(componentPath, result));
}

const getComponentDeclarationRegex = componentName =>
  new RegExp(` ${componentName}\\((?!props: InferProps)[^\\)]+\\):`, 'ms');

const getForwardedConstDeclarationRegex = componentName =>
  new RegExp(
    `const ${componentName}: React.ForwardRefExoticComponent<React.RefAttributes<any>>`,
    'ms'
  );

function fileContainsComponentDeclaration(componentName, fileName) {
  const fileText = fs.readFileSync(fileName, 'utf8');
  const componentRegex = getComponentDeclarationRegex(componentName);
  return fileText.match(componentRegex) ? fileName : null;
}

function findTypeFileContaining(componentName, componentPath) {
  logDebug(`Finding type file for ${componentName} in ${componentPath}`);
  const files = fs.readdirSync(componentPath, { withFileTypes: true });
  const hardfiles = files.filter(f => !f.isDirectory()).map(f => f.name);

  const result = hardfiles.find(f =>
    fileContainsComponentDeclaration(componentName, path.join(componentPath, f))
  );

  if (result) {
    return path.join(componentPath, result);
  }

  const directories = files.filter(f => f.isDirectory()).map(f => f.name);

  const foundDir = directories.find(f =>
    findTypeFileContaining(componentName, path.join(componentPath, f))
  );

  if (foundDir) {
    return findTypeFileContaining(
      componentName,
      path.join(componentPath, foundDir)
    );
  }
}

const addTopText = (regex, replaceText, targetText) =>
  targetText.match(regex) ? targetText : `${replaceText}${targetText}`;

const inferImportText = 'import { InferProps } from "prop-types";\n\n';
const inferImportRegex = new RegExp(`^${inferImportText}`, 'ms');
const importInferProps = text =>
  addTopText(inferImportRegex, inferImportText, text);

const importLoadingStateResultText =
  'import { LoadingStateWhileRunningResult } from "./components/controls/buttons/features/withLoadingStateWhileRunning";\n\n';
const importLoadingStateResultRegex = new RegExp(
  `^${importLoadingStateResultText}`,
  'ms'
);
const importLoadingStateResultType = text =>
  addTopText(importLoadingStateResultRegex, importLoadingStateResultText, text);

function updateLoadingButton(componentName, fileName) {
  const fileText = fs.readFileSync(fileName, 'utf8');
  const componentRegex = new RegExp(`${componentName}: .*`);
  let newText = importLoadingStateResultType(fileText);
  newText = importInferProps(newText);

  newText = newText.replace(
    componentRegex,
    `${componentName}: LoadingStateWhileRunningResult<InferProps<typeof ${componentName.replace(
      'Loader',
      ''
    )}.propTypes>>;`
  );

  logDebug(componentName, fileName);
  logDebug('-------------------');
  logDebug(newText);

  fs.writeFileSync(fileName, newText, 'utf8');
}

function replaceTypeFile(componentName, typeFilePath) {
  const fileText = fs.readFileSync(typeFilePath, 'utf8');
  const componentRegex = getComponentDeclarationRegex(componentName);
  const forwardedConstRegex = getForwardedConstDeclarationRegex(componentName);
  let newText = importInferProps(fileText);
  newText = newText.replace(
    componentRegex,
    ` ${componentName}(props: React.PropsWithChildren<InferProps<typeof ${componentName}.propTypes>>):`
  );

  newText = newText.replace(
    forwardedConstRegex,
    `const ${componentName}: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<InferProps<typeof propTypes>>, "ref"> & React.RefAttributes<any>>`
  );

  fs.writeFileSync(typeFilePath, newText, 'utf8');
}

const Drawer = esComponents.Drawer;
const Modal = esComponents.Modal;
const TabPanel = esComponents.TabPanel;
const DateInput = esComponents.DateInput;
const extraComponentsObj = {
  DrawerPanel: Drawer.Panel,
  DrawerItem: Drawer.Item,
  DrawerItemOpener: Drawer.ItemOpener,
  DrawerItemBody: Drawer.ItemBody,
  ModalHeader: Modal.Header,
  ModalBody: Modal.Body,
  ModalFooter: Modal.Footer,
  Tab: TabPanel.Tab,
  Day: DateInput.Day,
  Month: DateInput.Month,
  Year: DateInput.Year
};

const loaderButtons = [
  'LoaderButton',
  'LoaderOutlineButton',
  'LoaderLinkButton',
  'LoaderActionButton'
];

const extraComponents = Object.entries(extraComponentsObj);
const allExportedComponents = Object.entries(esComponents).filter(
  ([name, component]) => !loaderButtons.includes(name) && component.propTypes
);

const allComponents = [...allExportedComponents, ...extraComponents];

for (const [componentName] of allComponents) {
  let typeFile = findTypeFile(
    componentName,
    path.join(__dirname, '../src/types')
  );

  if (!typeFile) {
    console.warn(`type file not found for ${componentName}. searching...`);
    typeFile = findTypeFileContaining(
      componentName,
      path.join(__dirname, '../src/types')
    );
  }

  if (!typeFile) {
    console.error('No type found for', componentName);
    continue;
  }

  replaceTypeFile(componentName, typeFile);
}

for (const inferredType of loaderButtons) {
  updateLoadingButton(
    inferredType,
    path.join(__dirname, '../src/types/index.d.ts')
  );
}

async function addChildren() {
  const declarationFiles = await glob('src/types/**/*.d.ts');
  for (const declarationFile of declarationFiles) {
    const fileText = fs.readFileSync(declarationFile, 'utf8');
    const newText = fileText.replace(
      /React.ForwardRefExoticComponent<React.RefAttributes<any>>/g,
      'React.ForwardRefExoticComponent<React.PropsWithChildren<any> & React.RefAttributes<any>>'
    );

    fs.writeFileSync(declarationFile, newText, 'utf8');
  }
}

addChildren();
