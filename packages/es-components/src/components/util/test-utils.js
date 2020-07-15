// eslint-env jest
import React from 'react';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import { render } from '@testing-library/react';

export function renderWithTheme(component) {
  return render(
    <ThemeProvider theme={viaTheme}>
      {React.cloneElement(component)}
    </ThemeProvider>
  );
}
