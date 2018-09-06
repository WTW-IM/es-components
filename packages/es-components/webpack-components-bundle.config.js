const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: "[name].min.js",
    libraryTarget: "umd"
  },
  externals: {
    'react': 'React',
    ['styled-components']: 'styled'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
