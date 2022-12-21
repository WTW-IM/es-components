import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import ToggleButton from './ToggleButton';
import { renderWithTheme } from '../../util/test-utils';

const onClick = jest.fn();

it('sets isPressed state on click', async () => {
  const user = userEvent.setup();
  renderWithTheme(<ToggleButton onClick={onClick}>test</ToggleButton>);

  const button = await screen.findByRole('button', { name: /test/ });
  await user.click(button);

  await waitFor(() => {
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });
  expect(button.classList.contains('pressed')).toBe(true);
  expect(onClick).toHaveBeenCalledTimes(1);

  await user.click(button);

  await waitFor(() => {
    expect(button.getAttribute('aria-pressed')).toBe('false');
  });
  expect(button.classList.contains('pressed')).toBe(false);
  expect(onClick).toHaveBeenCalledTimes(2);
});
