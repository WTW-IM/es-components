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

The [via benefits theme](https://www.npmjs.com/package/es-components-via-theme) is applied to all the components in this styleguide. To create your own theme, [copy the theme here](https://github.com/WTW-IM/es-components/blob/a05ccfacd68da862413f4bf38a804aa4c607eb48/packages/es-components-via-theme/index.js), modify the values, and supply that object to the `ThemeProvider`.

### Theme colors

<table style="margin-bottom: 1.5em">
	<tbody>
		<tr><th colspan="7" style="text-align: left">Via</th></tr>
		<tr>
			<td>Primary <div style="background-color: #007fa7; padding: 1em; width: 50px"></div></td>
			<td>Default <div style="background-color: #d8d8d8; padding: 1em; width: 50px"></div></td>
			<td>Info <div style="background-color: #069; padding: 1em; width: 50px"></div></td>
			<td>Success <div style="background-color: #298544; padding: 1em; width: 50px"></div></td>
			<td>Warning <div style="background-color: #b35f00; padding: 1em; width: 50px"></div></td>
			<td>Danger <div style="background-color: #c00; padding: 1em; width: 50px"></div></td>
		</tr>
	</tbody>
</table>

### Fonts

Apart from the icon set, this library does not have a specific typography and should work with whatever font you have defined in your project. Our UX team's font of choice for
our applications is `Source Sans Pro`. You can use the font in your project either by getting it from the UX team, or linking to [google's CDN](https://fonts.google.com/specimen/Source+Sans+Pro):

```html
<link
	href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i"
	rel="stylesheet"
>
```
