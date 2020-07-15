/* eslint-env jest */
import React from 'react';
import viaTheme from 'es-components-via-theme';
import { darken, getTextColor } from '../../util/colors';

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
  const clickedBg = darken(darken(themeValues.bgColor, 7.5), 2.5);
  const clickedText = getTextColor(clickedBg);
  const unclickedBg = themeValues.bgColor;
  const unclickedText = getTextColor(unclickedBg);

  expect(button).toHaveStyle(`
    background-color: ${clickedBg};
    color: ${clickedText};
  `);

  button.click();

  expect(button).toHaveStyle(`
    background-color: ${unclickedBg};
    color: ${unclickedText};
  `);
});
