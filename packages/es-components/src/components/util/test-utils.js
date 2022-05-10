// eslint-env jest
import React from 'react';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import { render } from '@testing-library/react';

export function ThemeComponent(props) {
  return <ThemeProvider theme={viaTheme} {...props} />;
}

export function renderWithTheme(component) {
  return render(<ThemeComponent>{component}</ThemeComponent>);
}
