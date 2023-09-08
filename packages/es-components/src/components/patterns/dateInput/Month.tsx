/* eslint react/prop-types: 0 */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';
import ValidationContext from '../../controls/ValidationContext';
import Dropdown, { DropdownProps } from '../../controls/dropdown/Dropdown';
import type { DatePartChangeHandler } from './DateInput';
import { useMonitoringCallback } from '../../../hooks/useMonitoringHooks';

const MonthDropdown = styled(Dropdown)`
  flex: 3 1 100px;
`;

export type MonthProps = Override<
  DropdownProps,
  {
    monthNames?: string[];
    date?: Date;
    selectOptionText?: string;
    onChange?: DatePartChangeHandler;
  }
>;

const Month = React.forwardRef<HTMLSelectElement, MonthProps>(
  function ForwardedMonth(
    { monthNames = [], selectOptionText, date, onChange, ...props },
    ref
  ) {
    const theme = useTheme();
    const validationState = useContext(ValidationContext);
    const [month, setMonth] = useState(date ? date.getMonth() + 1 : '');

    const onMonthChange: React.ChangeEventHandler<HTMLSelectElement> =
      useMonitoringCallback((currentOnChange, event) => {
        setMonth(event.target.value);
        currentOnChange?.('month', event.target.value);
      }, onChange);

    return (
      <MonthDropdown
        aria-label="Select Month"
        {...theme.validationInputColor[validationState]}
        {...props}
        onChange={onMonthChange}
        value={month}
        ref={ref}
      >
        {selectOptionText && <option value="">{selectOptionText}</option>}
        {monthNames.map((value, index) => (
          <option value={index + 1} key={value}>
            {value}
          </option>
        ))}
      </MonthDropdown>
    );
  }
);

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
] as const;

export type MonthName = (typeof monthNames)[number];

Month.propTypes = {
  /** array of month names */
  monthNames: PropTypes.arrayOf<string>(
    PropTypes.oneOfType([PropTypes.oneOf(monthNames), PropTypes.string])
      .isRequired
  ),
  /** adds an unselected option at the top */
  selectOptionText: PropTypes.string
};

Month.defaultProps = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  selectOptionText: undefined
};

export default Month;
