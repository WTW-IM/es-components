/* eslint react/prop-types: 0 */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { BasicTextbox } from '../../controls/textbox/InputBase';
import onNonNumericHandler from './onNonNumericHandler';
import type { DatePartChangeHandler } from './DateInput';
import noop from '../../util/noop';

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
  function ForwardedYear(
    { onChange = noop, onKeyDown = noop, date, ...props },
    ref
  ) {
    const [value, setValue] = useState(date?.getFullYear() || '');

    const onYearChange = useCallback<
      React.ChangeEventHandler<HTMLInputElement>
    >(
      event => {
        let year = event.target.value;
        year = year.length > 4 ? year.slice(0, 4) : year;
        setValue(year);
        onChange('year', year);
      },
      [onChange]
    );

    const onYearKeyDown = useCallback<
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
      <YearInput
        aria-label="Year"
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
