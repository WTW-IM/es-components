import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RadioGroup from './RadioGroup';
import { renderWithTheme } from '../../util/test-utils';
import RadioButton from './RadioButton';

function getNumArray(length: number) {
  return Array.from({ length }, (_, idx) => idx);
}

function buildOptions(numberOfOptions: number, optionIndexToDisable?: number) {
  return getNumArray(numberOfOptions).map(idx => (
    <RadioButton
      key={`option-${idx}`}
      disabled={idx === optionIndexToDisable}
      value={idx}
    >
      {`Option ${idx}`}
    </RadioButton>
  ));
}

beforeEach(cleanup);

it('renders each radio input as disabled when disableAllOptions is true', async () => {
  const options = buildOptions(3);
  renderWithTheme(
    <RadioGroup name="test" disableAllOptions>
      {options}
    </RadioGroup>
  );

  const inputs = await screen.findAllByRole('radio');

  expect(inputs).toHaveLength(3);
  inputs.forEach(input => expect(input).toBeDisabled());
});

it('renders a specific radio input as disabled when that option is set to disabled', async () => {
  const options = buildOptions(3, 0);
  renderWithTheme(<RadioGroup name="test">{options}</RadioGroup>);

  const inputs = await screen.findAllByRole('radio');
  expect(inputs).toHaveLength(3);

  expect(inputs[0]).toBeDisabled();
  expect(inputs[1]).not.toBeDisabled();
  expect(inputs[2]).not.toBeDisabled();
});

it('propagates event handlers to each input', async () => {
  const options = buildOptions(3);
  const onChange = jest.fn();
  renderWithTheme(
    <RadioGroup name="test" onChange={onChange}>
      {options}
    </RadioGroup>
  );

  const firstInput = await screen.findByText('Option 0', {
    selector: 'label'
  });
  await userEvent.click(firstInput);

  expect(onChange).toHaveBeenCalled();
});
