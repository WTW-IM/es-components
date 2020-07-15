/* eslint-env jest */
import React from 'react';
import { cleanup } from '@testing-library/react';

import CheckboxGroup from './CheckboxGroup';
import { renderWithTheme } from '../../util/test-utils';

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

it('renders with the supplied options', () => {
  const onChange = jest.fn();
  const { getByLabelText } = renderWithTheme(
    <CheckboxGroup options={checkboxOptions} onChange={onChange} />
  );

  expect(getByLabelText('hiking')).toBeTruthy();
});

it('executes onChange prop when a checkbox is clicked', () => {
  const onChange = jest.fn();
  const { getByLabelText } = renderWithTheme(
    <CheckboxGroup options={checkboxOptions} onChange={onChange} />
  );

  getByLabelText('biking').click();
  expect(onChange).toHaveBeenCalled();
});

it('select all checkbox returns all options when checked', () => {
  const onChange = jest.fn();
  const { getByLabelText } = renderWithTheme(
    <CheckboxGroup
      options={checkboxOptions}
      onChange={onChange}
      checkAllText="select all"
    />
  );

  getByLabelText('select all').click();
  expect(onChange).toHaveBeenCalledWith([
    'hiking',
    'biking',
    'kayaking',
    'camping'
  ]);
});

it('select all checkbox returns empty array when unchecked', () => {
  const onChange = jest.fn();
  const { getByLabelText } = renderWithTheme(
    <CheckboxGroup
      options={checkboxOptions}
      onChange={onChange}
      checkAllText="select all"
    />
  );

  getByLabelText('select all').click();
  getByLabelText('select all').click();
  expect(onChange).toHaveBeenCalledWith([]);
});

it('cannot be clicked when disabled', () => {
  const onChange = jest.fn();
  const { container, getByLabelText } = renderWithTheme(
    <CheckboxGroup
      options={checkboxOptions}
      onChange={onChange}
      disableAllOptions
    />
  );

  getByLabelText('hiking').click();
  expect(onChange).not.toHaveBeenCalled();
  expect(container.querySelector('input')).toBeDisabled();
});

it('checks the correct boxes by default', () => {
  const onChange = jest.fn();
  const { getByLabelText } = renderWithTheme(
    <CheckboxGroup options={checkboxOptions} onChange={onChange} />
  );

  expect(getByLabelText('hiking').checked).toEqual(false);
  expect(getByLabelText('biking').checked).toEqual(true);
});
