const fs = require('fs');
const path = require('path');

module.exports = function (fileName) {
  const cwd = process.cwd();
  const targetFile = path.join(cwd, fileName);
  const fileText = fs.readFileSync(targetFile, 'utf8');
  console.log(`Replacing const with var in ${targetFile}...`);
  const newText = fileText.replace(/ const/g, ' var');
  fs.writeFileSync(targetFile, newText);
};
