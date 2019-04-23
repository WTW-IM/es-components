/* eslint-env jest */
import React from 'react';
import { cleanup, fireEvent, wait } from 'react-testing-library';

import { renderWithTheme } from '../../util/test-utils';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import DateInput from './DateInput';

beforeEach(cleanup);

const buildDateInput = props => (
  <Control>
    <Label htmlFor="test">Text</Label>
    <DateInput id="test" name="test" {...props} data-testid="dateinput" />
  </Control>
);

it('executes the onChange function when text is changed', () => {
  const props = {
    onChange: jest.fn()
  };
  const { getByLabelText } = renderWithTheme(buildDateInput(props));

  fireEvent.change(getByLabelText('Text'), {
    target: { value: '21' }
  });
  expect(props.onChange).toHaveBeenCalled();
});

it('executes handleOnBlur when focus is lost', async () => {
  const props = {
    onBlur: jest.fn(),
    onChange: jest.fn()
  };
  const { getByTestId } = renderWithTheme(buildDateInput(props));

  fireEvent.blur(getByTestId('dateinput'));
  await wait(() => {
    expect(props.onBlur).toHaveBeenCalled();
  });
});

it('displays the value properly when defaultValue is set', () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 2, 1)
  };
  const { getByDisplayValue } = renderWithTheme(buildDateInput(props));

  expect(getByDisplayValue('1')).not.toBeNull();
  expect(getByDisplayValue('March')).not.toBeNull();
  expect(getByDisplayValue('2019')).not.toBeNull();
});

it('hides the Day input when includeDay is false', () => {
  const props = {
    onChange: jest.fn(),
    includeDay: false
  };
  const { container } = renderWithTheme(buildDateInput(props));

  expect(container).toMatchSnapshot();
});

it('orders the inputs using the dateOrder prop', () => {
  const props = {
    onChange: jest.fn(),
    dateOrder: 'dmy',
    defaultValue: new Date(2019, 5, 1)
  };
  const { getByLabelText } = renderWithTheme(buildDateInput(props));

  expect(getByLabelText('Text').value).toBe('1');
});

it('displays monthNames provided by the monthNames prop', () => {
  const props = {
    onChange: jest.fn(),
    includeDay: false,
    monthNames: ['Jan', 'Feb', 'Mar']
  };
  const { container } = renderWithTheme(buildDateInput(props));

  expect(container).toMatchSnapshot();
});

it('sets date invalid when before minDate', () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 2, 1),
    minDate: new Date(2000, 1, 1)
  };
  const { getByDisplayValue } = renderWithTheme(buildDateInput(props));

  fireEvent.change(getByDisplayValue('2019'), {
    target: {
      value: '1875'
    }
  });
  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: false,
    value: new Date(1875, 2, 1)
  });
});

it('sets date invalid when after maxDate', () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 2, 1),
    maxDate: new Date(2000, 1, 1)
  };
  const { getByDisplayValue } = renderWithTheme(buildDateInput(props));

  fireEvent.change(getByDisplayValue('2019'), {
    target: {
      value: '2001'
    }
  });
  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: false,
    value: new Date(2001, 2, 1)
  });
});

it('returns undefined when bad date is entered', () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 1, 15) // feb
  };
  const { getByDisplayValue } = renderWithTheme(buildDateInput(props));

  fireEvent.change(getByDisplayValue('15'), {
    target: {
      value: '31'
    }
  });
  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: false,
    value: undefined
  });
});

it('returns a date when valid', () => {
  const props = {
    onChange: jest.fn(),
    minDate: new Date(2000, 1, 1),
    maxDate: new Date(2020, 1, 1),
    defaultValue: new Date(2019, 1, 15) // feb
  };
  const { getByDisplayValue } = renderWithTheme(buildDateInput(props));

  fireEvent.change(getByDisplayValue('15'), {
    target: {
      value: '16'
    }
  });
  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: true,
    value: new Date(2019, 1, 16)
  });
});
