import babel from '@rollup/plugin-babel';
import wildcardExternal from '@oat-sa/rollup-plugin-wildcard-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
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
      'format-message',
    ],
    plugins: [
      wildcardExternal([
        '@babel/**',
        'lodash/**',
        'core-js/**',
        'text-mask-addons/**',
      ]),
      babel({
        exclude: ['node_modules/**'],
        babelHelpers: 'runtime',
      }),
    ],
  },
  {
    input: 'src/index.js',
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
        'styled-components': 'styled',
      },
    },
    context: 'window',
    external: ['react', 'react-dom', 'styled-components'],
    plugins: [
      resolve(),
      commonjs({ include: /node_modules/ }),
      babel({
        exclude: /node_modules/,
        envName: 'production',
        babelHelpers: 'runtime',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      terser({
        compress: {
          if_return: false,
          typeofs: false,
        },
      }),
    ],
  },
];
