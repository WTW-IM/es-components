/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import styled from 'styled-components';

import { BasicTextbox } from '../../controls/textbox/InputBase';
import onNonNumericHandler from './onNonNumericHandler';
import { useMonitoringCallback } from '../../../hooks/useMonitoringHooks';
import type { DatePartProps } from './DateInput';

const DayInput = styled(BasicTextbox)`
  flex: 1 0 35px;
  appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    margin: 0;
    appearance: none;
  }
`;

export type DayProps = Override<JSXElementProps<'input'>, DatePartProps>;

const Day = React.forwardRef<HTMLInputElement, DayProps>(function ForwardedDay(
  { date, currentDateEvent, onChange, onKeyDown, ...props },
  ref
) {
  const [value, setValue] = useState<string>(
    props.value?.toString() ||
      date?.getDate().toString() ||
      currentDateEvent?.rawValues?.day ||
      ''
  );

  const onDayChange: React.ChangeEventHandler<HTMLInputElement> =
    useMonitoringCallback(
      (currentOnChange, event: React.ChangeEvent<HTMLInputElement>) => {
        let day = event.currentTarget.value;
        day = day.length > 2 ? day.slice(0, 2) : day;
        setValue(day);
        currentOnChange?.('day', day);
      },
      onChange
    );

  const onDayKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useMonitoringCallback(
      (currentOnKeyDown, ev: React.KeyboardEvent<HTMLInputElement>) => {
        onNonNumericHandler(ev);
        if (ev.defaultPrevented) return;

        currentOnKeyDown?.(ev);
      },
      onKeyDown
    );

  return (
    <DayInput
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
