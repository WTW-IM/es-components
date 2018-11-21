const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const version = require('./package.json').version;
const styleguidePaths = require('./config/paths');

const baseComponentDir = styleguidePaths.baseComponentDir;

module.exports = {
  styleguideDir: 'docs',
  title: `Exchange Solutions React Components v${version}`,
  template: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }
    ],
    head: {
      raw: `<style>
        body {
          color: #444;
          font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
          font-weight: 400;
        }

        input, button, select, textarea {
          font-family: inherit;
        }
        
        code {
          white-space: pre-wrap !important;
          word-break: break-word !important;
        }
      </style>
      <link rel="stylesheet" href="https://wtw-bdaim-cdn.azureedge.net/es-assets/es-assets-master/font.css">
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i" rel="stylesheet">
      <script src="https://unpkg.com/@babel/polyfill@7.0.0/dist/polyfill.min.js"></script>
    `}
  },
  ribbon: {
    url: 'https://github.com/WTW-IM/es-components',
    text: 'Fork me on GitHub'
  },
  sections: [
    {
      name: 'Themes',
      content: path.join(baseComponentDir, 'theme/Themes.md')
    },
    {
      name: 'Base',
      components: path.join(baseComponentDir, 'base/**/*.js')
    },
    {
      name: 'Containers',
      content: path.join(baseComponentDir, 'containers/Containers.md'),
      components: path.join(baseComponentDir, 'containers/**/*.js')
    },
    {
      name: 'Controls',
      components: path.join(baseComponentDir, 'controls/**/*.js')
    },
    {
      name: 'Navigation',
      components: path.join(baseComponentDir, 'navigation/**/*.js')
    },
    {
      name: 'Patterns',
      content: path.join(baseComponentDir, 'patterns/Patterns.md'),
      components: path.join(baseComponentDir, 'patterns/**/*.js')
    }
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/ExampleWrapper.js')
  },
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
        fontFamily: [
          'Source Sans Pro',
          'Segoe UI',
          'Segoe',
          'Calibri',
          'Tahoma',
          'sans-serif'
        ],
        fontSize: '18px'
      }
    }
  }
};
