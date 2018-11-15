/* eslint-env jest */

import React from 'react';
import { cleanup } from 'react-testing-library';

import Checkbox from './Checkbox';
import { renderWithTheme } from '../../util/test-utils';

beforeEach(cleanup);

it('executes onClick prop when label is clicked', () => {
  const onClick = jest.fn();

  const { getByLabelText } = renderWithTheme(
    <Checkbox name="test" labelText="test label" onClick={onClick} />
  );

  getByLabelText('test label').click();
  expect(onClick).toHaveBeenCalled();
});

it('cannot be clicked when disabled', () => {
  const onClick = jest.fn();
  const { container, getByLabelText } = renderWithTheme(
    <Checkbox name="test" labelText="test label" onClick={onClick} disabled />
  );

  getByLabelText('test label').click();
  expect(onClick).not.toHaveBeenCalled();
  expect(container.querySelector('input')).toBeDisabled();
});

it('will render additional help when passed', () => {
  const { queryByText } = renderWithTheme(
    <Checkbox
      name="test"
      labelText="test label"
      onClick={jest.fn()}
      additionalHelpContent="help me"
    />
  );

  expect(queryByText('help me')).not.toBeNull();
});

it('will not render additional help when not passed', () => {
  const { queryByText } = renderWithTheme(
    <Checkbox name="test" labelText="test label" onClick={jest.fn()} />
  );

  expect(queryByText('help me')).toBeNull();
});
