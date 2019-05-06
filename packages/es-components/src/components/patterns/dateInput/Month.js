import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';
import ValidationContext from '../../controls/ValidationContext';
import Dropdown from '../../controls/dropdown/Dropdown';

const MonthDropdown = styled(Dropdown)`
  flex: 3 1;
  order: ${props => props.monthPos};
  width: 100%;
`;

function Month({ onChange, monthNames, date, ...props }) {
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);
  const [month, setMonth] = React.useState(date ? date.getMonth() + 1 : '');

  function onMonthChange(event) {
    setMonth(event.target.value);
    onChange('month', event.target.value);
  }

  return (
    <MonthDropdown
      onChange={onMonthChange}
      {...theme.validationInputColor[validationState]}
      value={month}
      {...props}
    >
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
  monthNames: PropTypes.array
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
  ]
};

export default Month;
