import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Icon from '../../base/icons/Icon';
import Textbox from '../textbox/Textbox';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import './datepicker.less';
import uncontrollable from 'uncontrollable';

class DateTextbox extends React.PureComponent {
  focus() {
    this.inputElement.focus();
  }

  componentDidMount() {
    this.inputElement = findDOMNode(this).querySelector('input');
  }

  render() {
    return <Textbox {...this.props} />;
  }
}
DateTextbox.proptypes = Textbox.proptypes;

export const DatePicker = props => {
  const { labelText, onChange, selectedDate } = props;
  const prependedIcon = <Icon name="calendar" />;
  const textbox = (
    <DateTextbox
      labelText={labelText}
      maskType="date"
      prependContent={prependedIcon}
    />
  );

  const handleChange = date => {
    onChange(date);
  };

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={handleChange}
      customInput={textbox}
    />
  );
};

DatePicker.propTypes = {
  /** Label to display above datepicker */
  labelText: PropTypes.string.isRequired,
  /** Name property for the form control */
  name: PropTypes.string,
  /** Event handler for onChange event */
  onChange: PropTypes.func,
  /** Moment object representing the selected date */
  selectedDate: PropTypes.object
};

DatePicker.defaultProps = {
  onChange: noop,
  selectedDate: moment()
};

const UncontrolledDatePicker = uncontrollable(DatePicker, {
  selectedDate: 'onChange'
});

export default UncontrolledDatePicker;
