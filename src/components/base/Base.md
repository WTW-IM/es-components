## Themes

To apply a theme you can either wrap your root react app component in a `<ThemeProvider theme='[themeName]'>` wrapper component, or individual components. This wrapper provides the supplied theme to any components underneath it. See [styled-components Theming](https://www.styled-components.com/docs/advanced#theming).

<pre>
import { ThemeProvider } from 'styled-components';

...
render(
	&lt;ThemeProvider theme={theme}&gt;
		&lt;MyComponentOrApp /&gt;
	&lt;/ThemeProvider&gt;
);
...
</pre>

Three themes are provided with this library: `defaultTheme`, `wtwTheme`, and `viaTheme`.

To create your own theme, you could simply copy one of the themes (a simple javascript object), modify the values, and import the object into your project and supply that object to the `ThemeProvider`.

### Theme colors

Default |
--- |
Accent <div style="background-color: #007bff; padding: 1em; width: 50px"></div> | Info <div style="background-color: #17a2b8; padding: 1em; width: 50px"></div> | Advisor <div style="background-color: #fd7e14; padding: 1em; width: 50px"></div> | Success <div style="background-color: #28a745; padding: 1em; width: 50px"></div> | Warning <div style="background-color: #ffc107; padding: 1em; width: 50px"></div> | Danger <div style="background-color: #dc3545; padding: 1em; width: 50px"></div> |

WTW |
--- |
Accent <div style="background-color: #5a0c6f; padding: 1em; width: 50px"></div> | Info <div style="background-color: #1b6284; padding: 1em; width: 50px"></div> | Advisor <div style="background-color: #ff6310; padding: 1em; width: 50px"></div> | Success <div style="background-color: #060; padding: 1em; width: 50px"></div> | Warning <div style="background-color: #ebaf00; padding: 1em; width: 50px"></div> | Danger <div style="background-color: #af140c; padding: 1em; width: 50px"></div> |

Via |
--- |
Accent <div style="background-color: #702082; padding: 1em; width: 50px"></div> | Info <div style="background-color: #00a0d2; padding: 1em; width: 50px"></div> | Advisor <div style="background-color: #c110a0; padding: 1em; width: 50px"></div> | Success <div style="background-color: #00c389; padding: 1em; width: 50px"></div> | Warning <div style="background-color: #ffc107; padding: 1em; width: 50px"></div> | Danger <div style="background-color: #dc3545; padding: 1em; width: 50px"></div> |
