const wtwConfig = {
  extractFormatMessage: false,
  transformFormatMessage: false
};

module.exports = {
  presets: [['wtw-im', wtwConfig]],
  plugins: [
    '@babel/plugin-proposal-export-default-from'
  ]
};
