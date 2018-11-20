/* eslint-env jest */
import React from 'react';

import DatePicker from './DatePicker';
import { renderWithTheme } from '../../util/test-utils';

it('renders DatePicker when textbox is focused', () => {
  const { getByLabelText, queryByText } = renderWithTheme(
    <DatePicker
      labelText="Test date"
      onChange={jest.fn()}
      selectedDate={new Date(2018, 10, 7)}
    />
  );
  getByLabelText('Test date').focus();
  expect(queryByText('November 2018')).not.toBeNull();
});

it('renders DatePicker when textbox is clicked on', () => {
  const { getByLabelText, queryByText } = renderWithTheme(
    <DatePicker
      labelText="Test date"
      onChange={jest.fn()}
      selectedDate={new Date(2018, 10, 7)}
    />
  );
  getByLabelText('Test date').click();
  expect(queryByText('November 2018')).not.toBeNull();
});
