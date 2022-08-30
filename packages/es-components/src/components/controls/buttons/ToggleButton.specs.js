/* eslint-env jest */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import viaTheme from 'es-components-via-theme';
import { darken, getTextColor } from '../../util/colors';

import ToggleButton from './ToggleButton';
import { renderWithTheme } from '../../util/test-utils';

const onClick = jest.fn();

it('sets isPressed state on click', async () => {
  const {
    buttonStyles: {
      button: {
        variant: {
          default: { bgColor }
        }
      }
    }
  } = viaTheme;
  const clickedBg = darken(darken(bgColor, 7.5), 2.5);
  const clickedText = getTextColor(clickedBg);
  const unclickedText = getTextColor(bgColor);

  const user = userEvent.setup();
  renderWithTheme(<ToggleButton onClick={onClick}>test</ToggleButton>);

  const button = await screen.findByRole('button', { name: /test/ });
  await user.click(button);

  expect(button).toHaveStyle(`
    background-color: ${clickedBg};
    color: ${clickedText};
  `);

  await user.click(button);

  expect(button).toHaveStyle(`
    background-color: ${bgColor};
    color: ${unclickedText};
  `);
});
