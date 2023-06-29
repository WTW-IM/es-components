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
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const renderObj = render(<ThemeComponent>{component}</ThemeComponent>);
  return {
    ...renderObj,
    rerender: (rerenderComponent: T) =>
      renderObj.rerender(<ThemeComponent>{rerenderComponent}</ThemeComponent>)
  };
}
