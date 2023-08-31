import fs from 'fs/promises';
import * as path from 'path';
import * as url from 'url';
import fetch from 'node-fetch';
import chalk from 'chalk';

chalk.level = 1;

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
  console.log(chalk.yellow('generating icon name type...'));
  const iconNames = await getIconNames();
  const iconArray = iconNames.join(', ');
  const iconType = `/* This file is auto-generated using \`npm run generate-icon-names\` */
export const iconNames = [${iconArray}] as const;
export type IconName = (typeof iconNames)[number];
`;
  console.log(chalk.bold.green('icon name type generated!'));
  return iconType;
}

export async function writeIconNameType() {
  const iconType = await generateIconNameType();
  console.log(chalk.yellow('writing icon name file...'));
  const iconTypePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'shared/types/src/IconNames.ts'
  );
  await fs.writeFile(iconTypePath, iconType);
  console.log(chalk.bold.green('icon name file written!'));
}
