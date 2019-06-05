import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';
import ValidationContext from '../../controls/ValidationContext';

const DropdownBase = styled.select`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray5};
  border-radius: 2px;
  box-shadow: ${props => props.boxShadow};
  box-sizing: border-box;
  color: ${props => props.theme.colors.black};
  flex: auto;
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: normal;
  height: 39px;
  min-width: 100px;
  padding: 6px 12px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  &:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
    outline: 0;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.gray2};
    cursor: not-allowed;
  }
`;

const MonthDropdown = styled(DropdownBase)`
  flex: 3 1;

  & + span {
    display: none;
  }
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
