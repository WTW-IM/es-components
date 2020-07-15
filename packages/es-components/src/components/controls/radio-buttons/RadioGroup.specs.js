/* eslint-env jest */

import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { range } from 'lodash';

import RadioGroup from './RadioGroup';
import { renderWithTheme } from '../../util/test-utils';
import RadioButton from './RadioButton';

function buildOptions(numberOfOptions, optionIndexToDisable) {
  return range(0, numberOfOptions).map(idx => (
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

it('renders each radio input as disabled when disableAllOptions is true', () => {
  const options = buildOptions(3);
  const { container } = renderWithTheme(
    <RadioGroup name="test" disableAllOptions>
      {options}
    </RadioGroup>
  );

  const inputs = container.querySelectorAll('input');

  expect(inputs[0]).toBeDisabled();
  expect(inputs[1]).toBeDisabled();
  expect(inputs[2]).toBeDisabled();
});

it('renders a specific radio input as disabled when that option is set to disabled', () => {
  const options = buildOptions(3, 0);
  const { container } = renderWithTheme(
    <RadioGroup name="test">{options}</RadioGroup>
  );

  const inputs = container.querySelectorAll('input');

  expect(inputs[0]).toBeDisabled();
  expect(inputs[1]).not.toBeDisabled();
  expect(inputs[2]).not.toBeDisabled();
});

it('propagates event handlers to each input', () => {
  const options = buildOptions(3);
  const onChange = jest.fn();
  const { getByLabelText } = renderWithTheme(
    <RadioGroup name="test" onChange={onChange}>
      {options}
    </RadioGroup>
  );

  const firstInput = getByLabelText('Option 0');
  fireEvent.click(firstInput);

  expect(onChange).toHaveBeenCalled();
});
