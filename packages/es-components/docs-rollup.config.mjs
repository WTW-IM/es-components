import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import typescript from '@rollup/plugin-typescript';
import { aliasPlugin } from './rollup.config.mjs';

export default args => {
  const isProduction = args.configEnv === 'prod';
  const assets_url = isProduction
    ? 'https://app.viabenefits.com/static/cdn/es-assets/'
    : 'https://app.qa.viabenefits.com/static/cdn/es-assets/';

  return [
    {
      input: 'src/full-color-icons.js',
      output: {
        file: 'docs/full-color-icons.js',
        format: 'iife',
        intro: 'var global = typeof self !== undefined ? self : this;'
      },
      preserveSymlinks: true,
      plugins: [
        aliasPlugin,
        typescript({
          include: [
            'src/**/*',
            '../../shared/types/src/*',
            '../es-components-wtw-theme/src/*',
            '../es-components-via-theme/src/*'
          ]
        }),
        resolve({
          preferBuiltins: true
        }),
        commonjs({
          include: /node_modules/,
          exclude: 'src/**'
        }),
        babel({
          exclude:
            /node_modules\/?!(es-components-via-theme|es-components-shared-types)/,
          envName: 'production',
          babelHelpers: 'runtime'
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
          preventAssignment: true
        }),
        terser(),
        htmlTemplate({
          template: 'src/full-color-icons.html',
          target: 'docs/full-color-icons.html'
        }),
        replace({
          ASSETS_PATH: JSON.stringify(assets_url),
          preventAssignment: true
        })
      ]
    }
  ];
};
