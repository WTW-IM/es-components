const wtwPresetFunc = require('babel-preset-wtw-im');
const lodashPlugin = require('babel-plugin-lodash');

module.exports = function (api) {
  const inProd = api.env('production');
  const wtwPreset = wtwPresetFunc(api, {
    extractFormatMessage: false,
    transformFormatMessage: false,
    env: { corejs: '3.32' }
  });

  const presets = [
    ...wtwPreset.presets,
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
  ];

  const removePropTypesPlugin = [
    'babel-plugin-transform-react-remove-prop-types',
    {
      removeImport: true,
      ignoreFilenames: [
        'node_modules/styled-components',
        'controls/textbox',
        'controls/dropdown',
        'containers/popover',
        'controls/buttons',
        'controls/checkbox',
        'controls/radio-buttons',
        'controls/answer-group',
        'controls/Control',
        'controls/AdditionalHelp',
        'base/icons'
      ]
    },
    'es-components-remove-prop-types'
  ];
  const plugins = [
    ...wtwPreset.plugins.filter(p => p !== lodashPlugin),
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining'
  ].concat(inProd ? [removePropTypesPlugin] : []);

  return {
    ignore: [/[/\\]core-js/, /@babel[/\\]runtime/],
    sourceType: 'unambiguous',
    presets,
    plugins
  };
};
