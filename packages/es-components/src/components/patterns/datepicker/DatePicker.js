import React from 'react';
import PropTypes from 'prop-types';
import { noop, pick, omit } from 'lodash';
import ReactDatePicker from 'react-datepicker';
import uncontrollable from 'uncontrollable';
import moment from 'moment';
import styled, { injectGlobal, withTheme } from 'styled-components';

import datepickerStyles from './datePickerStyles';
import withWindowSize from '../../util/withWindowSize';
import Textbox from '../../controls/textbox/Textbox';

const DatePickerWrapper = styled.div`
  display: inline-block;
`;

class DateTextbox extends React.Component {
  static propTypes = Textbox.propTypes; // eslint-disable-line react/forbid-foreign-prop-types

  setRef = ref => {
    this.inputElement = ref;
  };

  focus() {
    this.inputElement.focus();
  }

  render() {
    return <Textbox inputRef={this.setRef} {...this.props} />;
  }
}

const NativeDatePicker = props => {
  const onChangeIntercept = event => props.onChange(moment(event.target.value));
  const dateValue =
    !!props.selectedDate && props.selectedDate.isValid()
      ? props.selectedDate.format('YYYY-MM-DD')
      : '';

  return (
    <DateTextbox
      name={props.name}
      prependIconName="calendar"
      type="date"
      value={dateValue}
      {...props}
      onChange={onChangeIntercept}
    />
  );
};

export const DatePicker = props => {
  /* eslint-disable no-unused-vars */
  const {
    children,
    name,
    onChange,
    onBlur,
    placeholder,
    selectedDate,
    theme,
    allowNativeDatepickerOnMobile,
    defaultWidth,
    defaultHeight,
    windowHeight,
    windowWidth,
    ...otherProps
  } = props;

  /* eslint-disable react/forbid-foreign-prop-types */
  const datepickerProps = pick(
    otherProps,
    Object.keys(ReactDatePicker.propTypes)
  );
  const textboxProps = omit(otherProps, Object.keys(ReactDatePicker.propTypes));

  /* eslint-enable */

  const dpStyles = datepickerStyles(theme.colors, theme.datepickerColors);
  /* eslint-disable no-unused-expressions */
  injectGlobal`
    ${dpStyles}
  `;
  /* eslint-enable */

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
      selectedDate={selectedDate}
      onChange={onChange}
      name={name}
      {...textboxProps}
    />
  );

  const nonMobileDatePicker = (
    <ReactDatePicker
      customInput={textbox}
      onChange={onChange}
      onBlur={onBlur}
      placeholderText={placeholder}
      selected={selectedDate}
      {...datepickerProps}
    >
      {children}
    </ReactDatePicker>
  );

  const phoneWidth = parseInt(props.theme.screenSize.phone, 10) || 0;
  const datePicker =
    allowNativeDatepickerOnMobile && windowWidth <= phoneWidth
      ? mobileDatePicker
      : nonMobileDatePicker;

  return <DatePickerWrapper>{datePicker}</DatePickerWrapper>;
};

DatePicker.propTypes = {
  /** Additional text displayed below the input */
  additionalHelpContent: PropTypes.node,
  /** Content to display within and below the calendar */
  children: PropTypes.node,
  /** Label to display above datepicker */
  labelText: PropTypes.string.isRequired,
  /** Name property for the form control */
  name: PropTypes.string,
  /** Callback fired when a valid date is entered */
  onChange: PropTypes.func.isRequired,
  /** Callback fired when input value is changed */
  onChangeRaw: PropTypes.func,
  /** Callback fired when datepicker loses focus */
  onBlur: PropTypes.func,
  /** input field placeholder */
  placeholder: PropTypes.string,
  /** Moment object representing the selected date */
  selectedDate: PropTypes.object,
  /** Array of moment objects to exclude from the calendar */
  excludeDates: PropTypes.array,
  /** Array of moment objects to highlight on the calendar */
  highlightDates: PropTypes.array,
  /** Array of moment objects to whitelist on calendar */
  includeDates: PropTypes.array,
  /** Function used to filter calendar dates */
  filterDate: PropTypes.func,
  /** Sets the datepicker as the Start input of a data range */
  selectsStart: PropTypes.bool,
  /** Sets the datepicker as the End input of a date range */
  selectsEnd: PropTypes.bool,
  /** Sets the start date (moment) in a range */
  startDate: PropTypes.object,
  /** Sets the end date (moment) in a range */
  endDate: PropTypes.object,
  /** The width of the window. Passed in from the withWindowSize higher order component */
  windowWidth: PropTypes.number,
  /**
   * Determines whether to use the native datepicker instead of the React datepicker on mobile devices.
   * For complicated scenarios like date ranges and such, it is recommended to disable this.
   * Defaults to true.
   */
  allowNativeDatepickerOnMobile: PropTypes.bool,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired
};

DatePicker.defaultProps = {
  additionalHelpContent: undefined,
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
  windowWidth: undefined,
  allowNativeDatepickerOnMobile: true,
  validationState: 'default'
};

const UncontrolledDatePicker = uncontrollable(DatePicker, {
  selectedDate: 'onChange'
});

export default withTheme(withWindowSize(UncontrolledDatePicker));
