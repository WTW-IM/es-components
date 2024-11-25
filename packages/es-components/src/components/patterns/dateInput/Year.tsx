/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import styled from 'styled-components';

import { BasicTextbox } from '../../controls/textbox/InputBase';
import onNonNumericHandler from './onNonNumericHandler';
import type { DatePartChangeHandler } from './DateInput';
import { useMonitoringCallback } from '../../../hooks/useMonitoringHooks';

const YearInput = styled(BasicTextbox)`
  appearance: textfield;
  flex: 2 0 40px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

export type YearProps = Override<
  JSXElementProps<'input'>,
  {
    date?: Date;
    onChange?: DatePartChangeHandler;
  }
>;

const Year = React.forwardRef<HTMLInputElement, YearProps>(
  function ForwardedYear({ date, onChange, onKeyDown, ...props }, ref) {
    const [value, setValue] = useState(date?.getFullYear() || '');

    const onYearChange = useMonitoringCallback(
      (currentOnChange, event: React.ChangeEvent<HTMLInputElement>) => {
        let year = event.target.value;
        year = year.length > 4 ? year.slice(0, 4) : year;
        setValue(year);
        currentOnChange?.('year', year);
      },
      onChange
    );

    const onYearKeyDown = useMonitoringCallback(
      (currentOnKeyDown, ev: React.KeyboardEvent<HTMLInputElement>) => {
        onNonNumericHandler(ev);
        if (ev.defaultPrevented) return;

        currentOnKeyDown?.(ev);
      },
      onKeyDown
    );

    return (
      <YearInput
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Year"
        {...props}
        ref={ref}
        onChange={onYearChange}
        onKeyDown={onYearKeyDown}
        value={value}
      />
    );
  }
);

export default Year;
