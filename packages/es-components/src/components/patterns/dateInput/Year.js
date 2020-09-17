/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';
import ValidationContext from '../../controls/ValidationContext';
import InputBase from '../../controls/textbox/InputBase';
import onNonNumericHandler from './onNonNumericHandler';

const YearInput = styled(InputBase)`
  appearance: textfield;
  flex: 2 0 40px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

function Year({ onChange, date, ...props }) {
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);
  const [value, setValue] = React.useState(date ? date.getFullYear() : '');

  function onYearChange(event) {
    let year = event.target.value;
    year = year.length > 4 ? year.slice(0, 4) : year;
    setValue(year);
    onChange('year', year);
  }

  return (
    <YearInput
      type="number"
      inputmode="numeric"
      pattern="[0-9]*"
      onChange={onYearChange}
      onKeyDown={onNonNumericHandler}
      placeholder="Year"
      value={value}
      {...theme.validationInputColor[validationState]}
      {...props}
    />
  );
}

export default Year;
