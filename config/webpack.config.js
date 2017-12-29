const path = require('path');

const styleguidePaths = require('./paths');

const baseComponentDir = styleguidePaths.baseComponentDir;

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      include: baseComponentDir,
      use: ['babel-loader']
    }, {
      test: /\.less$/,
      include: [path.join(styleguidePaths.srcDir, 'styles'), baseComponentDir],
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
