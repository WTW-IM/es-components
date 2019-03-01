import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { noop, isNumber } from 'lodash';
import styled from 'styled-components';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';
import InputBase from '../../controls/textbox/InputText';
import screenReaderOnly from '../screenReaderOnly/screenReaderOnly';
import { useTheme } from '../../util/useTheme';

const IncrementerWrapper = styled.div`
  display: flex;
`;

const IncrementerTextbox = styled(InputBase)`
  margin: 0 10px;
  text-align: center;
  width: 60px;
`;

const ScreenReaderButtonText = screenReaderOnly('span');

function Incrementer(props) {
  const theme = useTheme();
  const [value, setValue] = useState(props.startingValue);

  function determineIsDisabled(threshold, newValue) {
    return isNumber(threshold) && newValue === threshold;
  }

  const [isIncrementDisabled, setIsIncrementDisabled] = useState(
    determineIsDisabled(props.upperThreshold, value)
  );
  const [isDecrementDisabled, setIsDecrementDisabled] = useState(
    determineIsDisabled(props.lowerThreshold, value)
  );

  function decrementValue() {
    const newValue = value - props.decrementAmount;
    setValue(newValue);
    props.onValueUpdated(newValue);
    setIsDecrementDisabled(determineIsDisabled(props.lowerThreshold, newValue));
    setIsIncrementDisabled(determineIsDisabled(props.upperThreshold, newValue));
  }

  function incrementValue() {
    const newValue = value + props.incrementAmount;
    setValue(newValue);
    props.onValueUpdated(newValue);
    setIsDecrementDisabled(determineIsDisabled(props.lowerThreshold, newValue));
    setIsIncrementDisabled(determineIsDisabled(props.upperThreshold, newValue));
  }

  return (
    <IncrementerWrapper>
      <Button
        styleType="primary"
        onClick={decrementValue}
        disabled={isDecrementDisabled}
      >
        <ScreenReaderButtonText>
          Decrement value by
          {props.decrementAmount}
        </ScreenReaderButtonText>
        <Icon name="minus" />
      </Button>
      <IncrementerTextbox
        {...theme.validationInputColor.default}
        type="text"
        value={value}
        readOnly
      />
      <Button
        styleType="primary"
        onClick={incrementValue}
        disabled={isIncrementDisabled}
      >
        <ScreenReaderButtonText>
          Increment value by
          {props.incrementAmount}
        </ScreenReaderButtonText>
        <Icon name="add" />
      </Button>
    </IncrementerWrapper>
  );
}

Incrementer.propTypes = {
  /** The value to start the incrementer at */
  startingValue: PropTypes.number,
  /** The amount to increment the value by */
  incrementAmount: PropTypes.number,
  /** The amount to decrement the value by */
  decrementAmount: PropTypes.number,
  /** The highest value the incrementer can be incremented to */
  upperThreshold: PropTypes.number,
  /** The lowest value the incrementer can be decremented to */
  lowerThreshold: PropTypes.number,
  /** Function to execute with the new value */
  onValueUpdated: PropTypes.func
};

Incrementer.defaultProps = {
  startingValue: 0,
  incrementAmount: 1,
  decrementAmount: 1,
  onValueUpdated: noop,
  upperThreshold: null,
  lowerThreshold: null
};

export default Incrementer;
