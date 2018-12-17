const presets = [
  [
    'wtw-im',
    {
      extractFormatMessage: false,
      transformFormatMessage: false
    }
  ]
];

const plugins = [
  '@babel/plugin-proposal-export-default-from'
];

module.exports = { presets, plugins };
