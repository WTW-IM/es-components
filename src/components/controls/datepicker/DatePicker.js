import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Icon from '../../base/icons/Icon';
import Textbox from '../textbox/Textbox';
import PopoverLink from '../../containers/popover/PopoverLink';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import './datepicker.less';
import styled from 'styled-components';
import uncontrollable from 'uncontrollable';

const Container = styled.div`display: flex;`;

const Help = styled.div`
  margin-left: 0.5em;
  position: relative;
  top: 12px;
`;

const List = styled.ul`
  margin: 10px 0;
  padding: 0 20px;
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
  const prependedIcon = <Icon name="calendar" />;
  const textbox = (
    <DateTextbox
      labelText={labelText}
      maskType="date"
      prependContent={prependedIcon}
    />
  );
  const helpText = (
    <small>
      <List>
        <li>
          <strong>Left</strong>: Move to the previous day
        </li>
        <li>
          <strong>Right</strong>: Move to the next day
        </li>
        <li>
          <strong>Up</strong>: Move to the previous week
        </li>
        <li>
          <strong>Down</strong>: Move to the next week
        </li>
        <li>
          <strong>PgUp</strong>: Move to the previous month
        </li>
        <li>
          <strong>PgDn</strong>: Move to the next month
        </li>
        <li>
          <strong>Home</strong>: Move to the previous year
        </li>
        <li>
          <strong>End</strong>: Move to the next year
        </li>
        <li>
          <strong>Enter/Esc/Tab</strong>: Close the calendar
        </li>
      </List>
    </small>
  );

  const handleChange = date => {
    onChange(date);
  };

  return (
    <Container>
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleChange}
        customInput={textbox}
      />

      <Help>
        <PopoverLink
          popoverTitle="Datepicker Keyboard Shortcuts"
          popoverContent={helpText}
          suppressUnderline
        >
          <Icon name="question-sign" />
        </PopoverLink>
      </Help>
    </Container>
  );
};

DatePicker.propTypes = {
  /** Label to display above datepicker */
  labelText: PropTypes.string,
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
