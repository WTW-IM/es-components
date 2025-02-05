import 'get-root-node-polyfill/implement';
import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isBefore, isAfter } from 'date-fns';

import Day, { DayProps } from './Day';
import Month, { MonthProps } from './Month';
import Year, { YearProps } from './Year';

import isBool from '../../util/isBool';
import noop from '../../util/noop';
import { useMonitoringCallback } from '../../../hooks/useMonitoringHooks';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

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

export type DatePart = 'day' | 'month' | 'year';

export type DatePartChangeHandler = (part: DatePart, value: string) => void;

export type DateInputState = {
  [Key in DatePart]?: Key extends 'month' ? string | number : string;
};

export interface RawDate {
  year: string;
  month: string;
  day: string;
}

type InputProps = JSXElementProps<'input'>;
export type DateChangeEvent = {
  value?: Date;
  isInRange: boolean;
  rawValues: RawDate;
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

export interface DatePartProps {
  date?: Date;
  onChange?: DatePartChangeHandler;
  currentDateEvent?: DateChangeEvent;
  updateStateSilently?: (state: Partial<DateInputState>) => void;
}

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

const createDate = (
  dateState: DateInputState,
  {
    minDate,
    maxDate,
    hasDayElement
  }: { minDate?: Date; maxDate?: Date; hasDayElement?: boolean }
): DateChangeEvent => {
  const { day, month, year } = dateState;
  const cleanDay = day ? cleanZeroes(day.toString() as DayNumber) : day;
  const date = new Date(`${year}/${month}/${cleanDay}`);
  const dateIsValid =
    month !== 'none' &&
    year?.length === 4 &&
    (hasDayElement ? date.getDate().toString() === cleanDay : true) &&
    (month ? (date.getMonth() + 1).toString() === month.toString() : true) &&
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
};

function cloneDateChild<T extends DayProps | MonthProps | YearProps>(
  child: React.ReactElement<T>,
  currentDateEvent: DateChangeEvent,
  { defaultValue: propsDefaultValue, value: propsValue, ...props }: Partial<T>
) {
  const { value: childValue, defaultValue: childDefaultValue } = child.props;
  const value =
    propsValue || propsDefaultValue || childValue || childDefaultValue;

  return React.cloneElement(child, {
    ...child.props,
    ...props,
    currentDateEvent,
    value
  });
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
      onChange: onChangeProp,
      onBlur,
      ...props
    },
    ref
  ) {
    const onChange = useRef(onChangeProp);
    onChange.current = onChangeProp;
    const afterInitialRender = useRef(false);

    const [state, setState] = useState(
      getDefaultState(defaultValue, defaultDay)
    );
    const [silentState, setSilentState] = useState(state);

    const [currentMinDate, setCurrentMinDate] = useState(minDate);
    const [currentMaxDate, setCurrentMaxDate] = useState(maxDate);

    const hasDayElement = useMemo(
      () =>
        React.Children.toArray(children).some(
          child => isReactElementChild(child) && child.type === Day
        ),
      [children]
    );

    const currentDate = useMemo(
      () =>
        createDate(state, {
          minDate: currentMinDate,
          maxDate: currentMaxDate,
          hasDayElement
        }),
      [state, currentMinDate, currentMaxDate, hasDayElement]
    );

    useEffect(() => {
      if (!afterInitialRender.current) return;

      setSilentState(state);
    }, [state]);

    useEffect(() => {
      setCurrentMinDate(oldMin => {
        if (oldMin?.toString() === minDate?.toString()) return oldMin;
        return minDate;
      });
    }, [minDate]);

    useEffect(() => {
      setCurrentMaxDate(oldMax => {
        if (oldMax?.toString() === maxDate?.toString()) return oldMax;
        return maxDate;
      });
    }, [maxDate]);

    useEffect(() => {
      if (!afterInitialRender.current) return;

      onChange.current?.(currentDate);
    }, [currentDate]);

    const updateState = useCallback(
      (newState: Partial<DateInputState>) =>
        setState(oldState => ({ ...oldState, ...silentState, ...newState })),
      [silentState]
    );

    const updateStateSilently = useCallback(
      (newState: Partial<DateInputState>) =>
        setSilentState(oldState => ({ ...oldState, ...newState })),
      []
    );

    const onChangeDatePart = useCallback(
      (datePart: DatePart, value: string) => updateState({ [datePart]: value }),
      [updateState]
    );

    const onBlurComponent = useMonitoringCallback(
      (currentOnBlur, event: React.FocusEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        setTimeout(() => {
          if (
            !target.contains(
              (target.getRootNode() as unknown as DocumentOrShadowRoot)
                .activeElement || null
            )
          ) {
            currentOnBlur?.(event);
          }
        }, 0);
      },
      onBlur
    );

    useEffect(() => {
      afterInitialRender.current = true;
    }, []);

    let hasSetId = false;

    return (
      <Wrapper ref={ref} tabIndex={-1} {...props} onBlur={onBlurComponent}>
        {React.Children.map(children, child => {
          const isDatePart = isDatePartChild(child);
          if (!isDatePart) return child;

          const childId =
            !hasSetId && id
              ? ((hasSetId = true), id)
              : (child as HTMLElementProps).id;

          return cloneDateChild(child, currentDate, {
            id: childId,
            onChange: onChangeDatePart,
            date: currentDate.value,
            updateStateSilently
          });
        })}
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
