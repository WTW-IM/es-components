import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import { render, RenderResult } from '@testing-library/react';

export function ThemeComponent(
  props: Omit<React.ComponentPropsWithoutRef<typeof ThemeProvider>, 'theme'>
) {
  return <ThemeProvider {...props} theme={viaTheme} />;
}

ThemeComponent.propTypes = {
  children: PropTypes.node
};

export function renderWithTheme(component: React.ReactElement): RenderResult {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const renderObj = render(<ThemeComponent>{component}</ThemeComponent>);
  return {
    ...renderObj,
    rerender: (rerenderComponent: React.ReactElement) =>
      renderObj.rerender(<ThemeComponent>{rerenderComponent}</ThemeComponent>)
  };
}

export const setClientWidth = (width: number) => {
  Object.defineProperty(document.documentElement, 'clientWidth', {
    writable: true,
    configurable: true,
    value: width
  });
};

export const setClientHeight = (height: number) => {
  Object.defineProperty(document.documentElement, 'clientHeight', {
    writable: true,
    configurable: true,
    value: height
  });
};
