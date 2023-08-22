import * as process from 'process';
import babel from '@rollup/plugin-babel';
import wildcardExternal from '@oat-sa/rollup-plugin-wildcard-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { writeIconNameType } from './config/loadIconNameType.mjs';
import pkg from './package.json' assert { type: 'json' };

export default async args => {
  await writeIconNameType();
  const isProduction =
    args.configEnv === 'prod' || process.env.MAIN_BUILD === 'true';
  const assets_url = isProduction
    ? 'https://app.viabenefits.com/static/cdn/es-assets/'
    : 'https://app.qa.viabenefits.com/static/cdn/es-assets/';

  const peerDepNames = Object.keys(pkg.peerDependencies || {});
  const peerDepExternal = peerDepNames.map(
    external => new RegExp(`^${external}(/.+)?$`)
  );
  const depExternals = [...Object.keys(pkg.dependencies || {})];
  const external = [
    ...peerDepExternal,
    ...depExternals.map(external => new RegExp(`^${external}(/.+)?$`))
  ];

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
          banner: `
          var process = this.process || {};
        `
        },
        {
          format: 'esm',
          file: pkg.module,
          banner: `
          var process = this.process || {};
        `
        }
      ],
      external,
      plugins: [
        typescript({
          tsconfig: './tsconfig.json'
        }),
        wildcardExternal(['core-js/**', 'text-mask-addons/**']),
        resolve(),
        babel({
          exclude: ['node_modules/**'],
          babelHelpers: 'runtime'
        }),
        replace({
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
        typescript({
          tsconfig: './tsconfig.json'
        }),
        wildcardExternal(['core-js/**', 'text-mask-addons/**']),
        resolve(),
        babel({
          exclude: ['node_modules/**'],
          babelHelpers: 'runtime'
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
        banner: `
          var self = this.styled ? this : self; var globalThis = self || globalThis;
          var process = this.process || {};
        `,
        inlineDynamicImports: true,
        format: 'umd',
        name: 'ESComponents',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        }
      },
      context: 'window',
      external: peerDepExternal,
      plugins: [
        typescript({
          tsconfig: './tsconfig.json'
        }),
        resolve(),
        commonjs({ include: /node_modules/ }),
        babel({
          exclude: /node_modules/,
          envName: 'production',
          babelHelpers: 'runtime'
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
          ASSETS_PATH: JSON.stringify(assets_url),
          preventAssignment: true
        }),
        terser({
          compress: {
            if_return: false,
            typeofs: false
          },
          mangle: isProduction
        })
      ]
    }
  ];
};
