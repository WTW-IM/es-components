/* eslint-env jest */

import React from 'react';
import { cleanup } from '@testing-library/react';

import Checkbox from './Checkbox';
import { renderWithTheme } from '../../util/test-utils';

beforeEach(cleanup);

it('executes onClick prop when label is clicked', () => {
  const onClick = jest.fn();

  const { getByLabelText } = renderWithTheme(
    <Checkbox name="test" onClick={onClick}>
      test label
    </Checkbox>
  );

  getByLabelText('test label').click();
  expect(onClick).toHaveBeenCalled();
});

it('cannot be clicked when disabled', () => {
  const onClick = jest.fn();
  const { container, getByLabelText } = renderWithTheme(
    <Checkbox name="test" onClick={onClick} disabled>
      test label
    </Checkbox>
  );

  getByLabelText('test label').click();
  expect(onClick).not.toHaveBeenCalled();
  expect(container.querySelector('input')).toBeDisabled();
});
