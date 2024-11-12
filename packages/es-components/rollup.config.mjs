import * as path from 'path';
import babel from '@rollup/plugin-babel';
import wildcardExternal from '@oat-sa/rollup-plugin-wildcard-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import { createRequire } from 'module';
import { writeIconNameType } from './config/loadIconNameType.mjs';
import { getAssetsUrl, getIsProduction } from './config/assetsUrl.js';
import { getPackageExternals } from './config/getPackageExternals.mjs';
import { tscEsComponents } from './config/tscEsComponents.mjs';
import pkg from './package.json' with { type: 'json' };

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const processBanner = `
var process = {};
try {
  process = this.process ||
    (typeof window !== 'undefined' && window.process) ||
    (typeof global !== 'undefined' && global.process) ||
    {};
} catch {
  process = {};
}`;

const umdBanner = `
var self = this.styled ? this : self;
var globalThis = self || globalThis;
${processBanner}
`;

export default async args => {
  await Promise.all([writeIconNameType(), tscEsComponents()]);
  const isProduction = getIsProduction(args);
  const assets_url = getAssetsUrl(args);
  const require = createRequire(import.meta.url);

  const sharedTypesPath = path.dirname(
    require.resolve('../../shared/types/src/index.ts')
  );

  const { peerDepExternal, external } = getPackageExternals();

  return [
    {
      input: 'src/index.tsx',
      output: [
        {
          format: 'cjs',
          file: pkg.main,
          interop: 'compat',
          generatedCode: {
            reservedNamesAsProps: false
          },
          banner: processBanner
        },
        {
          format: 'esm',
          file: pkg.module,
          banner: processBanner
        }
      ],
      external,
      plugins: [
        wildcardExternal(['core-js/**', 'text-mask-addons/**']),
        commonjs({ include: [/node_modules/, sharedTypesPath], extensions }),
        resolve({
          extensions,
          preferBuiltins: true
        }),
        babel({
          exclude: ['node_modules/**'],
          babelHelpers: 'runtime',
          extensions
        }),
        replace({
          ASSETS_PATH: JSON.stringify(assets_url),
          preventAssignment: true
        })
      ]
    },
    {
      input: 'src/index.tsx',
      output: {
        file: 'bundle/main.min.js',
        banner: umdBanner,
        inlineDynamicImports: true,
        format: 'umd',
        name: 'ESComponents',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        },
        plugins: [
          terser({
            compress: {
              if_return: false,
              typeofs: false
            },
            mangle: isProduction
          })
        ]
      },
      context: 'window',
      external: peerDepExternal,
      plugins: [
        resolve({
          extensions,
          preferBuiltins: true
        }),
        commonjs({ include: [/node_modules/, sharedTypesPath], extensions }),
        babel({
          exclude: /node_modules/,
          envName: isProduction ? 'production' : 'development',
          babelHelpers: 'runtime',
          extensions
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
          ASSETS_PATH: JSON.stringify(assets_url),
          preventAssignment: true
        })
      ]
    },
    {
      input: 'src/build-utils/jest.ts',
      output: [
        {
          format: 'cjs',
          file: 'build-utils/jest.js',
          interop: 'compat',
          generatedCode: {
            reservedNamesAsProps: false
          }
        }
      ],
      external,
      plugins: [
        wildcardExternal(['core-js/**', 'text-mask-addons/**']),
        resolve({
          extensions,
          preferBuiltins: true
        }),
        babel({
          exclude: ['node_modules/**'],
          babelHelpers: 'runtime',
          extensions
        }),
        replace({
          ASSETS_PATH: JSON.stringify(assets_url),
          preventAssignment: true
        }),
        copy({
          targets: [
            {
              src: './types/build-utils/jest.d.ts',
              dest: './build-utils'
            }
          ]
        })
      ]
    }
  ];
};
