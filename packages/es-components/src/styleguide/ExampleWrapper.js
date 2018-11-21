/* eslint-disable react/prop-types */

import { createElement } from 'react';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

export default function ExampleWrapper({ children }) {
  return createElement(ThemeProvider, { theme: viaTheme }, children);
}
