import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactIs from 'react-is';

export default [
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
      builtins(),
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
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser(),
      htmlTemplate({
        template: 'src/full-color-icons.html',
        target: 'docs/full-color-icons.html'
      })
    ]
  }
];
