/* eslint-env jest */

import React from 'react';
import { fireEvent } from 'react-testing-library';

import Dropdown from './Dropdown';
import { renderWithTheme } from '../../util/test-utils';

const options = [
  {
    optionText: 'Test 1',
    optionValue: '1'
  },
  {
    optionText: 'Test 2',
    optionValue: '2'
  },
  {
    optionText: 'Test 3',
    optionValue: '3'
  }
];

it('executes the passed in "onChange" function', () => {
  const onChange = jest.fn();
  const { container } = renderWithTheme(
    <Dropdown
      name="test"
      labelText="Test"
      options={options}
      onChange={onChange}
    />
  );
  fireEvent.change(container.querySelector('select'), {
    target: { value: '1' }
  });
  expect(onChange).toHaveBeenCalled();
});

it('executes the passed in "onBlur" function', () => {
  const onBlur = jest.fn();
  const { container } = renderWithTheme(
    <Dropdown name="test" labelText="test" options={options} onBlur={onBlur} />
  );

  const select = container.querySelector('select');

  fireEvent.focus(select);
  fireEvent.blur(select);

  expect(onBlur).toHaveBeenCalled();
});

it('does not render the first option when includeDefaultFirstOption is false', () => {
  const { queryByText } = renderWithTheme(
    <Dropdown
      name="test"
      options={options}
      firstOptionDisplayText="first"
      includeDefaultFirstOption={false}
    />
  );
  expect(queryByText('first')).toBeNull();
});

it('renders the text of the first option as the firstOptionDisplayText prop value', () => {
  const { queryByText } = renderWithTheme(
    <Dropdown name="test" options={options} firstOptionDisplayText="first" />
  );

  expect(queryByText('first')).not.toBeNull();
});
