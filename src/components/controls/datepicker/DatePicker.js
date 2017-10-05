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
import styled from 'styled-components';

const DateContainer = styled.div`display: flex;`;

const CalendarIcon = styled(Icon)`
  left: -28px;
  pointer-events: none;
  position: relative;
  top: 29px;
`;

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
  const textbox = <DateTextbox labelText={labelText} maskType="date" />;

  const handleChange = date => {
    onChange(date);
  };

  return (
    <DateContainer>
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleChange}
        customInput={textbox}
      />
      <CalendarIcon name="calendar" />
    </DateContainer>
  );
};

DatePicker.propTypes = {
  /** Label to display above datepicker */
  labelText: PropTypes.string.isRequired,
  /** Name property for the form control */
  name: PropTypes.string,
  /** Callback fired when value is changed */
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
