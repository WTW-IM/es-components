import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactIs from 'react-is';

export default args => {
  const isProduction = args.configEnv === 'prod';
  const assets_url = isProduction
    ? 'https://bdaim-webexcdn-p.azureedge.net/es-assets/'
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
        resolve({
          preferBuiltins: true
        }),
        commonjs({
          include: /node_modules/,
          exclude: 'src/**',
          namedExports: {
            react: Object.keys(React),
            'react-dom': Object.keys(ReactDOM),
            'react-is': Object.keys(ReactIs)
          }
        }),
        babel({
          exclude: /node_modules\/?!(es-components-via-theme)/,
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
