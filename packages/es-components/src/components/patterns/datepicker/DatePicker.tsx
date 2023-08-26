import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format, parse, isValid as dateIsValid } from 'date-fns';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import Textbox, { TextboxProps } from '../../controls/textbox/Textbox';
import MaskedTextbox from '../../controls/textbox/MaskedTextbox';
import { useWindowWidth } from '../../util/useWindowWidth';
import { useTheme } from '../../util/useTheme';
import { DatepickerStyles } from './datePickerStyles';
import {
  OurReactDatePickerProps,
  reactDatepickerPropKeys,
  reactDatePickerPropTypes
} from './ReactDatePickerPropTypes';

import { calendarArrowStyles } from './datepickerAssets';
import useTopZIndex from '../../../hooks/useTopZIndex';
import noop from '../../util/noop';

const STRING_FORMAT = 'yyyy-MM-dd' as const;

const isValid = (date: unknown): date is Date => dateIsValid(date as Date);

const isKeyOf = <T extends object>(obj: T, key: unknown): key is keyof T =>
  Boolean(obj && key?.toString && Object.hasOwn(obj, key?.toString()));

function pick<T extends object, K extends string>(
  obj: T,
  keys: K[]
): Pick<T, K extends keyof T ? K : keyof T> {
  return keys.reduce((acc, key) => {
    if (isKeyOf(obj, key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Pick<T, keyof T>);
}

function omit<T extends object, K extends string>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return Object.keys(obj).reduce<Omit<T, K>>((acc, key) => {
    if (!keys.includes(key as K) && isKeyOf(obj, key)) {
      (acc as T)[key as keyof T] = obj[key as keyof T];
    }
    return acc;
  }, {} as Omit<T, K>);
}

function normalizeDateString(
  date: Maybe<Date | string>,
  stringFormat = STRING_FORMAT
) {
  if (typeof date === 'string') {
    const parsedDate = parse(date, stringFormat, new Date());
    return isValid(parsedDate) ? format(parsedDate, stringFormat) : '';
  }
  return isValid(date) ? format(date, stringFormat) : '';
}

function normalizeDate(date: Maybe<Date | string>) {
  if (typeof date === 'string') {
    const parsedDate = parse(date, STRING_FORMAT, new Date());
    return isValid(parsedDate) ? parsedDate : null;
  }
  return isValid(date) ? date : null;
}

export type DatePickerProps = Override<
  TextboxProps,
  Override<
    OurReactDatePickerProps,
    {
      suppressDatepicker?: boolean;
      allowNativeDatepickerOnMobile?: boolean;
      selectedDate?: Maybe<Date | string>;
      onChange?: (date: Maybe<Date>) => void;
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

const CalendarContainer = styled.div`
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.colors.gray9};
  box-shadow: 0 5px 10px ${({ theme }) => theme.colors.boxShadowLight};
  display: inline-block;
  position: relative;

  ${calendarArrowStyles}
`;

function NativeDatePicker({ selectedDate, ...props }: DatePickerProps) {
  const propsRef = useRef(props);
  propsRef.current = props;
  const textboxProps = pick(props, textboxKeys);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      (propsRef.current.onChange || noop)(normalizeDate(e.target.value));
    },
    []
  );

  const onSelect = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      // date is guaranteed to be valid on select
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (propsRef.current.onSelect || noop)(normalizeDate(e.target.value)!, e);
    },
    []
  );

  return (
    <Textbox
      prependIconName="calendar"
      type="date"
      value={normalizeDateString(selectedDate)}
      {...textboxProps}
      onChange={onChange}
      onSelect={onSelect}
    />
  );
}

export type DateTextboxProps = Override<
  DatePickerProps,
  {
    onChange: ReactDatePickerProps['onChange'];
  }
>;

const DateTextbox = React.forwardRef<HTMLInputElement, DateTextboxProps>(
  function ForwardedDateTextbox(props, ref) {
    const propsRef = useRef(props);
    propsRef.current = props;
    const { suppressDatepicker } = props;
    const getTopIndex = useTopZIndex();

    const datepickerProps = pick(props, reactDatepickerPropKeys);
    const textboxProps = pick(
      omit(props, reactDatepickerPropKeys),
      textboxKeys
    );

    const textboxChange = useCallback<
      React.ChangeEventHandler<HTMLInputElement>
    >(
      e => {
        if (!suppressDatepicker) return;

        (propsRef.current.onChange || noop)(normalizeDate(e.target.value), e);
      },
      [suppressDatepicker]
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
              selected={normalizeDate(props.selectedDate)}
              calendarContainer={CalendarContainer}
              {...datepickerProps}
            />
          </>
        )}
      </>
    );
  }
);

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  function ForwardedDatePicker(props, ref) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { selectedDate: selectedDateProp = '', onChange: _onChange } = props;
    const normalizedDateFromProps = props.selectedDate
      ? normalizeDate(props.selectedDate)
      : null;
    const [selectedDate, setSelectedDate] = useState<Maybe<Date>>(
      normalizedDateFromProps
    );
    const propsRef = useRef(props);
    propsRef.current = props;

    const dateSelected = useCallback(
      (dateOrEvent: Maybe<Date | React.ChangeEvent<HTMLInputElement>>) => {
        if (dateOrEvent) {
          if (isValid(dateOrEvent)) {
            setSelectedDate(dateOrEvent);
          } else {
            const normalizedDate = normalizeDate(dateOrEvent.target.value);
            setSelectedDate(normalizedDate);
          }
        } else {
          setSelectedDate(null);
        }
      },
      []
    );

    useEffect(() => {
      if (!propsRef.current.onChange) return;

      if (
        normalizeDateString(selectedDate) !==
        normalizeDateString(selectedDateProp)
      ) {
        propsRef.current.onChange(selectedDate);
      }
    }, [selectedDate, selectedDateProp]);

    const windowWidth = useWindowWidth();
    const theme = useTheme();
    const phoneWidth = parseInt(theme.screenSize.phone.toString(), 10) || 0;

    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.indexOf('android') > -1;

    const DatePickerInput =
      props.allowNativeDatepickerOnMobile &&
      windowWidth <= phoneWidth &&
      !isAndroid
        ? NativeDatePicker
        : DateTextbox;

    const popperClassName = props.children ? 'has-children' : '';

    return (
      <DatePickerInput
        ref={ref}
        {...props}
        selectedDate={selectedDate}
        onChange={dateSelected}
        popperClassName={popperClassName}
      />
    );
  }
);

type IsOptional<T, K extends keyof T> = K extends keyof T
  ? undefined extends T[K]
    ? K
    : never
  : never;
type OptionalKeys<T> = { [K in keyof T]-?: IsOptional<T, K> }[keyof T];

type DefaultProps<T> = {
  [P in OptionalKeys<T>]: NonNullable<T[P]>;
};

class DefaultReactDatePicker {
  public static defaultProps: DefaultProps<OurReactDatePickerProps>;
}

type DefaultDatePickerConstructor = typeof DefaultReactDatePicker;

export const propTypes = {
  ...reactDatePickerPropTypes,
  onChange: PropTypes.func,
  suppressDatepicker: PropTypes.bool,
  allowNativeDatepickerOnMobile: PropTypes.bool,
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ])
};

export const defaultProps = {
  ...(ReactDatePicker as unknown as DefaultDatePickerConstructor).defaultProps,
  highlightDates: undefined,
  suppressDatepicker: false,
  allowNativeDatepickerOnMobile: true,
  onChange: undefined,
  children: undefined
};

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
