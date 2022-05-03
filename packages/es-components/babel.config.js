module.exports = function (api) {
  const modules = api.env("test") ? "auto" : false;
  const inProd = api.env("production");

  const presets = [
    [
      "wtw-im",
      {
        extractFormatMessage: false,
        transformFormatMessage: false,
        env: { corejs: 3 },
      },
    ],
  ];

  const removePropTypesPlugin = [
    "babel-plugin-transform-react-remove-prop-types",
    { removeImport: true },
  ];
  const plugins = [
    ["@babel/plugin-transform-runtime", { corejs: 3 }],
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-optional-chaining",
  ].concat(inProd ? [removePropTypesPlugin] : []);

  return {
    ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
    sourceType: "unambiguous",
    presets,
    plugins,
  };
};
