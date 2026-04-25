import React, { useState, useCallback } from 'react';
import styled, { css, useTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { format, parse, isValid as dateIsValid } from 'date-fns';
import ReactDatePicker from 'react-datepicker';

import Textbox, { TextboxProps } from '../../controls/textbox/Textbox';
import MaskedTextbox from '../../controls/textbox/MaskedTextbox';
import { useWindowWidth } from '../../util/useWindowWidth';
import { DatepickerStyles } from './datePickerStyles';
import {
  OurDatePickerProps,
  reactDatepickerPropKeys
} from './ReactDatePickerPropTypes';

import { calendarArrowStyles } from './datepickerAssets';
import useTopZIndex from '../../../hooks/useTopZIndex';
import {
  useMonitoringCallback,
  useMonitoringEffect
} from '../../../hooks/useMonitoringHooks';

const STRING_FORMAT = 'yyyy-MM-dd';

const isValid = (date: unknown): date is Date => dateIsValid(date);

const isKeyOf = <T extends object>(obj: T, key: unknown): key is keyof T =>
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  Boolean(obj && key?.toString && Object.hasOwn(obj, key?.toString()));

function pick<T extends object, K extends string>(
  obj: T,
  keys: K[]
): Pick<T, K extends keyof T ? K : keyof T> {
  return keys.reduce(
    (acc, key) => {
      if (isKeyOf(obj, key)) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as Pick<T, keyof T>
  );
}

function omit<T extends object, K extends string>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return Object.keys(obj).reduce<Omit<T, K>>(
    (acc, key) => {
      if (!keys.includes(key as K) && isKeyOf(obj, key)) {
        (acc as T)[key] = obj[key];
      }
      return acc;
    },
    {} as Omit<T, K>
  );
}

type WithRange = boolean | undefined;
type DatePickerOnChange = (
  date: Date | [Date | null, Date | null] | Date[] | null,
  event?:
    | React.KeyboardEvent<HTMLElement>
    | React.MouseEvent<HTMLElement>
    | React.ChangeEvent<HTMLInputElement>
) => void | undefined; // DatePickerProps['onChange'];
type OnChangeDate = Parameters<NonNullable<DatePickerOnChange>>[0];
type SelectedDate<T extends WithRange> = NonNullable<
  T extends true ? OnChangeDate : OnChangeDate | string
>;

function normalizeDateString(date: string, stringFormat?: string): string;
function normalizeDateString(date: Date, stringFormat?: string): string;
function normalizeDateString(date: OnChangeDate, stringFormat?: string): string;

function normalizeDateString<T extends WithRange>(
  date: Maybe<SelectedDate<T>>,
  stringFormat?: string
): string;
function normalizeDateString(
  date: Maybe<SelectedDate<WithRange>>,
  stringFormat = STRING_FORMAT
): string {
  if (typeof date === 'string') {
    const parsedDate = parse(date, stringFormat, new Date());
    return isValid(parsedDate) ? format(parsedDate, stringFormat) : '';
  }
  return isValid(date) ? format(date, stringFormat) : '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function normalizeDate<T extends WithRange = false>(date: string): OnChangeDate;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function normalizeDate<T extends WithRange = false>(date: Date): OnChangeDate;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function normalizeDate<T extends WithRange = false>(
  date: OnChangeDate
): OnChangeDate;
function normalizeDate<T extends WithRange = false>(
  date: Maybe<SelectedDate<T>>
): OnChangeDate;
function normalizeDate<T extends WithRange = false>(
  date: Maybe<SelectedDate<T>>
): OnChangeDate {
  if (typeof date === 'string') {
    const parsedDate = parse(date, STRING_FORMAT, new Date());
    return (isValid(parsedDate) ? parsedDate : null) as OnChangeDate;
  }
  if (Array.isArray(date)) {
    return date.map(d => (isValid(d) ? d : null)) as OnChangeDate;
  }
  return (isValid(date) ? date : null) as OnChangeDate;
}

type NativeWithRange<
  NT extends WithRange,
  ST extends WithRange
> = NT extends true ? false : ST extends true ? false : WithRange;

export type DatePickerPropsWithRange<
  NT extends WithRange,
  ST extends WithRange,
  T extends NativeWithRange<NT, ST>
> = Override<
  TextboxProps,
  Override<
    OurDatePickerProps<T>,
    {
      onChange?: DatePickerOnChange;
      onSelect?: DatePickerOnChange;
      suppressDatepicker?: ST;
      allowNativeDatepickerOnMobile?: NT;
      selectedDate?: Maybe<SelectedDate<T>>;
    }
  >
>;

type TextboxPropKeys = keyof TextboxProps;
type TextboxValidators = {
  [key in TextboxPropKeys]:
    | PropTypes.Requireable<TextboxProps[key]>
    | PropTypes.Validator<TextboxProps[key]>;
};
const textboxKeys = Object.keys(
  Textbox.propTypes as TextboxValidators
) as TextboxPropKeys[];

const CalendarContainer = styled.div.withConfig({
  shouldForwardProp: prop => !['showTime'].includes(prop)
})`
  ${({ theme }) => css`
    font-size: 18px;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray5};
    border-radius: 0.3rem;
    color: ${theme.colors.gray9};
    box-shadow: 0 5px 10px ${theme.colors.boxShadowLight};
    display: inline-block;
    position: relative;

    ${calendarArrowStyles}
  `}
`;

type GenericDatePickerProps = DatePickerPropsWithRange<
  WithRange,
  WithRange,
  WithRange
>;

const NativeDatePicker = React.forwardRef<
  HTMLInputElement,
  GenericDatePickerProps
>(function ForwardedNativeDatePicker<
  NT extends WithRange,
  ST extends WithRange,
  T extends NativeWithRange<NT, ST>
>(
  {
    selectedDate,
    onChange: onChangeProp,
    onSelect: onSelectProp,
    ...props
  }: DatePickerPropsWithRange<NT, ST, T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const textboxProps = pick(props, textboxKeys);

  const onChange = useMonitoringCallback(
    (
      currentOnChange,
      ...args: Parameters<React.ChangeEventHandler<HTMLInputElement>>
    ) => {
      const [e, ...rest] = args;
      currentOnChange?.(normalizeDate<T>(e.target.value), e, ...rest);
    },
    onChangeProp
  );

  const onSelect = useMonitoringCallback(
    (
      currentOnSelect,
      ...args: Parameters<React.ChangeEventHandler<HTMLInputElement>>
    ) => {
      const [e, ...rest] = args;

      // date is guaranteed to be valid on select
      currentOnSelect?.(normalizeDate(e.target.value), e, ...rest);
    },
    onSelectProp
  );

  return (
    <Textbox
      ref={ref}
      {...textboxProps}
      prependIconName="calendar"
      type="date"
      value={normalizeDateString<T>(selectedDate)}
      onChange={onChange}
      onSelect={onSelect}
    />
  );
});

const DateTextbox = React.forwardRef<HTMLInputElement, GenericDatePickerProps>(
  function ForwardedDateTextbox<
    NT extends WithRange,
    ST extends WithRange,
    T extends NativeWithRange<NT, ST>
  >(
    props: DatePickerPropsWithRange<NT, ST, T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const { suppressDatepicker = false, onChange: onChangeProp } = props;
    const getTopIndex = useTopZIndex();

    const onChange = useMonitoringCallback(
      (
        currentOnChange,
        ...args: Parameters<NonNullable<typeof onChangeProp>>
      ) => {
        currentOnChange?.(...args);
      },
      onChangeProp
    );

    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const datepickerProps = {
      ...pick(props, reactDatepickerPropKeys),
      onChange,
      ...(props.selectsRange
        ? {}
        : {
            selected: normalizeDate(props.selectedDate) as Date
          }),
      selectsRange: props.selectsRange as any, // Ignore incompatibility with react-datepicker types by casting to any
      selectsMultiple: props.selectsMultiple as any, // Ignore incompatibility with react-datepicker types by casting to any
      showMonthYearDropdown: props.showMonthYearDropdown as any // Ignore incompatibility with react-datepicker types by casting to any
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
    const textboxProps = pick(
      omit(props, reactDatepickerPropKeys),
      textboxKeys
    );
    const textboxChange = useMonitoringCallback(
      (
        currentOnChange,
        ...args: Parameters<React.ChangeEventHandler<HTMLInputElement>>
      ) => {
        if (!suppressDatepicker) return;

        const [e, ...rest] = args;
        currentOnChange?.(normalizeDate<T>(e.target.value), e, ...rest);
      },
      [suppressDatepicker],
      onChangeProp
    );

    const textbox = (
      <MaskedTextbox
        maskType="date"
        placeholder={props.placeholder}
        prependIconName="calendar"
        ref={ref}
        {...textboxProps}
        onChange={textboxChange}
      />
    );

    return (
      <>
        {props.suppressDatepicker ? (
          textbox
        ) : (
          <>
            <DatepickerStyles topIndex={getTopIndex()} />
            <ReactDatePicker
              customInput={textbox}
              placeholderText={props.placeholder}
              calendarContainer={CalendarContainer}
              {...datepickerProps}
            />
          </>
        )}
      </>
    );
  }
);

const DatePicker = React.forwardRef<HTMLInputElement, GenericDatePickerProps>(
  function ForwardedDatePicker<
    NT extends WithRange,
    ST extends WithRange,
    T extends NativeWithRange<NT, ST>
  >(
    {
      selectedDate: selectedDateProp,
      onChange,
      allowNativeDatepickerOnMobile = true,
      ...props
    }: DatePickerPropsWithRange<NT, ST, T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const hasSelectedDate = !props.selectsRange && selectedDateProp;
    const normalizedDateFromProps = hasSelectedDate
      ? normalizeDate<false>(selectedDateProp as SelectedDate<false>)
      : props.selectsRange
        ? ([null, null] as OnChangeDate)
        : (null as OnChangeDate);
    const [selectedDate, setSelectedDate] = useState<OnChangeDate>(
      normalizedDateFromProps
    );

    const dateSelected = useCallback(
      (date: SelectedDate<T>) => {
        if (date) {
          setSelectedDate(normalizeDate<T>(date));
        } else if (hasSelectedDate) {
          setSelectedDate(normalizeDate(selectedDateProp));
        } else {
          setSelectedDate(
            (props.selectsRange
              ? [null, null]
              : null) as SelectedDate<T> as OnChangeDate
          );
        }
      },
      [hasSelectedDate, selectedDateProp, props.selectsRange]
    );

    useMonitoringEffect(
      currentOnChange => {
        if (!currentOnChange) return;

        if (
          normalizeDateString(selectedDate) !==
          normalizeDateString(selectedDateProp)
        ) {
          currentOnChange(selectedDate, undefined);
        }
      },
      [selectedDate, selectedDateProp],
      onChange
    );

    const windowWidth = useWindowWidth();
    const theme = useTheme();
    const phoneWidth =
      parseInt(theme?.screenSize.phone.toString() || '0', 10) || 0;

    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.indexOf('android') > -1;

    const DatePickerInput =
      allowNativeDatepickerOnMobile && windowWidth <= phoneWidth && !isAndroid
        ? NativeDatePicker
        : DateTextbox;

    const popperClassName = props.children ? 'has-children' : '';
    const popperPlacement = props.popperPlacement || 'bottom-start';

    return (
      <DatePickerInput
        ref={ref}
        {...({
          ...props,
          selectedDate,
          onChange: dateSelected,
          popperClassName,
          popperPlacement
        } as DatePickerPropsWithRange<NT, ST, T>)}
      />
    );
  }
);

export default DatePicker;
