import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import typescript from '@rollup/plugin-typescript';
import { aliasPlugin } from './rollup.config.mjs';
import alias from '@rollup/plugin-alias';
import { createRequire } from 'module';

export default args => {
  const isProduction = args.configEnv === 'prod';
  const assets_url = isProduction
    ? 'https://app.viabenefits.com/static/cdn/es-assets/'
    : 'https://app.qa.viabenefits.com/static/cdn/es-assets/';
  const viaThemePath = createRequire(import.meta.url).resolve(
    'es-components-via-theme'
  );

  return [
    {
      input: 'src/full-color-icons.tsx',
      output: {
        file: 'docs/full-color-icons.js',
        format: 'iife',
        intro: 'var global = typeof self !== undefined ? self : this;'
      },
      preserveSymlinks: true,
      plugins: [
        aliasPlugin,
        alias({
          entries: [
            {
              find: 'es-components-via-theme',
              replacement: viaThemePath
            }
          ]
        }),
        typescript({
          tsconfig: 'tsconfig.json'
        }),
        resolve({
          preferBuiltins: true
        }),
        commonjs({
          include: [/node_modules/, viaThemePath],
          exclude: 'src/**'
        }),
        babel({
          exclude: /node_modules/,
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
