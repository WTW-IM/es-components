To apply a theme wrap your root react app component in a `<ThemeProvider theme='[themeName]'>` wrapper component. The `ThemeProvider` wrapper provides the supplied theme to any components underneath it. See [styled-components Theming](https://www.styled-components.com/docs/advanced#theming).

Example:

```html
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

...

render(
  <ThemeProvider theme={viaTheme}>
    <MyComponentOrApp />
  </ThemeProvider>
);
```

The [via benefits theme](https://www.npmjs.com/package/es-components-via-theme) is applied to all the components in this styleguide. To create your own theme, [copy the theme here](https://github.com/WTW-IM/es-components/blob/master/packages/es-components-via-theme/index.js), modify the values, and supply that object to the `ThemeProvider`.

### Theme colors

<table style="margin-bottom: 1.5em">
	<tbody>
		<tr><th colspan="3" style="text-align: left">Via</th></tr>
		<tr>
			<td>Primary <div style="background-color: #007fa7; padding: 1em; width: 50px"></div></td>
			<td>Default <div style="background-color: #d8d8d8; padding: 1em; width: 50px"></div></td>
			<td>Info <div style="background-color: #069; padding: 1em; width: 50px"></div></td>
		</tr>
		<tr>
			<td>Success <div style="background-color: #298544; padding: 1em; width: 50px"></div></td>
			<td>Warning <div style="background-color: #b35f00; padding: 1em; width: 50px"></div></td>
			<td>Danger <div style="background-color: #c00; padding: 1em; width: 50px"></div></td>
		</tr>
		<tr><th colspan="3" style="text-align: left">WTW</th></tr>
		<tr>
			<td>Primary <div style="background-color: #702082; padding: 1em; width: 50px"></div></td>
			<td>Default <div style="background-color: #444; padding: 1em; width: 50px"></div></td>
			<td>Info <div style="background-color: #1b6284; padding: 1em; width: 50px"></div></td>
		</tr>
		<tr>
			<td>Success <div style="background-color: #009865; padding: 1em; width: 50px"></div></td>
			<td>Warning <div style="background-color: #de7400; padding: 1em; width: 50px"></div></td>
			<td>Danger <div style="background-color: #a31e22; padding: 1em; width: 50px"></div></td>
		</tr>
	</tbody>
</table>

### Fonts

Our web app font of choice is *Source Sans Pro*. Import it by adding the following to your application:

```html
<link rel="stylesheet" href="https://bdaim-webexcdn-p.azureedge.net/es-assets/source-sans-pro.css" />
```

### Styles

A small style reset is available to use in your project. This sets a baseline for general elements
and allows headings and inputs to properly inherit fonts. To use it, import `StyleReset` and include the
element anywhere in your app.

```html
import StyleReset from 'es-components';

...

render(
  <>
    <StyleReset />
    <MyApp />
  </>
);
```
