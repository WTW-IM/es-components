import pkg from '../package.json' with { type: 'json' };

// These direct dependencies must always be bundled instead of left external,
// even though they're listed in "dependencies". They're imported via bare
// subpaths that Node's strict ESM resolver cannot resolve on its own (unlike
// CJS/bundler resolution, which tolerates missing extensions and directory
// imports):
//   - get-root-node-polyfill/implement  (extensionless subpath)
//   - react-transition-group/Transition (directory import, no index resolution)
//   - text-mask-addons/dist/createAutoCorrectedDatePipe, .../createNumberMask (extensionless)
// Leaving them external breaks native ESM consumers (e.g. esm.sh).
const ALWAYS_BUNDLED_DEPS = [
  'get-root-node-polyfill',
  'react-transition-group',
  'text-mask-addons'
];

export function getPackageExternals() {
  const peerDepNames = Object.keys(pkg.peerDependencies || {});
  const peerDepExternal = peerDepNames.map(
    external => new RegExp(`^${external}(/.+)?$`)
  );
  const depExternal = Object.keys(pkg.dependencies || {}).filter(
    dep => !ALWAYS_BUNDLED_DEPS.includes(dep)
  );
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
