import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent, {
  PointerEventsCheckLevel
} from '@testing-library/user-event';

import CheckboxGroup from './CheckboxGroup';
import { renderWithTheme } from '../../util/test-utils';

const user = userEvent.setup({
  pointerEventsCheck: PointerEventsCheckLevel.Never
});

beforeEach(cleanup);

const checkboxOptions = [
  {
    value: 'hiking'
  },
  {
    value: 'biking',
    checked: true
  },
  {
    value: 'kayaking'
  },
  {
    value: 'camping'
  }
];

it('renders with the supplied options', async () => {
  const onChange = jest.fn();
  renderWithTheme(
    <CheckboxGroup options={checkboxOptions} onChange={onChange} />
  );

  expect(await screen.findByLabelText('hiking')).toBeInTheDocument();
});

it('executes onChange prop when a checkbox is clicked', async () => {
  const onChange = jest.fn();
  renderWithTheme(
    <CheckboxGroup options={checkboxOptions} onChange={onChange} />
  );

  await user.click(await screen.findByLabelText('biking'));
  expect(onChange).toHaveBeenCalled();
});

it('select all checkbox returns all options when checked', async () => {
  const onChange = jest.fn();
  renderWithTheme(
    <CheckboxGroup
      options={checkboxOptions}
      onChange={onChange}
      checkAllText="select all"
    />
  );

  await user.click(await screen.findByLabelText('select all'));
  expect(onChange).toHaveBeenCalledWith([
    'hiking',
    'biking',
    'kayaking',
    'camping'
  ]);
});

it('select all checkbox returns empty array when unchecked', async () => {
  const onChange = jest.fn();
  renderWithTheme(
    <CheckboxGroup
      options={checkboxOptions.map(opt => ({ ...opt, checked: true }))}
      onChange={onChange}
      checkAllText="select all"
    />
  );

  await user.click(await screen.findByLabelText('select all'));
  expect(onChange).toHaveBeenCalledWith([]);
});

it('cannot be clicked when disabled', async () => {
  const onChange = jest.fn();
  renderWithTheme(
    <CheckboxGroup
      options={checkboxOptions.map(opt =>
        opt.value === 'hiking'
          ? {
              ...opt,
              disabled: true
            }
          : opt
      )}
      onChange={onChange}
      disableAllOptions
    />
  );

  await user.click(await screen.findByLabelText('hiking'));
  expect(onChange).not.toHaveBeenCalled();
  expect(
    await screen.findByRole('checkbox', { name: /hiking/ })
  ).toBeDisabled();
});

it('checks the correct boxes by default', async () => {
  const onChange = jest.fn();
  renderWithTheme(
    <CheckboxGroup options={checkboxOptions} onChange={onChange} />
  );

  expect(await screen.findByLabelText('hiking')).not.toBeChecked();
  expect(await screen.findByLabelText('biking')).toBeChecked();
});
