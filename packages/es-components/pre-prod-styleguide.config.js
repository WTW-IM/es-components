const path = require('path');
const fs = require('fs');
const origConfig = require('./styleguide.config');

const styleguideDir = 'docs/pre-prod';
const assetsDir = path.join(__dirname, styleguideDir);
fs.mkdirSync(assetsDir, { recursive: true });
const fd = fs.openSync(path.join(assetsDir, 'temp.txt'), 'a');
fs.closeSync(fd);

module.exports = {
  ...origConfig,
  styleguideDir,
  assetsDir
};
