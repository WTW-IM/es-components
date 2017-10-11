import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Textbox from '../../controls/textbox/Textbox';
import ReactDatePicker from 'react-datepicker';
import uncontrollable from 'uncontrollable';
import './datepicker.less';

class DateTextbox extends React.PureComponent {
  static propTypes = Textbox.propTypes;

  componentDidMount() {
    this.inputElement = findDOMNode(this).querySelector('input');
  }

  focus() {
    this.inputElement.focus();
  }

  render() {
    return <Textbox {...this.props} />;
  }
}

export const DatePicker = props => {
  const {
    labelText,
    onChange,
    onChangeRaw,
    placeholder,
    selectedDate,
    ...otherInputProps
  } = props;
  const textbox = (
    <DateTextbox
      labelText={labelText}
      maskType="date"
      appendIconName="calendar"
    />
  );

  const handleChange = date => {
    onChange(date);
  };

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={handleChange}
      onChangeRaw={onChangeRaw}
      customInput={textbox}
      placeholderText={placeholder}
      {...otherInputProps}
    />
  );
};

DatePicker.propTypes = {
  /** Label to display above datepicker */
  labelText: PropTypes.string.isRequired,
  /** Name property for the form control */
  name: PropTypes.string,
  /** Callback fired when a valid date is entered */
  onChange: PropTypes.func,
  /** Callback fired when input value is changed */
  onChangeRaw: PropTypes.func,
  /** input field placeholder */
  placeholder: PropTypes.string,
  /** Moment object representing the selected date */
  selectedDate: PropTypes.object
};

DatePicker.defaultProps = {
  onChange: noop,
  onChangeRaw: noop,
  placeholder: 'mm/dd/yyyy'
};

const UncontrolledDatePicker = uncontrollable(DatePicker, {
  selectedDate: 'onChange'
});

export default UncontrolledDatePicker;
