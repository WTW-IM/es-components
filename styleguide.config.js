const path = require('path');

const version = require('./package.json').version;
const styleguidePaths = require('./config/paths');

const baseComponentDir = styleguidePaths.baseComponentDir;

module.exports = {
  assetsDir: 'public',
  styleguideDir: 'docs',
  title: `Exchange Solutions React Components v${version}`,
  template: 'config/template.html',
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
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    return `import { ${name} } from 'es-components';`;
  },
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.js$/, '.md');
  },
  skipComponentsWithoutExample: true,
  context: {
    dateFormat: 'date-fns/format'
  },
  webpackConfig: require('./config/webpack.config.js'),
  styles: {
    Playground: {
      preview: {
        fontFamily: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        fontSize: '18px'
      }
    }
  }
};
