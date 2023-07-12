import React from 'react';
import viaTheme from 'es-components-via-theme';

import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import DatePicker from './DatePicker';
import { renderWithTheme } from '../../util/test-utils';

const phoneWidth = parseInt(viaTheme.screenSize.phone.toString(), 10);

Object.defineProperty(window, 'innerWidth', {
  writable: true
});

function setScreenWidth(size: number) {
  window.innerWidth = size;
}

afterEach(cleanup);

it('renders DatePicker when textbox is focused', async () => {
  const user = userEvent.setup();
  renderWithTheme(
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
  await user.click(await screen.findByLabelText('Test date'));
  expect(await screen.findByText('November 2018')).toBeInTheDocument();
});

it('renders DatePicker when textbox is clicked on', async () => {
  const user = userEvent.setup();
  renderWithTheme(
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
  const label = screen.getByLabelText('Test date');
  await user.click(label);
  expect(screen.getByText('November 2018')).toBeInTheDocument();
});

it('renders the native date input when the screen is phone sized', () => {
  setScreenWidth(phoneWidth);
  renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Phone sized DatePicker</Label>
      <DatePicker id="test-date" onChange={jest.fn()} />
    </Control>
  );
  const datePickerElement = screen.getByLabelText('Phone sized DatePicker');
  expect(datePickerElement.getAttribute('type')).toBe('date');
});

it('renders the native date input when the screen is smaller than phone sized', () => {
  setScreenWidth(phoneWidth - 1);
  renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Very small screen DatePicker</Label>
      <DatePicker id="test-date" onChange={jest.fn()} />
    </Control>
  );
  const datePickerElement = screen.getByLabelText(
    'Very small screen DatePicker'
  );
  expect(datePickerElement.getAttribute('type')).toBe('date');
});

it('correctly calls onChange for the native input in the same way as the normal input', async () => {
  const onChange = jest.fn();
  setScreenWidth(phoneWidth);
  renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Phone sized DatePicker</Label>
      <DatePicker id="test-date" onChange={onChange} />
    </Control>
  );
  const datePickerElement = screen.getByLabelText('Phone sized DatePicker');
  expect(datePickerElement).toHaveAttribute('type', 'date');
  await userEvent.type(datePickerElement, '2020-01-01');

  expect(onChange).toHaveBeenCalledWith(new Date(2020, 0, 1));
});

it('renders the custom date input when the screen is smaller than phone sized, but we specify the native date picker should not be used', () => {
  setScreenWidth(phoneWidth - 1);
  renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Still the custom date picker</Label>
      <DatePicker
        id="test-date"
        onChange={jest.fn()}
        allowNativeDatepickerOnMobile={false}
      />
    </Control>
  );
  const datePickerElement = screen.getByLabelText(
    'Still the custom date picker'
  );
  expect(datePickerElement.getAttribute('type')).toBe('text');
});

it('renders the custom date input when the screen is bigger than phone sized', () => {
  setScreenWidth(phoneWidth + 1);
  renderWithTheme(
    <Control>
      <Label htmlFor="test-date">Big screen DatePicker</Label>
      <DatePicker id="test-date" onChange={jest.fn()} />
    </Control>
  );
  const datePickerElement = screen.getByLabelText('Big screen DatePicker');
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
