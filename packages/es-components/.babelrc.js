const wtwConfig = {
  extractFormatMessage: false,
  transformFormatMessage: false,
  env: { modules: false }
};

if (process.env['NODE_ENV'] === 'test') {
  wtwConfig.env.modules = 'auto';
}

module.exports = {
  presets: [['wtw-im', wtwConfig]],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-export-default-from'
  ]
};
