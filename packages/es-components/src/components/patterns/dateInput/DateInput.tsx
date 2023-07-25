import 'get-root-node-polyfill/implement';
import React, { useEffect, useReducer, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isBefore, isAfter } from 'date-fns';

import Day, { DayProps } from './Day';
import Month, { MonthProps } from './Month';
import Year, { YearProps } from './Year';

import isBool from '../../util/isBool';
import noop from '../../util/noop';

const Wrapper = styled.div`
  display: flex;

  && > * {
    margin-right: 2px;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    max-width: 350px;
  }
`;

type DayNumber = `${'0' | ''}${number}`;
type NonZero = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type CleanNumber = `${NonZero}${number | ''}`;

function cleanZeroes(day: DayNumber) {
  let cleanDay: string = day;
  while (cleanDay.charAt(0) === '0') {
    cleanDay = cleanDay.substr(1);
  }
  return cleanDay as CleanNumber;
}

const dateParts = ['day', 'month', 'year'] as const;

export type DatePart = (typeof dateParts)[number];

export type DatePartChangeHandler = (part: DatePart, value: string) => void;

export type DateInputState = {
  [key in DatePart]?: string;
};

type DateAction = {
  type: 'day_updated' | 'month_updated' | 'year_updated';
  value: string;
};

function reducer(state: DateInputState, action: DateAction): DateInputState {
  switch (action.type) {
    case 'day_updated':
      return { ...state, day: action.value };
    case 'month_updated':
      return { ...state, month: action.value };
    case 'year_updated':
      return { ...state, year: action.value };
    default:
      throw new Error();
  }
}

type InputProps = JSXElementProps<'input'>;
export type DateChangeEvent = {
  value?: Date;
  isInRange: boolean;
  rawValues: {
    year: string;
    month: string;
    day: string;
  };
};

export type DateInputProps = Override<
  JSXElementProps<'div'>,
  {
    children: React.ReactNode;
    onChange: (event: DateChangeEvent) => void;
    id?: string;
    maxDate?: Date;
    minDate?: Date;
    onBlur?: InputProps['onBlur'];
    defaultValue?: Date;
    defaultDay?: string;
  }
>;

const getDefaultState = (
  defaultValue?: Date,
  defaultDay = ''
): DateInputState => {
  if (!defaultValue) {
    return {
      day: defaultDay,
      month: '',
      year: ''
    };
  }

  return {
    day: defaultValue.getDate().toString(),
    month: `${defaultValue.getMonth() + 1}`,
    year: defaultValue.getFullYear().toString()
  };
};

const isIterable = (value: unknown): value is Iterable<unknown> => {
  return typeof (value as Iterable<unknown>)[Symbol.iterator] === 'function';
};

function isReactElementChild(
  child: React.ReactNode
): child is React.ReactElement {
  return !(
    typeof child === 'string' ||
    typeof child === 'number' ||
    isBool(child) ||
    isIterable(child) ||
    Array.isArray(child)
  );
}

function isDatePartChild(
  child: React.ReactNode
): child is React.ReactElement<DayProps | MonthProps | YearProps> {
  return (
    isReactElementChild(child) &&
    (child.type === Day || child.type === Month || child.type === Year)
  );
}

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
  function ForwardedDateInput(
    {
      children,
      defaultValue,
      defaultDay = '',
      id,
      maxDate,
      minDate,
      onBlur = noop,
      onChange,
      ...props
    },
    ref
  ) {
    const [state, dispatch] = useReducer<typeof reducer>(
      reducer,
      getDefaultState(defaultValue, defaultDay)
    );

    const hasDayElement = useRef(false);

    useEffect(() => {
      React.Children.forEach(children, child => {
        if (!child) return;

        if (!isReactElementChild(child)) return;

        if (child.type === Month && !state.month) {
          if ((child.props as MonthProps).selectOptionText) {
            dispatch({ type: 'month_updated', value: 'none' });
          }
        }
        if (child.type === Day) {
          hasDayElement.current = true;
        }
      });
    }, [children, state.month]);

    const createDate = useCallback(
      (year?: string, month?: string, day?: string): DateChangeEvent => {
        const cleanDay = day ? cleanZeroes(day.toString() as DayNumber) : day;
        const date = new Date(`${year}/${month}/${cleanDay}`);
        const dateIsValid =
          month !== 'none' &&
          year?.length === 4 &&
          (hasDayElement.current
            ? date.getDate().toString() === cleanDay
            : true) &&
          (month
            ? (date.getMonth() + 1).toString() === month.toString()
            : true) &&
          date.getFullYear().toString() === year.toString();

        const isInRange =
          dateIsValid &&
          (minDate ? isAfter(date, minDate) : true) &&
          (maxDate ? isBefore(date, maxDate) : true);
        return {
          value: dateIsValid ? date : undefined,
          isInRange,
          rawValues: {
            year: year?.toString() || '',
            month: month === 'none' ? '' : month?.toString() || '',
            day: day?.toString() || ''
          }
        };
      },
      [maxDate, minDate]
    );

    const onChangeDatePart = useCallback(
      (datePart: DatePart, value: string) => {
        const { day, month, year } = state;
        switch (datePart) {
          case 'day':
            onChange(createDate(year, month, value));
            dispatch({
              type: 'day_updated',
              value
            });
            return;
          case 'month':
            onChange(createDate(year, value, day));
            dispatch({ type: 'month_updated', value });
            return;
          case 'year':
            onChange(createDate(value, month, day));
            dispatch({
              type: 'year_updated',
              value
            });
            return;
          default:
            throw new Error();
        }
      },
      [createDate, onChange, state]
    );

    const onBlurComponent = useCallback<
      React.FocusEventHandler<HTMLInputElement>
    >(
      event => {
        const target = event.currentTarget;
        setTimeout(() => {
          if (
            !target.contains(
              (target.getRootNode() as unknown as DocumentOrShadowRoot)
                .activeElement || null
            )
          ) {
            onBlur(event);
          }
        }, 0);
      },
      [onBlur]
    );

    let setId = false;

    return (
      <Wrapper ref={ref} tabIndex={-1} {...props} onBlur={onBlurComponent}>
        {React.Children.map(children, child =>
          isDatePartChild(child)
            ? React.cloneElement(child, {
                id:
                  !setId && id
                    ? (setId = true) && id
                    : (child.props as HTMLElementProps).id,
                onChange: onChangeDatePart,
                date: createDate(state.year, state.month, state.day).value
              })
            : child
        )}
      </Wrapper>
    );
  }
);

type DateInputType = typeof DateInput & {
  Day: typeof Day;
  Month: typeof Month;
  Year: typeof Year;
};

DateInput.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  /** set the minimum valid date */
  maxDate: PropTypes.instanceOf(Date),
  /** set the maximum valid date */
  minDate: PropTypes.instanceOf(Date),
  /** returns an object (value, isInRange) */
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  /** set the Date value of the component */
  defaultValue: PropTypes.instanceOf(Date),
  /** Set the default day of the month */
  defaultDay: PropTypes.string
};

DateInput.defaultProps = {
  id: undefined,
  maxDate: undefined,
  minDate: undefined,
  defaultValue: undefined,
  defaultDay: '',
  onBlur: noop
};

const setParts = (Input: DateInputType) => {
  Input.Day = Day;
  Input.Month = Month;
  Input.Year = Year;
};

setParts(DateInput as DateInputType);

export default DateInput as DateInputType;
