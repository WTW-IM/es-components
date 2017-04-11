const path = require('path');

const styleguidePaths = require('./paths');

const baseComponentDir = styleguidePaths.baseComponentDir;

module.exports = {
  entry: {
    ['icons-example']: path.join(styleguidePaths.examplesDir, 'icons/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: styleguidePaths.exampleBundlesDir
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: baseComponentDir,
      loader: 'babel'
      }, {
        test: /\.less$/,
        include: [path.join(styleguidePaths.srcDir, 'styles'), baseComponentDir],
        loader: 'style!css!less'
      }, {
        test: /\.eot$|\.ttf$|\.svg$|\.woff$/,
        include: path.join(styleguidePaths.srcDir, 'webfonts'),
        loader: 'file'
      }]
    }
};