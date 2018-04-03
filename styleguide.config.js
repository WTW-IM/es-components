const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const version = require('./package.json').version;
const styleguidePaths = require('./config/paths');

const baseComponentDir = styleguidePaths.baseComponentDir;

module.exports = {
  assetsDir: 'public',
  styleguideDir: 'docs',
  title: `Exchange Solutions React Components v${version}`,
  template: {
    meta: [
      { charset: "utf-8" },
      { 
        name: "viewport", 
        content: "width=device-width, initial-scale=1.0"
      }
    ],
    head: {
      raw: `<style>
        @font-face {
        font-family: 'indv-mkt-icons';
        src: url('webfonts/indv-mkt-icons.eot?3tk8wr');
        src: url('webfonts/indv-mkt-icons.eot?3tk8wr#iefix') format('embedded-opentype'),
          url('webfonts/indv-mkt-icons.ttf?3tk8wr') format('truetype'),
          url('webfonts/indv-mkt-icons.woff?3tk8wr') format('woff'),
          url('webfonts/indv-mkt-icons.svg?3tk8wr#indv-mkt-icons') format('svg');
        font-weight: normal;
        font-style: normal;
        }

        body {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
      </style>
      <style>#forkongithub a{background:#000;color:#fff;text-decoration:none;font-family:arial,sans-serif;text-align:center;font-weight:bold;padding:5px 40px;font-size:1rem;line-height:2rem;position:relative;transition:0.5s;}#forkongithub a:hover{background:#c11;color:#fff;}#forkongithub a::before,#forkongithub a::after{content:"";width:100%;display:block;position:absolute;top:1px;left:0;height:1px;background:#fff;}#forkongithub a::after{bottom:1px;top:auto;}@media screen and (min-width:800px){#forkongithub{position:fixed;display:block;top:0;right:0;width:200px;overflow:hidden;height:200px;z-index:9999;}#forkongithub a{width:200px;position:absolute;top:60px;right:-60px;transform:rotate(45deg);-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);box-shadow:4px 4px 10px rgba(0,0,0,0.8);}}</style>
      `
    },
    body: {
      raw: '<span id="forkongithub"><a href="https://github.com/WTW-IM/es-components">Fork me on GitHub</a></span>'
    }
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
    Wrapper: path.join(__dirname, 'lib/styleguide/ExampleWrapper.js')
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
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    webpackConfig.plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.join(styleguidePaths.publicDir, 'webfonts'),
          to:  path.join(webpackConfig.output.path, 'webfonts')
        }
      ])
    );
    return webpackConfig;
  },
  styles: {
    Playground: {
      preview: {
        fontFamily: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        fontSize: '18px'
      }
    }
  }
};
