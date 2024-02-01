const getIsProduction = args =>
  args.configEnv === 'prod' ||
  args.env === 'prod' ||
  process.env.MAIN_BUILD === 'true';

const getAssetsUrl = args => {
  const isProduction = getIsProduction(args);
  const isLocal =
    !isProduction && (args.configEnv === 'local' || args.env === 'local');
  const assetsUrl = isProduction
    ? 'https://app.viabenefits.com/static/cdn/es-assets/'
    : isLocal
    ? 'https://bdaimdna26fetoolcdnsa.blob.core.windows.net/es-assets/'
    : `https://my.${process.env.ENVIRONMENT}.viabenefits.com/static/cdn/es-assets/`;

  return assetsUrl;
};

module.exports = {
  getAssetsUrl,
  getIsProduction
};
