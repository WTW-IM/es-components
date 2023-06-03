import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import { render } from '@testing-library/react';

export function ThemeComponent(
  props: Omit<React.ComponentPropsWithoutRef<typeof ThemeProvider>, 'theme'>
) {
  return <ThemeProvider {...props} theme={viaTheme} />;
}

ThemeComponent.propTypes = {
  children: PropTypes.node
};

export function renderWithTheme<T extends React.ReactNode>(component: T) {
  return render(<ThemeComponent>{component}</ThemeComponent>);
}
