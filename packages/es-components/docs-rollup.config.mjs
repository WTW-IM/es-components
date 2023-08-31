import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import alias from '@rollup/plugin-alias';
import { createRequire } from 'module';
import { writeIconNameType } from './config/loadIconNameType.mjs';
import { getAssetsUrl, getIsProduction } from './config/assetsUrl.js';
import { tscEsComponents } from './config/tscEsComponents.mjs';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default async args => {
  await Promise.all([writeIconNameType(), tscEsComponents()]);
  const isProduction = getIsProduction(args);
  const assets_url = getAssetsUrl(args);
  const require = createRequire(import.meta.url);

  const viaThemePath = require.resolve(
    '../es-components-via-theme/src/index.ts'
  );

  return [
    {
      input: 'src/full-color-icons.tsx',
      output: {
        file: 'docs/full-color-icons.js',
        format: 'iife',
        intro: 'var global = typeof self !== undefined ? self : this;',
        plugins: [terser({ mangle: isProduction })]
      },
      preserveSymlinks: true,
      plugins: [
        alias([
          {
            find: 'es-components-via-theme',
            replacement: viaThemePath
          }
        ]),
        resolve({
          extensions,
          preferBuiltins: true
        }),
        commonjs({
          include: [/node_modules/, viaThemePath],
          exclude: 'src/**'
        }),
        babel({
          extensions,
          exclude: /node_modules/,
          envName: isProduction ? 'production' : 'development',
          babelHelpers: 'runtime'
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
          ASSETS_PATH: JSON.stringify(assets_url),
          preventAssignment: true
        }),
        htmlTemplate({
          template: 'src/full-color-icons.html',
          target: 'docs/full-color-icons.html'
        })
      ]
    }
  ];
};
