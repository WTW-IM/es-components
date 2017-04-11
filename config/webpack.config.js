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
    rules: [{
      test: /\.js$/,
      include: baseComponentDir,
      use: ['babel-loader']
    }, {
      test: /\.less$/,
      include: [path.join(styleguidePaths.srcDir, 'styles'), baseComponentDir],
      use: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.eot$|\.ttf$|\.svg$|\.woff$/,
      include: path.join(styleguidePaths.srcDir, 'webfonts'),
      use: ['file-loader']
    }]
  }
};