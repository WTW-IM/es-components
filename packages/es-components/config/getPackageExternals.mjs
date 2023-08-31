import pkg from '../package.json' assert { type: 'json' };

export function getPackageExternals() {
  const peerDepNames = Object.keys(pkg.peerDependencies || {});
  const peerDepExternal = peerDepNames.map(
    external => new RegExp(`^${external}(/.+)?$`)
  );
  const depExternal = [...Object.keys(pkg.dependencies || {})];
  const external = [
    ...peerDepExternal,
    ...depExternal.map(external => new RegExp(`^${external}(/.+)?$`))
  ];

  return {
    external,
    depExternal,
    peerDepExternal
  };
}
