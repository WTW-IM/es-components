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

### Theme Colors

**Via Theme**

<details>
  <summary markdown="span">Click to expand</summary>
  <div style="background-color: #0073b6; padding: 1em; margin: .5em; width: 50%"><span style="color:white">colors.primary</span></div>
  <div style="background-color: #00a0d2; padding: 1em; margin: .5em; width: 50%"><span style="color:white">brandColors.primary1</span></div>
  <div style="background-color: #00c389; padding: 1em; margin: .5em; width: 50%"><span style="color:white">brandColors.primary2</span></div>
  <div style="background-color: #c110a0; padding: 1em; margin: .5em; width: 50%"><span style="color:white">brandColors.primary3</span></div>
  <div style="background-color: #5a0c6f; padding: 1em; margin: .5em; width: 50%"><span style="color:white">brandColors.secondary1</span></div>
  <div style="background-color: #717171; padding: 1em; margin: .5em; width: 50%"><span style="color:white">brandColors.secondary2</span></div>
</details>

**WTW Theme**

<details>
  <summary markdown="span">Click to expand</summary>
  <div style="background-color: #702082; padding: 1em; margin: .5em; width: 50%"><span style="color:white">colors.primary</span></div>
  <div style="background-color: #5a0c6f; padding: 1em; margin: .5em; width: 50%"><span style="color:white">brandColors.primary1</span></div>
  <div style="background-color: #63666a; padding: 1em; margin: .5em; width: 50%"><span style="color:white">brandColors.primary2</span></div>
  <div style="background-color: #c110a0; padding: 1em; margin: .5em; width: 50%"><span style="color:white">brandColors.primary3</span></div>
  <div style="background-color: #5a0c6f; padding: 1em; margin: .5em; width: 50%"><span style="color:white">brandColors.secondary1</span></div>
  <div style="background-color: #63666a; padding: 1em; margin: .5em; width: 50%"><span style="color:white">brandColors.secondary2</span></div>
</details>

**Shared**

<details>
  <summary markdown="span">Click to expand</summary>
  <div style="background-color: #006699; padding: 1em; margin: .5em; width: 50%"><span style="color:white">colors.info</span></div>
  <div style="background-color: #006000; padding: 1em; margin: .5em; width: 50%"><span style="color:white">colors.success</span></div>
  <div style="background-color: #de7400; padding: 1em; margin: .5em; width: 50%"><span style="color:white">colors.warning</span></div>
  <div style="background-color: #e60700; padding: 1em; margin: .5em; width: 50%"><span style="color:white">colors.danger</span></div>
  <div style="background-color: #ff6310; padding: 1em; margin: .5em; width: 50%"><span style="color:white">colors.advisor</span></div>
</details>


### Fonts

Our web app font of choice is *Source Sans Pro*. Import it by adding the following to your application:

```html
<link rel="stylesheet" href="https://bdaim-webexcdn-p.azureedge.net/es-assets/source-sans-pro.css" />
```

### Styles

A small style reset is available to use in your project. This sets a baseline for general elements
and allows headings and inputs to properly inherit fonts. To use it, import `StyleReset` and include the
element anywhere in your app.

*note: if you are using im-screens or the page-chrome web component, you do not need to include this*

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
