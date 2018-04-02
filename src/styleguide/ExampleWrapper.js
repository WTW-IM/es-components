/* eslint-disable react/prop-types */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../components/theme/defaultTheme';

export default function ExampleWrapper({ children }) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
