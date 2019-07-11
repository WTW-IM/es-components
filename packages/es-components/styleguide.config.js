const path = require('path');
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
    `
    }
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
      content: path.join(baseComponentDir, 'controls/Controls.md'),
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
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          // include: [
          //   path.join(__dirname, 'node_modules/react-overlays'),
          //   path.join(__dirname, 'node_modules/react-context-toolbox'),
          //   path.join(__dirname, 'node_modules/ansi-styles'),
          //   path.join(__dirname, 'node_modules/strip-ansi'),
          //   path.join(__dirname, 'node_modules/ansi-regex'),
          //   path.join(__dirname, 'node_modules/react-dev-utils'),
          //   path.join(__dirname, 'node_modules/chalk'),
          //   path.join(__dirname, 'node_modules/regexpu-core'),
          //   path.join(
          //     __dirname,
          //     'node_modules/unicode-match-property-ecmascript'
          //   ),
          //   path.join(
          //     __dirname,
          //     'node_modules/unicode-match-property-value-ecmascript'
          //   ),
          //   path.join(__dirname, 'node_modules/acorn-jsx'),
          //   path.join(__dirname, 'src')
          // ],
          exclude: /node_modules\/(?!(ansi-styles|strip-ansi|ansi-regex|react-dev-utils|chalk|regexpu-core|unicode-match-property-ecmascript|unicode-match-property-value-ecmascript|acorn-jsx)\/).*/,
          loader: 'babel-loader'
        }
      ]
    }
  },
  require: ['core-js'],
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
    },
    Code: {
      code: {
        color: '#007fa7'
      }
    }
  }
};
