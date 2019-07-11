module.exports = function(api) {
  const modules = api.env('test') ? 'auto' : false;

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: modules,
        debug: false
      }
    ],
    '@babel/preset-react'
  ];

  const plugins = [
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    'babel-plugin-lodash',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    ['transform-react-remove-prop-types', { mode: 'wrap' }],
    [
      'babel-plugin-styled-components',
      {
        ssr: false,
        displayName: false,
        fileName: false
      }
    ]
  ];

  return {
    ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
    sourceType: 'unambiguous',
    presets,
    plugins
  };
};
