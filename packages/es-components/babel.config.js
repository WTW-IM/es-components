module.exports = function (api) {
  const inProd = api.env('production');

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: { ie: '11' },
        useBuiltIns: 'usage',
        corejs: '3.32'
      }
    ],
    [
      '@babel/preset-typescript',
      { isTSX: true, allExtensions: true, dts: true }
    ],
    '@babel/preset-react'
  ];

  let plugins = [
    [
      'module-resolver',
      {
        alias: {
          'es-components-shared-types': '../../shared/types/src/index.ts'
        }
      }
    ],
    [
      'styled-components',
      {
        ssr: false,
        displayName: false
      }
    ],
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-object-rest-spread',
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-optional-chaining'
  ];

  if (inProd) {
    plugins = [
      ...plugins,
      [
        'transform-react-remove-prop-types',
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
      ]
    ];
  }

  return {
    ignore: [/[/\\]core-js/, /@babel[/\\]runtime/],
    sourceType: 'unambiguous',
    presets,
    plugins
  };
};
