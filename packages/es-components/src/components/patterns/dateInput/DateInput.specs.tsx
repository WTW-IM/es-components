import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '../../util/test-utils';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import DateInput, { DateInputProps } from './DateInput';

const typeFresh = async (...args: Parameters<typeof userEvent.type>) => {
  await userEvent.clear(args[0]);
  return await userEvent.type(...args);
};

const TestDateInput = (props: DateInputProps) => (
  <Control>
    <DateInput {...props} />
  </Control>
);

it('executes the onChange function when text is changed', async () => {
  const onChange = jest.fn();

  renderWithTheme(
    <TestDateInput onChange={onChange}>
      <DateInput.Month />
      <DateInput.Day data-testid="test-day" />
      <DateInput.Year />
    </TestDateInput>
  );

  await typeFresh(await screen.findByTestId('test-day'), '21');

  expect(onChange).toHaveBeenCalled();
});

it('correctly adds id to first DatePart element', async () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 2, 1)
  };

  renderWithTheme(
    <Control>
      <Label htmlFor="test">Label Text</Label>
      <DateInput id="test" {...props}>
        <Label>Month</Label>
        <DateInput.Month data-testid="month" />
        <Label>Day</Label>
        <DateInput.Day />
        <Label>Year</Label>
        <DateInput.Year />
      </DateInput>
    </Control>
  );

  const targetInput = await screen.findByLabelText('Label Text');
  expect(targetInput).toHaveAttribute('id', 'test');
  expect(targetInput).toHaveAttribute('data-testid', 'month');
});

it('correctly adds a child id if provided', async () => {
  const props = {
    onChange: jest.fn()
  };

  renderWithTheme(
    <Control>
      <DateInput {...props}>
        <DateInput.Month />
        <DateInput.Day aria-label="day" id="test" />
        <DateInput.Year />
      </DateInput>
    </Control>
  );

  const targetInput = await screen.findByRole('spinbutton', { name: /day/i });
  expect(targetInput).toHaveAttribute('id', 'test');
});

it('executes handleOnBlur when focus is lost', async () => {
  const onBlur = jest.fn();
  const onChange = jest.fn();

  renderWithTheme(
    <TestDateInput onChange={onChange} onBlur={onBlur}>
      <DateInput.Month />
      <DateInput.Day />
      <DateInput.Year data-testid="test-year" />
    </TestDateInput>
  );

  await typeFresh(await screen.findByTestId('test-year'), '2025');
  await userEvent.tab();

  await waitFor(() => {
    expect(onBlur).toHaveBeenCalled();
  });

  expect(onChange).toHaveBeenCalledWith({
    isInRange: false,
    rawValues: {
      day: '',
      month: '1',
      year: '2025'
    }
  });
});

it('displays the value properly when defaultValue is set', async () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 2, 1)
  };

  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month />
      <DateInput.Day />
      <DateInput.Year data-testid="test-year" />
    </TestDateInput>
  );

  expect(await screen.findByDisplayValue('1')).not.toBeNull();
  expect(await screen.findByDisplayValue('March')).not.toBeNull();
  expect(await screen.findByDisplayValue('2019')).not.toBeNull();
});

it('hides the Day input when Day is excluded', () => {
  const props = {
    onChange: jest.fn()
  };
  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month />
      <DateInput.Year />
    </TestDateInput>
  );

  expect(
    screen.queryByRole('spinbutton', { name: /day/i })
  ).not.toBeInTheDocument();
});

it('displays monthNames provided by the monthNames prop', async () => {
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
    onChange: jest.fn()
  };
  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month name="month" monthNames={monthNames} />
      <DateInput.Day name="day" />
      <DateInput.Year name="year" />
    </TestDateInput>
  );

  for (const month of monthNames) {
    expect(
      await screen.findByRole('option', { name: new RegExp(month) })
    ).toBeInTheDocument();
  }

  for (const month of extraMonths) {
    expect(
      screen.queryByRole('option', { name: new RegExp(month) })
    ).not.toBeInTheDocument();
  }
});

it('sets date invalid when before minDate', async () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 2, 1),
    minDate: new Date(2000, 1, 1)
  };
  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month />
      <DateInput.Day />
      <DateInput.Year data-testid="year-input" />
    </TestDateInput>
  );

  await typeFresh(await screen.findByTestId('year-input'), '1875');

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

it('sets date invalid when after maxDate', async () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 2, 1),
    maxDate: new Date(2000, 1, 1)
  };
  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month />
      <DateInput.Day />
      <DateInput.Year data-testid="year-input" />
    </TestDateInput>
  );

  await typeFresh(await screen.findByTestId('year-input'), '2001');

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

it('returns undefined when bad date is entered', async () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 1, 15) // feb
  };
  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month />
      <DateInput.Day data-testid="day-input" />
      <DateInput.Year />
    </TestDateInput>
  );

  await typeFresh(await screen.findByTestId('day-input'), '31');

  expect(props.onChange).toHaveBeenLastCalledWith({
    isInRange: false,
    rawValues: {
      day: '31',
      month: '2',
      year: '2019'
    },
    value: undefined
  });
});

it('returns a date when valid', async () => {
  const props = {
    onChange: jest.fn(),
    minDate: new Date(2000, 1, 1),
    maxDate: new Date(2020, 1, 1),
    defaultValue: new Date(2019, 1, 15) // feb
  };
  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month />
      <DateInput.Day data-testid="day-input" />
      <DateInput.Year />
    </TestDateInput>
  );

  await typeFresh(await screen.findByTestId('day-input'), '16');

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

it('returns undefined when Day is present but not defined', async () => {
  const props = {
    onChange: jest.fn()
  };

  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month />
      <DateInput.Day />
      <DateInput.Year data-testid="year-input" />
    </TestDateInput>
  );

  await typeFresh(await screen.findByTestId('year-input'), '1983');

  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: false,
    rawValues: {
      day: '',
      month: '1',
      year: '1983'
    },
    value: undefined
  });
});

it('returns date when Day is padded with 0', async () => {
  const props = {
    onChange: jest.fn(),
    defaultValue: new Date(2019, 0, 1)
  };

  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month />
      <DateInput.Day data-testid="day-input" />
      <DateInput.Year data-testid="year-input" />
    </TestDateInput>
  );

  await typeFresh(await screen.findByTestId('day-input'), '02');
  await typeFresh(await screen.findByTestId('year-input'), '1983');

  expect(props.onChange).toHaveBeenCalledWith({
    isInRange: true,
    rawValues: {
      day: '2', // jsdom clears the leading 0 for input type 'number'
      month: '1',
      year: '1983'
    },
    value: new Date(1983, 0, 2)
  });
});

it('sets the value of Day input when defaultDay is provided', async () => {
  const props = {
    onChange: jest.fn(),
    defaultDay: '15'
  };

  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month />
      <DateInput.Day aria-label="day" />
      <DateInput.Year />
    </TestDateInput>
  );

  expect(await screen.findByRole('spinbutton', { name: /day/ })).toHaveValue(
    15
  );
});

it('can handle a subset of months', async () => {
  const props = {
    onChange: jest.fn()
  };

  renderWithTheme(
    <TestDateInput {...props}>
      <DateInput.Month
        aria-label="month"
        monthNames={['Feb', 'Apr', 'Dec']}
        monthValues={[2, 4, 12]}
      />
      <DateInput.Day aria-label="day" />
      <DateInput.Year aria-label="year" />
    </TestDateInput>
  );

  await userEvent.selectOptions(
    await screen.findByRole('combobox', { name: /month/ }),
    'Apr'
  );
  await typeFresh(await screen.findByRole('spinbutton', { name: /day/ }), '15');
  await typeFresh(
    await screen.findByRole('spinbutton', { name: /year/ }),
    '2025'
  );

  expect(props.onChange).toHaveBeenLastCalledWith({
    isInRange: true,
    rawValues: {
      day: '15',
      month: '4',
      year: '2025'
    },
    value: new Date('2025/4/15')
  });
});

it('throws an error if monthNames and monthValues are different lengths', () => {
  expect(() => {
    renderWithTheme(
      <TestDateInput onChange={jest.fn()}>
        <DateInput.Month
          monthNames={['Jan', 'Feb', 'Mar']}
          monthValues={[1, 2]}
        />
        <DateInput.Day />
        <DateInput.Year />
      </TestDateInput>
    );
  }).toThrow();
});
