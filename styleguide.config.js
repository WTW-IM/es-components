const path = require('path');

const baseComponentDir = path.join(__dirname, './components');
const cssDir = path.join(__dirname, './css');

module.exports = {
  styleguideDir: 'docs',
  title: 'OneExchange React Bootstrap',
  sections: [
    {
      name: 'Base',
      components: function () {
        return [
          './components/base/icons/Icon.js'
        ];
      },
      sections: [
        {
          name: 'Containers',
          content: './components/base/containers/Containers.md',
          components: './components/base/containers/**/*.js'
        }
      ]
    },
    {
      name: 'Controls',
      components: './components/controls/**/*.js'
    }
  ],
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.js$/, '.md');
  },
  skipComponentsWithoutExample: true,
  webpackConfig: {
    module: {
      loaders: [{
        test: /\.js$/,
        include: baseComponentDir,
        loader: 'babel'
        }, {
          test: /\.less$/,
          include: [path.join(__dirname, './styles'), baseComponentDir],
          loader: 'style!css!less'
        }, {
          test: /\.eot$|\.ttf$|\.svg$|\.woff$/,
          include: path.join(__dirname, './webfonts'),
          loader: 'file'
        }]
    }
  },
  styles: {
    Playground: {
      preview: {
        fontFamily: ['"Helvetica Neue"']
      }
    }
  }
};
