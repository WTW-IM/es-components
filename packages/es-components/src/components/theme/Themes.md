To apply a theme you can either wrap your root react app component in a `<ThemeProvider theme='[themeName]'>` wrapper component, or provide a theme to individual components via the `theme` prop. The `ThemeProvider` wrapper provides the supplied theme to any components underneath it. See [styled-components Theming](https://www.styled-components.com/docs/advanced#theming).

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

The [via benefits theme]() is bundled as the default theme for this component library. To create your own theme, you can copy one of the themes, modify the values, and supply that object to the `ThemeProvider`.

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

Apart from the icon set, this library does not have a specific typography and should work with whatever font you have defined in your project.
