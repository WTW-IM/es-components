const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

module.exports = {
  srcDir,
  baseComponentDir: path.join(srcDir, 'components')
};
