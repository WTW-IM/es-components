/* eslint-env jest */
import React from 'react';
import viaTheme from 'es-components-via-theme';

import { cleanup, fireEvent } from 'react-testing-library';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import DatePicker from './DatePicker';
import { renderWithTheme } from '../../util/test-utils';

const phoneWidth = parseInt(viaTheme.screenSize.phone, 10);

afterEach(cleanup);

it('renders DatePicker when textbox is focused', () => {
  const { getByLabelText, queryByText } = renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Test date</Label>
      <DatePicker
        id="test-date"
        onChange={jest.fn()}
        selectedDate={new Date(2018, 10, 7)}
        allowNativeDatepickerOnMobile={false}
      />
    </Control>
  );
  getByLabelText('Test date').focus();
  expect(queryByText('November 2018')).not.toBeNull();
});

it('renders DatePicker when textbox is clicked on', () => {
  const { getByLabelText, queryByText } = renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Test date</Label>
      <DatePicker
        id="test-date"
        onChange={jest.fn()}
        selectedDate={new Date(2018, 10, 7)}
        allowNativeDatepickerOnMobile={false}
      />
    </Control>
  );
  const label = getByLabelText('Test date');
  fireEvent.click(label);
  expect(queryByText('November 2018')).not.toBeNull();
});

it('renders the native date input when the screen is phone sized', () => {
  const { getByLabelText } = renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Phone sized DatePicker</Label>
      <DatePicker
        id="test-date"
        onChange={jest.fn()}
        defaultWidth={phoneWidth}
      />
    </Control>
  );
  const datePickerElement = getByLabelText('Phone sized DatePicker');
  expect(datePickerElement.getAttribute('type')).toBe('date');
});

it('renders the native date input when the screen is smaller than phone sized', () => {
  const { getByLabelText } = renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Very small screen DatePicker</Label>
      <DatePicker
        id="test-date"
        onChange={jest.fn()}
        defaultWidth={phoneWidth - 1}
      />
    </Control>
  );
  const datePickerElement = getByLabelText('Very small screen DatePicker');
  expect(datePickerElement.getAttribute('type')).toBe('date');
});

it('renders the custom date input when the screen is smaller than phone sized, but we specify the native date picker should not be used', () => {
  const { getByLabelText } = renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Still the custom date picker</Label>
      <DatePicker
        id="test-date"
        onChange={jest.fn()}
        defaultWidth={phoneWidth - 1}
        allowNativeDatepickerOnMobile={false}
      />
    </Control>
  );
  const datePickerElement = getByLabelText('Still the custom date picker');
  expect(datePickerElement.getAttribute('type')).toBe('text');
});

it('renders the custom date input when the screen is bigger than phone sized', () => {
  const { getByLabelText } = renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Big screen DatePicker</Label>
      <DatePicker
        id="test-date"
        onChange={jest.fn()}
        defaultWidth={phoneWidth + 1}
      />
    </Control>
  );
  const datePickerElement = getByLabelText('Big screen DatePicker');
  expect(datePickerElement.getAttribute('type')).toBe('text');
});

it('renders the date picker naturally when given a partial date in selectedDate', () => {
  expect(() =>
    renderWithTheme(
      <Control>
        <Label htmlFor="test-date">Partial Date DatePicker</Label>
        <DatePicker id="test-date" selectedDate="04/04" onChange={jest.fn()} />
      </Control>
    )
  ).not.toThrow();
});
