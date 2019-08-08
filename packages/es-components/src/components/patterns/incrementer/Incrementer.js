import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { noop, isFinite, parseInt } from 'lodash';
import styled from 'styled-components';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';
import OutlineButton from '../../controls/buttons/OutlineButton';
import InputBase from '../../controls/textbox/InputBase';
import screenReaderOnly from '../screenReaderOnly/screenReaderOnly';
import { useTheme } from '../../util/useTheme';

const IncrementerWrapper = styled.div`
  align-items: flex-start;
  display: flex;
`;

const IncrementerTextbox = styled(InputBase)`
  margin: 0 10px;
  min-width: 60px;
  padding-right: 12px;
  text-align: center;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    width: 60px;
  }

  /* Hides browser-specific number controls */
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-ms-clear {
    display: none;
  }
`;

const IncrementerButton = styled(Button)`
  min-width: 0;

  .es-button__display {
    min-width: 0;
  }
`;

function determineIsDisabled(threshold, newValue) {
  return isFinite(threshold) && newValue === threshold;
}

function sanitizeValue(val, lower, upper) {
  const enteredValue = parseInt(val);

  if (isFinite(enteredValue)) {
    if (upper && enteredValue > upper) {
      return upper;
    }
    if (lower && enteredValue < lower) {
      return lower;
    }
    return enteredValue;
  }

  return lower > 0 ? lower : 0;
}

function updateCountReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: sanitizeValue(
          parseInt(state.count) + parseInt(action.amount),
          action.lower,
          action.upper
        )
      };
    case 'decrement':
      return {
        count: sanitizeValue(
          parseInt(state.count) - parseInt(action.amount),
          action.lower,
          action.upper
        )
      };
    case 'set':
      return {
        count: action.amount
      };
    default:
  }
  return null;
}

const ScreenReaderButtonText = screenReaderOnly('span');

function Incrementer({
  startingValue,
  incrementAmount,
  decrementAmount,
  upperThreshold,
  lowerThreshold,
  useOutlineButton,
  onValueUpdated,
  ...other
}) {
  const theme = useTheme();
  const initialRender = useRef(true);

  const [state, dispatch] = React.useReducer(updateCountReducer, {
    count: startingValue === null ? '' : startingValue
  });
  const isIncrementDisabled = determineIsDisabled(upperThreshold, state.count);
  const isDecrementDisabled = determineIsDisabled(lowerThreshold, state.count);

  React.useEffect(() => {
    if (!initialRender.current) {
      onValueUpdated(state.count);
    }
    initialRender.current = false;
  });

  function setValue(event) {
    dispatch({ type: 'set', amount: event.target.value });
  }

  function decrementValue(event) {
    dispatch({
      type: 'decrement',
      amount: decrementAmount,
      lower: lowerThreshold,
      upper: upperThreshold
    });
  }

  function incrementValue() {
    dispatch({
      type: 'increment',
      amount: incrementAmount,
      lower: lowerThreshold,
      upper: upperThreshold
    });
  }

  function handleOnBlur(event) {
    const sanitizedValue = sanitizeValue(
      event.target.value,
      lowerThreshold,
      upperThreshold
    );
    if (event.target.value !== sanitizedValue) {
      dispatch({ type: 'set', amount: sanitizedValue });
    }
  }

  function shortcutKeys(event) {
    if (upperThreshold && event.keyCode === 35) {
      dispatch({ type: 'set', amount: upperThreshold });
    }

    if (lowerThreshold && event.keyCode === 36) {
      dispatch({ type: 'set', amount: lowerThreshold });
    }
  }

  const RenderedButton = useOutlineButton ? OutlineButton : Button;

  return (
    <IncrementerWrapper>
      <IncrementerButton
        as={RenderedButton}
        styleType="primary"
        onClick={decrementValue}
        disabled={isDecrementDisabled}
      >
        <ScreenReaderButtonText>
          Decrement value by
          {decrementAmount}
        </ScreenReaderButtonText>
        <Icon name="minus" size={22} />
      </IncrementerButton>
      <IncrementerTextbox
        {...theme.validationInputColor.default}
        {...other}
        type="number"
        role="spinbutton"
        max={upperThreshold}
        min={lowerThreshold}
        step={incrementAmount}
        value={state.count}
        aria-valuemin={lowerThreshold}
        aria-valuemax={upperThreshold}
        aria-valuenow={state.count}
        onKeyDown={shortcutKeys}
        onChange={setValue}
        onBlur={handleOnBlur}
      />
      <IncrementerButton
        as={RenderedButton}
        styleType="primary"
        onClick={incrementValue}
        disabled={isIncrementDisabled}
      >
        <ScreenReaderButtonText>
          Increment value by
          {incrementAmount}
        </ScreenReaderButtonText>
        <Icon name="add" size={22} />
      </IncrementerButton>
    </IncrementerWrapper>
  );
}

Incrementer.propTypes = {
  /** The starting value, 'null' is allowed for a blank value */
  startingValue: PropTypes.number,
  /** The amount to increment the value by */
  incrementAmount: PropTypes.number,
  /** The amount to decrement the value by */
  decrementAmount: PropTypes.number,
  /** The highest value the incrementer can be incremented to */
  upperThreshold: PropTypes.number,
  /** The lowest value the incrementer can be decremented to */
  lowerThreshold: PropTypes.number,
  /** Use outline button styles */
  useOutlineButton: PropTypes.bool,
  /** Function to execute with the new value */
  onValueUpdated: PropTypes.func
};

Incrementer.defaultProps = {
  startingValue: 0,
  incrementAmount: 1,
  decrementAmount: 1,
  onValueUpdated: noop,
  upperThreshold: null,
  lowerThreshold: null,
  useOutlineButton: false
};

export default Incrementer;
