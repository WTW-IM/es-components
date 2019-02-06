import React from 'react';
import PropTypes from 'prop-types';
import { noop, pick, omit } from 'lodash';
import ReactDatePicker from 'react-datepicker';
import uncontrollable from 'uncontrollable';

import { DatepickerStyles } from './datePickerStyles';
import Textbox from '../../controls/textbox/Textbox';

export function DatePicker(props) {
  const {
    children,
    name,
    onChange,
    onBlur,
    placeholder,
    selectedDate,
    ...otherProps
  } = props;

  /* eslint-disable react/forbid-foreign-prop-types */
  const datepickerProps = pick(
    otherProps,
    Object.keys(ReactDatePicker.propTypes)
  );
  const textboxProps = omit(otherProps, Object.keys(ReactDatePicker.propTypes));

  /* eslint-enable */

  const textbox = (
    <Textbox
      maskType="date"
      name={name}
      prependIconName="calendar"
      {...textboxProps}
    />
  );

  return (
    <>
      <DatepickerStyles />
      <ReactDatePicker
        customInput={textbox}
        customInputRef="inputRef"
        onChange={onChange}
        onBlur={onBlur}
        placeholderText={placeholder}
        selected={selectedDate}
        {...datepickerProps}
      >
        {children}
      </ReactDatePicker>
    </>
  );
}

DatePicker.propTypes = {
  /** Content to display within and below the calendar */
  children: PropTypes.node,
  /** Callback fired when a valid date is entered */
  onChange: PropTypes.func.isRequired,
  /** Callback fired when input value is changed */
  onChangeRaw: PropTypes.func,
  /** Callback fired when datepicker loses focus */
  onBlur: PropTypes.func,
  /** input field placeholder */
  placeholder: PropTypes.string,
  /** Date object representing the selected date */
  selectedDate: PropTypes.instanceOf(Date),
  /** Array of Date objects to exclude from the calendar */
  excludeDates: PropTypes.array,
  /** Array of Date objects to highlight on the calendar */
  highlightDates: PropTypes.array,
  /** Array of Date objects to whitelist on calendar */
  includeDates: PropTypes.array,
  /** Function used to filter calendar dates */
  filterDate: PropTypes.func,
  /** Sets the datepicker as the Start input of a data range */
  selectsStart: PropTypes.bool,
  /** Sets the datepicker as the End input of a date range */
  selectsEnd: PropTypes.bool,
  /** Sets the start date in a range */
  startDate: PropTypes.instanceOf(Date),
  /** Sets the end date in a range */
  endDate: PropTypes.instanceOf(Date),
  /** Display checkbox with contextual state colorings */
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger'])
};

DatePicker.defaultProps = {
  children: undefined,
  name: undefined,
  onBlur: noop,
  onChangeRaw: noop,
  placeholder: 'mm/dd/yyyy',
  selectedDate: undefined,
  excludeDates: undefined,
  highlightDates: undefined,
  includeDates: undefined,
  filterDate: undefined,
  selectsStart: false,
  selectsEnd: false,
  startDate: undefined,
  endDate: undefined,
  validationState: 'default'
};

const UncontrolledDatePicker = uncontrollable(DatePicker, {
  selectedDate: 'onChange'
});

export default UncontrolledDatePicker;
