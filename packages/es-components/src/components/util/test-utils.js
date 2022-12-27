// eslint-env jest
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import { render } from '@testing-library/react';

export function ThemeComponent(props) {
  return <ThemeProvider theme={viaTheme} {...props} />;
}

ThemeComponent.propTypes = {
  children: PropTypes.node
};

export function renderWithTheme(component) {
  return render(<ThemeComponent>{component}</ThemeComponent>);
}
