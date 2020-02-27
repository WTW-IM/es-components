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
		<tr><th colspan="4" style="text-align: left">Via</th></tr>
		<tr>
			<td>colors.primary <div style="background-color: #0073b6; padding: 1em; width: 50px; height: 50px"></div></td>
			<td>brandColors.primary1 <div style="background-color: #00a0d2; padding: 1em; width: 50px; height: 50px"></div></td>
			<td>brandColors.primary2 <div style="background-color: #00c389; padding: 1em; width: 50px; height: 50px"></div></td>
			<td>brandColors.primary3 <div style="background-color: #c110a0; padding: 1em; width: 50px; height: 50px"></div></td>
    </tr>
    <tr>
			<td>brandColors.secondary1 <div style="background-color: #5a0c6f; padding: 1em; width: 50px; height: 50px"></div></td>
			<td>brandColors.secondary2 <div style="background-color: #717171; padding: 1em; width: 50px; height: 50px"></div></td>
      <td></td>
      <td></td>
		</tr>
  </tbody>
</table>
<table>
  <tbody>
		<tr><th colspan="4" style="text-align: left">WTW</th></tr>
		<tr>
			<td>colors.primary <div style="background-color: #702082; padding: 1em; width: 50px; height: 50px"></div></td>
      <td>brandColors.primary1 <div style="background-color: #5a0c6f; padding: 1em; width: 50px; height: 50px"></div></td>
      <td>brandColors.primary2 <div style="background-color: #63666a; padding: 1em; width: 50px; height: 50px"></div></td>
      <td>brandColors.primary3 <div style="background-color: #c110a0; padding: 1em; width: 50px; height: 50px"></div></td>
    </tr>
    <tr>
      <td>brandColors.secondary1 <div style="background-color: #5a0c6f; padding: 1em; width: 50px; height: 50px"></div></td>
      <td>brandColors.secondary2 <div style="background-color: #63666a; padding: 1em; width: 50px; height: 50px"></div></td>
		</tr>
  </tbody>
</table>
<table>
  <tbody>
    <tr><th colspan="4" style="text-align: left">Shared</th></tr>
    <tr>
      <td>colors.info <div style="background-color: #006699; padding: 1em; width: 50px; height: 50px"></div></td>
      <td>colors.success <div style="background-color: #006000; padding: 1em; width: 50px; height: 50px"></div></td>
      <td>colors.warning <div style="background-color: #de7400; padding: 1em; width: 50px; height: 50px"></div></td>
      <td>colors.danger <div style="background-color: #e60700; padding: 1em; width: 50px; height: 50px"></div></td>
      <td>colors.advisor <div style="background-color: #ff6310; padding: 1em; width: 50px; height: 50px"></div></td>
      <td></td>
      <td></td>
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
