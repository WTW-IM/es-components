module.exports = function (source) {
  const { rawRequest } = this._module;
  if (/orig-sg-components/.test(rawRequest)) {
    return source;
  }

  const importRequest = rawRequest.replace(
    'rsg-components',
    'orig-sg-components'
  );

  const err = new Error(
    `Do not import rsg-components from es-components. To avoid circular references in webpack, use orig-sg-components instead. Replace \`${rawRequest}\` with \`${importRequest}\`.`
  );
  throw err;
};
