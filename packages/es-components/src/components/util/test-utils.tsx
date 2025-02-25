import React, { Profiler } from 'react';
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

const profilerRender = (id: string, phase: string, actualDuration: number) => {
  if (actualDuration < 100) return;
  console.warn('Render took too long!', { id, phase, actualDuration });
};

export function renderWithTheme(component: React.ReactElement): RenderResult {
  const { ...viewUtils } = render(<ThemeComponent>{component}</ThemeComponent>);
  return {
    ...viewUtils,
    rerender: (rerenderComponent: React.ReactNode) =>
      viewUtils.rerender(
        <Profiler id="ThemeRender" onRender={profilerRender}>
          <ThemeComponent>{rerenderComponent}</ThemeComponent>
        </Profiler>
      )
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
