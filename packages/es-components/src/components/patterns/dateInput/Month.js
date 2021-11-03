/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';
import ValidationContext from '../../controls/ValidationContext';
import Dropdown from '../../controls/dropdown/Dropdown';

const MonthDropdown = styled(Dropdown)`
  flex: 3 1 100px;
`;

function Month({ onChange, monthNames, selectOptionText, date, ...props }) {
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);
  const [month, setMonth] = React.useState(date ? date.getMonth() + 1 : '');

  function onMonthChange(event) {
    setMonth(event.target.value);
    onChange('month', event.target.value);
  }

  return (
    <MonthDropdown
      aria-label="Select Month"
      onChange={onMonthChange}
      {...theme.validationInputColor[validationState]}
      value={month}
      {...props}
    >
      {selectOptionText && <option value="none">{selectOptionText}</option>}
      {monthNames.map((value, index) => (
        <option value={index + 1} key={value}>
          {value}
        </option>
      ))}
    </MonthDropdown>
  );
}

Month.propTypes = {
  /** array of month names */
  monthNames: PropTypes.array,
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
