import React from 'react';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import { render } from 'react-testing-library';

export function renderWithTheme(component) {
  return render(
    <ThemeProvider theme={viaTheme}>
      {React.cloneElement(component)}
    </ThemeProvider>
  )
}