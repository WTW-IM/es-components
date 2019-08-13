/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';
import ValidationContext from '../../controls/ValidationContext';
import InputBase from '../../controls/textbox/InputBase';

const DayInput = styled(InputBase)`
  appearance: textfield;
  flex: 1 0 35px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

function Day({ onChange, date, ...props }) {
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);
  const [value, setValue] = React.useState(date ? date.getDate() : '');

  function onDayChange(event) {
    let day = event.target.value;
    day = day.length > 2 ? day.slice(0, 2) : day;
    setValue(day);
    onChange('day', day);
  }

  return (
    <DayInput
      type="number"
      min="1"
      max="31"
      onChange={onDayChange}
      placeholder="Day"
      value={value}
      {...theme.validationInputColor[validationState]}
      {...props}
    />
  );
}

export default Day;
