import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isBefore, isAfter } from 'date-fns';
import { noop } from 'lodash';

import { useTheme } from '../../util/useTheme';
import ValidationContext from '../../controls/ValidationContext';
import InputBase from '../../controls/textbox/InputText';
import Dropdown from '../../controls/dropdown/Dropdown';

const Wrapper = styled.div`
  display: flex;

  && > * {
    margin-right: 2px;
    min-width: 0;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    width: 325px;
  }
`;

const NumberInput = styled(InputBase)`
  appearance: textfield;
  margin: 0;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

const DayInput = styled(NumberInput)`
  flex: 1 1;
  order: ${props => props.dayPos};
`;

const YearInput = styled(NumberInput)`
  flex: 2 1;
  order: ${props => props.yearPos};
`;

const MonthDropdown = styled(Dropdown)`
  flex: 3 1;
  order: ${props => props.monthPos};
  width: 100%;
`;

function reducer(state, action) {
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

function DateInput({
  defaultValue,
  id,
  includeDay,
  maxDate,
  minDate,
  monthNames,
  name,
  onBlur,
  onChange,
  dateOrder,
  ...props
}) {
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);
  const monthPos = dateOrder.indexOf('m') + 1;
  const dayPos = dateOrder.indexOf('d') + 1;
  const yearPos = dateOrder.indexOf('y') + 1;

  const [state, dispatch] = useReducer(reducer, {
    day: defaultValue ? defaultValue.getDate() : '',
    month: defaultValue ? defaultValue.getMonth() + 1 : 1,
    year: defaultValue ? defaultValue.getFullYear().toString() : ''
  });

  function createDate(year, month, day) {
    const date = new Date(`${year}/${month}/${day}`);
    const dateIsValid =
      year.length === 4 &&
      (includeDay ? date.getDate().toString() === day.toString() : true) &&
      (date.getMonth() + 1).toString() === month.toString() &&
      date.getFullYear().toString() === year.toString();
    const isInRange =
      dateIsValid &&
      (minDate ? isAfter(date, minDate) : true) &&
      (maxDate ? isBefore(date, maxDate) : true);
    return {
      value: dateIsValid ? date : undefined,
      isInRange
    };
  }

  function onDayChange(event) {
    let day = event.target.value;
    day = day.length > 2 ? day.slice(0, 2) : day;
    onChange(createDate(state.year, state.month, day));
    dispatch({
      type: 'day_updated',
      value: day
    });
  }

  function onYearChange(event) {
    let year = event.target.value;
    year = year.length > 4 ? year.slice(0, 4) : year;
    onChange(createDate(year, state.month, state.day));
    dispatch({
      type: 'year_updated',
      value: year
    });
  }

  function onMonthChange(event) {
    const month = event.target.value;
    onChange(createDate(state.year, month, state.day));
    dispatch({ type: 'month_updated', value: month });
  }

  function onBlurComponent(event) {
    const target = event.currentTarget;
    setTimeout(() => {
      if (!target.contains(document.activeElement)) {
        onBlur(event);
      }
    }, 0);
  }

  return (
    <Wrapper tabIndex="-1" {...props} onBlur={onBlurComponent}>
      <MonthDropdown
        id={id && monthPos === 1 ? id : undefined}
        name={name && `${name}-month`}
        onChange={onMonthChange}
        value={state.month}
        monthPos={monthPos}
        {...theme.validationInputColor[validationState]}
      >
        {monthNames.map((value, index) => (
          <option value={index + 1} key={value}>
            {value}
          </option>
        ))}
      </MonthDropdown>
      {includeDay && (
        <DayInput
          id={id && dayPos === 1 ? id : undefined}
          type="number"
          name={name && `${name}-day`}
          min="1"
          max="31"
          onChange={onDayChange}
          placeholder="Day"
          value={state.day}
          dayPos={dayPos}
          {...theme.validationInputColor[validationState]}
        />
      )}
      <YearInput
        id={id && yearPos === 1 ? id : undefined}
        type="number"
        name={name && `${name}-year`}
        onChange={onYearChange}
        placeholder="Year"
        value={state.year}
        yearPos={yearPos}
        {...theme.validationInputColor[validationState]}
      />
    </Wrapper>
  );
}

DateInput.propTypes = {
  id: PropTypes.string,
  /** set the minimum valid date */
  maxDate: PropTypes.instanceOf(Date),
  /** set the maximum valid date */
  minDate: PropTypes.instanceOf(Date),
  /** array of month names */
  monthNames: PropTypes.array,
  name: PropTypes.string,
  /** returns an object (value, isInRange) */
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  /** show or hide the Day field */
  includeDay: PropTypes.bool,
  /** set the Date value of the component */
  defaultValue: PropTypes.instanceOf(Date),
  /** set the order of the date inputs */
  dateOrder: PropTypes.string
};

DateInput.defaultProps = {
  id: undefined,
  maxDate: undefined,
  minDate: undefined,
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  name: undefined,
  includeDay: true,
  defaultValue: undefined,
  onBlur: noop,
  dateOrder: 'mdy'
};

export default DateInput;
