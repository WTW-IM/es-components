/* eslint-disable react/prop-types */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

export default function ExampleWrapper({ children }) {
  return <ThemeProvider theme={viaTheme}>{children}</ThemeProvider>;
}
