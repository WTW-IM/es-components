/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';

import { BasicTextbox } from '../../controls/textbox/InputBase';
import onNonNumericHandler from './onNonNumericHandler';

const DayInput = styled(BasicTextbox)`
  appearance: textfield;
  flex: 1 0 35px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

function Day({ onChange, date, ...props }) {
  const [value, setValue] = React.useState(date ? date.getDate() : '');

  function onDayChange(event) {
    let day = event.target.value;
    day = day.length > 2 ? day.slice(0, 2) : day;
    setValue(day);
    onChange('day', day);
  }

  return (
    <DayInput
      aria-label="Day"
      type="number"
      inputmode="numeric"
      pattern="[0-9]*"
      min="1"
      max="31"
      onKeyDown={onNonNumericHandler}
      onChange={onDayChange}
      placeholder="Day"
      value={value}
      {...props}
    />
  );
}

export default Day;
