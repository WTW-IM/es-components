const path = require('path');

const styleguidePaths = require('./config/paths');

const baseComponentDir = styleguidePaths.baseComponentDir;

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
  webpackConfig: require('./config/webpack.config.js'),
  styles: {
    Playground: {
      preview: {
        fontFamily: ['"Helvetica Neue"']
      }
    }
  }
};
