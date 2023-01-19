/* eslint-env jest */
import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import { renderWithTheme } from '../../util/test-utils';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import DateInput from './DateInput';

const buildChildren = (children, props = []) =>
  children.map((Child, i) => <Child {...props[i]} key={i} />);

const buildDateInput = props => (
  <Control>
    <Label htmlFor="test">Text</Label>
    <DateInput id="test" {...props} data-testid="dateinput" />
  </Control>
);

it('executes the onChange function when text is changed', () => {
  const props = {
    onChange: jest.fn(),
    children: buildChildren([DateInput.Month, DateInput.Day, DateInput.Year])
  };
  renderWithTheme(buildDateInput(props));

  fireEvent.change(screen.getByLabelText('Text'), {
    target: { value: '21' }
  });
  expect(props.onChange).toHaveBeenCalled();
});

it('executes handleOnBlur when focus is lost', async () => {
  const props = {
    onBlur: jest.fn(),
    onChange: jest.fn(),
    children: buildChildren([DateInput.Month, DateInput.Day, DateInput.Year])
  };
  renderWithTheme(buildDateInput(props));

  fireEvent.blur(screen.getByTestId('dateinput'));
  await waitFor(() => {
    expect(props.onBlur).toHaveBeenCalled();
  });
});

it('displays the value properly when defaultValue is set', () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 2, 1),
    children: buildChildren([DateInput.Month, DateInput.Day, DateInput.Year])
  };
  renderWithTheme(buildDateInput(props));

  expect(screen.getByDisplayValue('1')).not.toBeNull();
  expect(screen.getByDisplayValue('March')).not.toBeNull();
  expect(screen.getByDisplayValue('2019')).not.toBeNull();
});

it('hides the Day input when Day is excluded', () => {
  const props = {
    onChange: jest.fn(),
    includeDay: false,
    children: buildChildren([DateInput.Month, DateInput.Year])
  };
  renderWithTheme(buildDateInput(props));

  expect(screen.queryByRole('spinbutton', { name: /day/i })).toBeNull();
});

it('orders the inputs using the dateOrder prop', () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 5, 1),
    children: buildChildren([DateInput.Day, DateInput.Month, DateInput.Year])
  };
  renderWithTheme(buildDateInput(props));

  expect(screen.getByLabelText('Text').value).toBe('1');
});

it('displays monthNames provided by the monthNames prop', () => {
  const monthNames = ['Jan', 'Feb', 'Mar'];
  const extraMonths = [
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const props = {
    onChange: jest.fn(),
    includeDay: false,
    children: buildChildren(
      [DateInput.Month, DateInput.Day, DateInput.Year],
      [
        {
          name: 'month',
          monthNames
        },
        {
          name: 'day'
        },
        {
          name: 'year'
        }
      ]
    )
  };
  renderWithTheme(buildDateInput(props));

  monthNames.forEach(month => {
    expect(
      screen.getByRole('option', { name: new RegExp(month) })
    ).not.toBeNull();
  });
  extraMonths.forEach(month => {
    expect(
      screen.queryByRole('option', { name: new RegExp(month) })
    ).toBeNull();
  });
});

it('sets date invalid when before minDate', () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 2, 1),
    minDate: new Date(2000, 1, 1),
    children: buildChildren([DateInput.Month, DateInput.Day, DateInput.Year])
  };
  renderWithTheme(buildDateInput(props));

  fireEvent.change(screen.getByDisplayValue('2019'), {
    target: {
      value: '1875'
    }
  });
  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: false,
    rawValues: {
      day: '1',
      month: '3',
      year: '1875'
    },
    value: new Date(1875, 2, 1)
  });
});

it('sets date invalid when after maxDate', () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 2, 1),
    maxDate: new Date(2000, 1, 1),
    children: buildChildren([DateInput.Month, DateInput.Day, DateInput.Year])
  };
  renderWithTheme(buildDateInput(props));

  fireEvent.change(screen.getByDisplayValue('2019'), {
    target: {
      value: '2001'
    }
  });
  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: false,
    rawValues: {
      day: '1',
      month: '3',
      year: '2001'
    },
    value: new Date(2001, 2, 1)
  });
});

it('returns undefined when bad date is entered', () => {
  const props = {
    onChange: jest.fn(),
    children: buildChildren([DateInput.Month, DateInput.Day, DateInput.Year]),
    defaultValue: new Date(2019, 1, 15) // feb
  };
  renderWithTheme(buildDateInput(props));

  fireEvent.change(screen.getByDisplayValue('15'), {
    target: {
      value: '31'
    }
  });
  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: false,
    rawValues: {
      day: '31',
      month: '2',
      year: '2019'
    },
    value: undefined
  });
});

it('returns a date when valid', () => {
  const props = {
    onChange: jest.fn(),
    children: buildChildren([DateInput.Month, DateInput.Day, DateInput.Year]),
    minDate: new Date(2000, 1, 1),
    maxDate: new Date(2020, 1, 1),
    defaultValue: new Date(2019, 1, 15) // feb
  };
  renderWithTheme(buildDateInput(props));

  fireEvent.change(screen.getByDisplayValue('15'), {
    target: {
      value: '16'
    }
  });
  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: true,
    rawValues: {
      day: '16',
      month: '2',
      year: '2019'
    },
    value: new Date(2019, 1, 16)
  });
});

it('returns undefined when Day is present but not defined', () => {
  const props = {
    onChange: jest.fn(),
    children: buildChildren([DateInput.Month, DateInput.Day, DateInput.Year])
  };

  renderWithTheme(buildDateInput(props));

  fireEvent.change(screen.getByPlaceholderText('Year'), {
    target: {
      value: '1983'
    }
  });

  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: false,
    rawValues: {
      day: '',
      month: '',
      year: '1983'
    },
    value: undefined
  });
});

it('returns date when Day is padded with 0', () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 0, 1),
    children: buildChildren([DateInput.Month, DateInput.Day, DateInput.Year])
  };
  renderWithTheme(buildDateInput(props));

  fireEvent.change(screen.getByPlaceholderText('Day'), {
    target: {
      value: '02'
    }
  });
  fireEvent.change(screen.getByPlaceholderText('Year'), {
    target: {
      value: '1983'
    }
  });
  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: true,
    rawValues: {
      day: '02',
      month: '1',
      year: '1983'
    },
    value: new Date(1983, 0, 2)
  });
});
