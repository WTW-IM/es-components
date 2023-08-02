import * as process from 'process';
import babel from '@rollup/plugin-babel';
import wildcardExternal from '@oat-sa/rollup-plugin-wildcard-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import { writeIconNameType } from './config/loadIconNameType.mjs';
import pkg from './package.json' assert { type: 'json' };

export const aliasPlugin = alias({
  entries: [
    {
      find: 'es-components-shared-types',
      replacement: '../../shared/types/dist/index.js'
    }
  ]
});

export default async args => {
  await writeIconNameType();
  const isProduction =
    args.configEnv === 'prod' || process.env.MAIN_BUILD === 'true';
  const assets_url = isProduction
    ? 'https://bdaim-webexcdn-p.azureedge.net/es-assets/'
    : 'https://app.qa.viabenefits.com/static/cdn/es-assets/';

  return [
    {
      input: 'src/index.tsx',
      output: [
        {
          format: 'cjs',
          file: pkg.main
        },
        {
          format: 'esm',
          file: pkg.module
        }
      ],
      external: [
        'date-fns',
        'prop-types',
        'react',
        'react-animate-height',
        'react-datepicker',
        'react-dom',
        'react-overlays',
        'react-popper',
        'react-text-mask',
        'react-transition-group/Transition',
        'styled-components',
        'regenerator-runtime/runtime',
        'react-modal',
        'tinycolor2',
        'get-root-node-polyfill/implement',
        'format-message'
      ],
      plugins: [
        aliasPlugin,
        wildcardExternal([
          '@babel/**',
          'lodash/**',
          'core-js/**',
          'text-mask-addons/**'
        ]),
        typescript({
          tsconfig: './tsconfig.json'
        }),
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
        banner:
          'var self = this.styled ? this : self; var globalThis = self || globalThis;',
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
      external: ['react', 'react-dom', 'styled-components'],
      plugins: [
        aliasPlugin,
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
