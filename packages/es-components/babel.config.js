module.exports = function(api) {
  const modules = api.env('test') ? 'auto' : false;

  const presets = [
    [
      'wtw-im',
      {
        extractFormatMessage: false,
        transformFormatMessage: false,
        env: { corejs: 3 }
      }
    ]
  ];

  const plugins = [
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining'
  ];

  return {
    ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
    sourceType: 'unambiguous',
    presets,
    plugins
  };
};
