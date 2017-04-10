const path = require('path');

const baseComponentDir = path.join(__dirname, 'src/components');

module.exports = {
  styleguideDir: 'docs',
  title: 'OneExchange React Bootstrap',
  sections: [
    {
      name: 'Base',
      components: function () {
        return [
          path.join(baseComponentDir, 'base/icons/Icon.js')
        ];
      },
      sections: [
        {
          name: 'Containers',
          content: path.join(baseComponentDir, 'base/containers/Containers.md'),
          components: path.join(baseComponentDir, 'base/containers/**/*.js')
        }
      ]
    },
    {
      name: 'Controls',
      components: path.join(baseComponentDir, '/controls/**/*.js')
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
          include: [path.join(__dirname, 'src/styles'), baseComponentDir],
          loader: 'style!css!less'
        }, {
          test: /\.eot$|\.ttf$|\.svg$|\.woff$/,
          include: path.join(__dirname, 'src/webfonts'),
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
