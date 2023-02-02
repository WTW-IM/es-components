/* eslint-disable react/prop-types */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useStyleguideTheme } from './styleguideTheme';

export default function ExampleWrapper({ children }) {
  const theme = useStyleguideTheme();
  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
}
