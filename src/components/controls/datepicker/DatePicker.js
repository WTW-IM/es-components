import React from 'react';
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

export const DatePicker = props => {
  const { onChange, selectedDate } = props;
  const prependedIcon = <Icon name="calendar" />;
  const textbox = <Textbox prependContent={prependedIcon} labelText="" />;
  const helpText = (
    <small>
      <ul>
        <li>Left: Move to the previous day</li>
        <li>Right: Move to the next day</li>
        <li>Up: Move to the previous week</li>
        <li>Down: Move to the next week</li>
        <li>PgUp: Move to the previous month</li>
        <li>PgDn: Move to the next month</li>
        <li>Home: Move to the previous year</li>
        <li>End: Move to the next year</li>
        <li>Enter/Esc/Tab: Close the calendar</li>
      </ul>
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
  onChange: PropTypes.func,
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
