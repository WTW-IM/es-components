/* eslint-env jest */

import React from 'react';
import viaTheme from 'es-components-via-theme';

import ToggleButton from './ToggleButton';
import { renderWithTheme } from '../../util/test-utils';

const onClick = jest.fn();

it('sets isPressed state on click', () => {
  const { getByText } = renderWithTheme(
    <ToggleButton onClick={onClick}>test</ToggleButton>
  );
  const button = getByText('test');
  button.click();

  const themeValues = viaTheme.buttonStyles.button.variant.default;

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
