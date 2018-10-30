/* eslint-env jest */

import React from 'react';
import { render } from 'react-testing-library';
import viaTheme from 'es-components-via-theme';
import { ThemeProvider } from 'styled-components';

import ToggleButton from './ToggleButton';

const onClick = jest.fn();

it('sets isPressed state on click', () => {
  const { getByText } = render(
    <ThemeProvider theme={viaTheme}>
      <ToggleButton handleOnClick={onClick}>test</ToggleButton>
    </ThemeProvider>
  );
  const button = getByText('test');
  button.click();

  const themeValues = viaTheme.buttonStyles.buttonsNormal.default;

  expect(button).toHaveStyle(`
    background-color: ${themeValues.hoverBgColor};
    color: ${themeValues.activeTextColor};
  `);

  button.click();

  expect(button).toHaveStyle(`
    background-color: ${themeValues.bgColor};
    color: ${themeValues.textColor};
  `);
});
