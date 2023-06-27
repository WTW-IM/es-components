import React from 'react';
import { cleanup, screen } from '@testing-library/react';

import Checkbox from './Checkbox';
import { renderWithTheme } from '../../util/test-utils';
import userEvent, {
  PointerEventsCheckLevel
} from '@testing-library/user-event';

beforeEach(cleanup);

const user = userEvent.setup({
  pointerEventsCheck: PointerEventsCheckLevel.Never
});

it('executes onClick prop when label is clicked', async () => {
  const onClick = jest.fn();

  renderWithTheme(
    <Checkbox name="test" onClick={onClick}>
      test label
    </Checkbox>
  );

  await user.click(await screen.findByText('test label'));
  expect(onClick).toHaveBeenCalled();
});

it('cannot be clicked when disabled', async () => {
  const onClick = jest.fn();
  renderWithTheme(
    <Checkbox name="test" onClick={onClick} disabled>
      test label
    </Checkbox>
  );

  await user.click(await screen.findByLabelText('test label'));
  expect(onClick).not.toHaveBeenCalled();
  expect(await screen.findByRole('checkbox')).toBeDisabled();
});
