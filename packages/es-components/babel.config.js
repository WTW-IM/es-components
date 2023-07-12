module.exports = function (api) {
  const inProd = api.env('production');

  const presets = [
    [
      'wtw-im',
      {
        extractFormatMessage: false,
        transformFormatMessage: false,
        env: { corejs: 3 }
      }
    ],
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
    }
  ];
  const plugins = [
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
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
