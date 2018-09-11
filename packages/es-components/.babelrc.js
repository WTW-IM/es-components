const wtwConfig = {
  extractFormatMessage: false,
  transformFormatMessage: false
};

if (process.env['BABEL_ENV'] === 'es6') {
  wtwConfig.env = { modules: false };
}

module.exports = {
  presets: [['wtw-im', wtwConfig]],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-export-default-from'
  ]
};
