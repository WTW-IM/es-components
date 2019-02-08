/* eslint-env jest */

import React from 'react';
import moment from 'moment';
import viaTheme from 'es-components-via-theme';

import DatePicker from './DatePicker';
import { renderWithTheme } from '../../util/test-utils';

const phoneWidth = parseInt(viaTheme.screenSize.phone, 10);

it('renders DatePicker when textbox is focused', () => {
  const { getByLabelText, queryByText } = renderWithTheme(
    <DatePicker
      labelText="Test date"
      onChange={jest.fn()}
      selectedDate={moment(new Date(2018, 10, 7))}
      allowNativeDatepickerOnMobile={false}
    />
  );
  getByLabelText('Test date').focus();
  expect(queryByText('November 2018')).not.toBeNull();
});

it('renders the native date input when the screen is phone sized', () => {
  const { getByLabelText } = renderWithTheme(
    <DatePicker
      labelText="Phone sized DatePicker"
      onChange={jest.fn()}
      defaultWidth={phoneWidth}
    />
  );
  const datePickerElement = getByLabelText('Phone sized DatePicker');
  expect(datePickerElement.getAttribute('type')).toBe('date');
});

it('renders the native date input when the screen is smaller than phone sized', () => {
  const { getByLabelText } = renderWithTheme(
    <DatePicker
      labelText="Very small screen DatePicker"
      onChange={jest.fn()}
      defaultWidth={phoneWidth - 1}
    />
  );
  const datePickerElement = getByLabelText('Very small screen DatePicker');
  expect(datePickerElement.getAttribute('type')).toBe('date');
});

it('renders the custom date input when the screen is smaller than phone sized, but we specify the native date picker should not be used', () => {
  const { getByLabelText } = renderWithTheme(
    <DatePicker
      labelText="Still the custom date picker"
      onChange={jest.fn()}
      defaultWidth={phoneWidth - 1}
      allowNativeDatepickerOnMobile={false}
    />
  );
  const datePickerElement = getByLabelText('Still the custom date picker');
  expect(datePickerElement.getAttribute('type')).toBe('text');
});

it('renders the custom date input when the screen is bigger than phone sized', () => {
  const { getByLabelText } = renderWithTheme(
    <DatePicker
      labelText="Big screen DatePicker"
      onChange={jest.fn()}
      defaultWidth={phoneWidth + 1}
    />
  );
  const datePickerElement = getByLabelText('Big screen DatePicker');
  expect(datePickerElement.getAttribute('type')).toBe('text');
});

it('renders the date picker naturally when given a partial date in selectedDate', () => {
  expect(() =>
    renderWithTheme(
      <DatePicker
        labelText="Partial Date DatePicker"
        selectedDate="04/04"
        onChange={jest.fn()}
      />
    )
  ).not.toThrow();
});
