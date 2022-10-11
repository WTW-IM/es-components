const { program } = require('commander');
const core = require('@actions/core');

program.option('--results <string>');
program.parse(process.argv);

const options = program.opts();

function generateBadgeUrl(errors, messageLength) {
  const label = `${messageLength - errors}%2F${messageLength}`;
  const color = errors ? 'red' : 'brightgreen';
  return `![commitlint results](https://img.shields.io/badge/${label}-Commitlint-${color})`;
}

const parsedResults = JSON.parse(options.results);
const errors = parsedResults.filter(({ errors }) => errors.length).length;
const badgeUrl = generateBadgeUrl(errors, parsedResults.length);
let message = `All commit messages are correctly formatted.`;
if (errors) {
  message = `We following commit messages do not meet our commit convention. Please reword these commits for correct versioning and changelog generation.

${parsedResults.map(lintResult => `* ${lintResult.message} ${lintResult.errors.map(error => `
    * ${error}`)}
`)}`;
}

core.setOutput('msg', `${badgeUrl}

${message}`);
