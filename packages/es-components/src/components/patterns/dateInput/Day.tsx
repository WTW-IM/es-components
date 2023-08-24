/* eslint react/prop-types: 0 */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { BasicTextbox } from '../../controls/textbox/InputBase';
import onNonNumericHandler from './onNonNumericHandler';
import type { DatePartChangeHandler } from './DateInput';
import noop from '../../util/noop';

const DayInput = styled(BasicTextbox)`
  appearance: textfield;
  flex: 1 0 35px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

export type DayProps = Override<
  JSXElementProps<'input'>,
  {
    date?: Date;
    onChange?: DatePartChangeHandler;
  }
>;

const Day = React.forwardRef<HTMLInputElement, DayProps>(function ForwardedDay(
  { onChange = noop, onKeyDown = noop, date, ...props },
  ref
) {
  const [value, setValue] = useState<string>(date?.getDate().toString() || '');

  const onDayChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      let day = event.currentTarget.value;
      day = day.length > 2 ? day.slice(0, 2) : day;
      setValue(day);
      onChange('day', day);
    },
    [onChange]
  );

  const onDayKeyDown = useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    ev => {
      onNonNumericHandler(ev);
      if (ev.defaultPrevented) return;

      onKeyDown(ev);
    },
    [onKeyDown]
  );

  return (
    <DayInput
      aria-label="Day"
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      min="1"
      max="31"
      placeholder="Day"
      {...props}
      ref={ref}
      onKeyDown={onDayKeyDown}
      onChange={onDayChange}
      value={value}
    />
  );
});

export default Day;
