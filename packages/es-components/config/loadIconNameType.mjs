import fs from 'fs/promises';
import * as path from 'path';
import * as url from 'url';
import fetch from 'node-fetch';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function getIconNames() {
  const iconResponse = await fetch(
    'https://app.viabenefits.com/static/cdn/es-assets/icon-demo.html'
  );
  const iconRegex = /class="bds-icon bds-([a-z-]+)"/;
  const globalIconRegex = new RegExp(iconRegex, 'g');

  const iconDemoBody = await iconResponse.text();

  const allIcons = iconDemoBody.match(globalIconRegex);
  const iconNames = allIcons.map(icon => `"${icon.match(iconRegex)[1]}"`);
  return iconNames;
}

async function generateIconNameType() {
  const iconNames = await getIconNames();
  const iconNamesType = iconNames.join('\n  | ');
  const iconArray = iconNames.join(', ');
  const iconType = `/* This file is auto-generated using \`npm run generate-icon-names\` */
<<<<<<< Updated upstream
export type IconNames =
  | ${iconNamesType};
export const iconNames = [${iconArray}];`;
=======
export const iconNames = [${iconArray}] as const;
export type IconName = (typeof iconNames)[number];
`;
>>>>>>> Stashed changes
  return iconType;
}

export async function writeIconNameType() {
  const iconType = await generateIconNameType();
  console.log(iconType);
  const iconTypePath = path.join(
    __dirname,
    '..',
    'src/components/base/icons/IconNames.ts'
  );
  await fs.writeFile(iconTypePath, iconType);
}
