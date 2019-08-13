module.exports = function(api) {
  const modules = api.env('test') ? 'auto' : false;

  const presets = [
    [
      'wtw-im',
      {
        extractFormatMessage: false,
        transformFormatMessage: false,
        env: {
          useBuiltIns: 'usage',
          corejs: 3,
          modules: modules
        }
      }
    ]
  ];

  const plugins = [
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    ['transform-react-remove-prop-types', { mode: 'wrap' }]
  ];

  return {
    ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
    sourceType: 'unambiguous',
    presets,
    plugins
  };
};
