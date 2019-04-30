import React from 'react';
import PropTypes from 'prop-types';
import { noop, pick, omit } from 'lodash';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';
import { parse, format, isValid } from 'date-fns';
import { useTheme } from '../../util/useTheme';
import { useWindowWidth } from '../../util/useWindowWidth';
import ReactDatePickerPropTypes from './ReactDatePickerPropTypes';

import { DatepickerStyles } from './datePickerStyles';
import Textbox from '../../controls/textbox/Textbox';
import MaskedTextbox from '../../controls/textbox/MaskedTextbox';

const BlockContainer = styled.div`
  display: inline-block;
`;

// without this extra time string, js Date can get weird
const getParsedDate = selectedDate => parse(`${selectedDate}T01:00:00`);

const getVerifiedDate = selectedDate => {
  let verifiedDate = selectedDate;
  if (typeof selectedDate === 'string') {
    const newDate = getParsedDate(selectedDate);
    const isFullDate =
      (selectedDate && format(newDate, 'MM/DD/YYYY') === selectedDate) ||
      format(newDate, 'YYYY-MM-DD') === selectedDate;
    verifiedDate = isFullDate ? newDate : undefined;
  }
  return verifiedDate;
};

// required for react-datepicker 2.0.0 to properly set focus
class DateTextbox extends React.Component {
  setRef = ref => {
    this.inputElement = ref;
  };

  focus() {
    this.inputElement.focus();
  }

  render() {
    return <MaskedTextbox inputRef={this.setRef} {...this.props} />;
  }
}

function NativeDatePicker({ selectedDate, name, onChange, ...props }) {
  const onChangeIntercept = event => {
    onChange(getParsedDate(event.target.value));
  };
  const dateValue =
    !!selectedDate && isValid(selectedDate)
      ? format(selectedDate, 'YYYY-MM-DD')
      : '';

  return (
    <Textbox
      name={name}
      prependIconName="calendar"
      type="date"
      value={dateValue}
      {...props}
      onChange={onChangeIntercept}
    />
  );
}

const DatePicker = React.memo(function DatePicker(props) {
  /* eslint-disable no-unused-vars */
  const {
    children,
    name,
    onChange,
    onBlur,
    placeholder,
    selectedDate,
    allowNativeDatepickerOnMobile,
    ...otherProps
  } = props;

  const theme = useTheme();
  const windowWidth = useWindowWidth();

  /* eslint-disable react/forbid-foreign-prop-types */
  const datepickerProps = pick(
    otherProps,
    Object.keys(ReactDatePickerPropTypes)
  );
  const textboxProps = omit(otherProps, Object.keys(ReactDatePickerPropTypes));
  /* eslint-enable */
  const verifiedDate = getVerifiedDate(selectedDate);

  const textbox = (
    <DateTextbox
      maskType="date"
      name={name}
      prependIconName="calendar"
      {...textboxProps}
    />
  );

  const mobileDatePicker = (
    <NativeDatePicker
      selectedDate={verifiedDate}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      id={otherProps.id}
      {...textboxProps}
    />
  );

  const nonMobileDatePicker = (
    <ReactDatePicker
      customInput={textbox}
      onChange={onChange}
      onBlur={onBlur}
      placeholderText={placeholder}
      selected={verifiedDate}
      id={otherProps.id}
      {...datepickerProps}
    >
      {children}
    </ReactDatePicker>
  );

  const phoneWidth = parseInt(theme.screenSize.phone, 10) || 0;
  const datePicker =
    allowNativeDatepickerOnMobile && windowWidth <= phoneWidth
      ? mobileDatePicker
      : nonMobileDatePicker;

  return (
    <>
      <DatepickerStyles />
      <BlockContainer>{datePicker}</BlockContainer>
    </>
  );
});

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
  /** Date object or string representing the selected date */
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  /** Array of moment objects to exclude from the calendar */
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
  /**
   * Determines whether to use the native datepicker instead of the React datepicker on mobile devices.
   * For complicated scenarios like date ranges and such, it is recommended to disable this.
   * Defaults to true.
   */
  allowNativeDatepickerOnMobile: PropTypes.bool
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
  allowNativeDatepickerOnMobile: true
};

export default DatePicker;
