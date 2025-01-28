import * as util from 'util';
import * as path from 'path';
import { createRequire } from 'module';
import { exec as origExec } from 'child_process';
import chalk from 'chalk';

chalk.level = 1;

const exec = util.promisify(origExec);

export async function tscEsComponents() {
  const require = createRequire(import.meta.url);
  const tsconfigPath = path.normalize(
    require.resolve('../build.tsconfig.json')
  );
  const tscCommand = ['npx', 'tsc', '--build', `"${tsconfigPath}"`].join(' ');
  console.log(
    chalk.yellow('running tsc command'),
    chalk.bold.yellow(tscCommand)
  );
  try {
    await exec(tscCommand, {
      cwd: path.dirname(tsconfigPath),
      stdio: 'inherit'
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
  console.log(chalk.bold.green('tsc command succeeded!'));
}
