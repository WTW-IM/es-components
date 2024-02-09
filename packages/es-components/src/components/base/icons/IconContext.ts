import { createContext } from 'react';

class NodeError extends Error {
  public node: HTMLElement;

  constructor(
    node: HTMLElement,
    ...errorArgs: ConstructorParameters<typeof Error>
  ) {
    super(...errorArgs);
    this.node = node;
  }
}

const iconStyleAttribute = 'data-es-icon-styles';
let iconsAsset = `${ASSETS_PATH}icons.css`;

const subdomain = window.location.hostname.split('.')[1];
const environments = ['dev', 'qa', 'stage'] as const;
const local = 'localtest' as const;
if (environments.some(arr => arr === subdomain))
  iconsAsset = iconsAsset.replace('qa', subdomain);

if (local === subdomain)
  iconsAsset = iconsAsset.replace(
    'app.qa.viabenefits.com',
    'app.localtest.viabenefits.com:34300'
  );

const getExistingStyleTag = (node: HTMLElement) =>
  node.querySelector(`[${iconStyleAttribute}]`) ||
  node.querySelector(`link[href="${iconsAsset}"]:not([rel="preload"])`);

const createStyleTag = () => {
  const styleTag = document.createElement('link');
  styleTag.setAttribute(iconStyleAttribute, '');
  styleTag.setAttribute('rel', 'stylesheet');
  styleTag.setAttribute('href', iconsAsset);
  return styleTag;
};

const addTag = (node: HTMLElement, func: (node: HTMLElement) => void) => {
  try {
    const foundTag = getExistingStyleTag(node);
    if (foundTag) return foundTag;

    const tag = createStyleTag();
    func(tag);
    return tag;
  } catch (err) {
    const nodeError = new NodeError(
      node,
      'Failed to load icon styles on node',
      { cause: err }
    );
    console.error(nodeError); // eslint-disable-line no-console
    return undefined;
  }
};

const defaultIconContext: { initializedNodes: Array<HTMLElement> } = {
  initializedNodes: []
};

const documentAppend = (tag: HTMLElement) => document.head.append(tag);
const initializeBody = (node: HTMLElement) => {
  if (getExistingStyleTag(document.head)) return node;

  return addTag(node, documentAppend);
};

const initializeNode = (node: HTMLElement) => {
  // body must always be set up
  setup(document.body); // eslint-disable-line no-use-before-define
  return addTag(node, (tag: HTMLElement) => node.prepend(tag));
};

const setup = (node: HTMLElement | undefined) => {
  if (!node) return;

  const { initializedNodes } = defaultIconContext;

  if (initializedNodes.some(initializedNode => initializedNode === node))
    return;

  const isBody = node === document.body;

  (() =>
    (isBody ? initializeBody : initializeNode)(node) &&
    initializedNodes.push(node))();
};

const IconContext = createContext({ ...defaultIconContext, setup });

export default IconContext;
