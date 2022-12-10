const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const version = require('./package.json').version;
const styleguidePaths = require('./config/paths');
const baseComponentDir = styleguidePaths.baseComponentDir;
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const isProduction = argv.env === 'prod';
const assets_url = isProduction
  ? 'https://app.viabenefits.com/static/cdn/es-assets/'
  : 'https://app.qa.viabenefits.com/static/cdn/es-assets/';

const getDependencyDirectory = dep => path.dirname(require.resolve(dep));

fs.copyFileSync(
  path.join(__dirname, '..', '..', 'CHANGELOG.md'),
  path.join(__dirname, 'CHANGELOG_COPY.md')
);

const styleguideDir = 'docs';
const assetsDir = path.join(__dirname, styleguideDir);
fs.mkdirSync(assetsDir, { recursive: true });
const fd = fs.openSync(path.join(assetsDir, 'temp.txt'), 'a');
fs.closeSync(fd);

module.exports = {
  styleguideDir,
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

        *:focus, input:focus, select:focus, button:focus {
          outline: 3px solid #3dbbdb;
        }
      </style>
      <link rel="preload" href="${assets_url}icons.css" as="style">
      <link rel="stylesheet" href="${assets_url}source-sans-pro.css">
      <script src="https://unpkg.com/@babel/polyfill@7.0.0/dist/polyfill.min.js"></script>
    `
    }
  },
  ribbon: {
    url: 'https://github.com/WTW-IM/es-components',
    text: 'Fork me on GitHub'
  },
  ignore: ['**/*.specs.tsx', '**/*.specs.js'],
  sections: [
    {
      name: 'Themes',
      content: path.join(baseComponentDir, 'theme/Themes.md')
    },
    {
      name: 'Grid',
      content: path.join(baseComponentDir, 'grid/Grid.md')
    },
    {
      name: 'General Styling Guidelines',
      content: path.join(
        baseComponentDir,
        'general-styling-guidelines/GeneralStylingGuidelines.md'
      )
    },
    {
      name: 'Validation Guidelines',
      content: path.join(
        baseComponentDir,
        'validation-guidelines/ValidationGuidelines.md'
      )
    },
    {
      name: 'Base',
      components: path.join(baseComponentDir, 'base/**/*.{js,jsx,tsx}')
    },
    {
      name: 'Containers',
      content: path.join(baseComponentDir, 'containers/Containers.md'),
      components: path.join(baseComponentDir, 'containers/**/*.{js,jsx,tsx}')
    },
    {
      name: 'Controls',
      content: path.join(baseComponentDir, 'controls/Controls.md'),
      components: path.join(baseComponentDir, 'controls/**/*.{js,jsx,tsx}')
    },
    {
      name: 'Navigation',
      components: path.join(baseComponentDir, 'navigation/**/*.{js,jsx,tsx}')
    },
    {
      name: 'Patterns',
      content: path.join(baseComponentDir, 'patterns/Patterns.md'),
      components: path.join(baseComponentDir, 'patterns/**/*.{js,jsx,tsx}')
    },
    {
      name: 'CHANGELOG',
      description: 'The changelog for this version of the library.',
      content: path.join(__dirname, 'CHANGELOG_COPY.md')
    }
  ],
  styleguideComponents: {
    StyleGuideRenderer: path.join(
      __dirname,
      'src/styleguide/StyleGuideRenderer.js'
    ),
    Wrapper: path.join(__dirname, 'src/styleguide/ExampleWrapper.js'),
    ReactComponentRenderer: path.join(
      __dirname,
      'src/styleguide/ComponentRenderer.js'
    ),
    SectionRenderer: path.join(__dirname, 'src/styleguide/SectionRenderer.js')
  },
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    return `import { ${name} } from 'es-components';`;
  },
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.(js|tsx)$/, '.md');
  },
  skipComponentsWithoutExample: true,
  context: {
    dateFormat: 'date-fns/format'
  },
  require: [path.join(__dirname, 'config', 'styleguidist-page-scripts')],
  assetsDir,
  webpackConfig: {
    optimization: {
      splitChunks: {
        maxSize: 500000,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 1
          }
        }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        ASSETS_PATH: JSON.stringify(assets_url)
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)?$/,
          include: [
            getDependencyDirectory('react-overlays'),
            getDependencyDirectory('react-context-toolbox'),
            getDependencyDirectory('ansi-styles'),
            getDependencyDirectory('strip-ansi'),
            getDependencyDirectory('ansi-regex'),
            getDependencyDirectory('chalk'),
            getDependencyDirectory('regexpu-core'),
            getDependencyDirectory('es-components-via-theme'),
            getDependencyDirectory('unicode-match-property-ecmascript'),
            getDependencyDirectory('unicode-match-property-value-ecmascript'),
            getDependencyDirectory('acorn-jsx'),
            getDependencyDirectory('estree-walker'),
            path.join(__dirname, 'src')
          ],
          loader: 'babel-loader'
        }
      ]
    }
  },
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
