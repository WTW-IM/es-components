import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';
import OutlineButton from '../../controls/buttons/OutlineButton';
import {
  BasicTextbox,
  BasicTextboxProps,
  basicTextboxPropTypes,
  basicTextboxDefaultProps
} from '../../controls/textbox/InputBase';
import screenReaderOnly from '../screenReaderOnly/screenReaderOnly';
import noop from '../../util/noop';

const IncrementerWrapper = styled.div`
  align-items: flex-start;
  display: flex;
`;

const IncrementerTextbox = styled(BasicTextbox)`
  margin: 0 10px;
  min-width: 60px;
  padding-right: 12px;
  text-align: center;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    width: 60px;
    flex: 0;
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

const isNumber = (val: string | number) => {
  if (val === '') return false;
  return !isNaN(Number(val.toString()));
};

function determineIsDisabled(threshold: unknown, newValue: number) {
  return Number.isFinite(threshold) && newValue === threshold;
}

function sanitizeValue(
  val: number,
  lower: number | null,
  upper: number | null
) {
  const enteredValue = parseInt(val.toString());

  if (Number.isFinite(enteredValue)) {
    if (upper !== null && enteredValue > upper) {
      return upper;
    }
    if (lower !== null && enteredValue < lower) {
      return lower;
    }
    return enteredValue;
  }

  return lower !== null && lower > 0 ? lower : 0;
}

const ScreenReaderButtonText = screenReaderOnly('span');

const getCount = (count: Maybe<string | number>) =>
  parseInt((count || 0).toString());

export type IncrementerProps = BasicTextboxProps & {
  startingValue?: Maybe<number | string>;
  incrementAmount?: number;
  decrementAmount?: number;
  upperThreshold?: number | null;
  lowerThreshold?: number | null;
  useOutlineButton?: boolean;
  onValueUpdated?: (value: number) => void;
};

const Incrementer = React.forwardRef<HTMLDivElement, IncrementerProps>(
  function ForwardedIncrementer(
    {
      startingValue,
      incrementAmount = 1,
      decrementAmount = 1,
      upperThreshold = null,
      lowerThreshold = null,
      useOutlineButton,
      onValueUpdated = noop,
      ...other
    },
    ref
  ) {
    const initialRender = useRef(true);

    const [count, setCount] = useState(getCount(startingValue));
    const [boxValue, setBoxValue] = useState(count.toString());

    const [isIncrementDisabled, setIsIncrementDisabled] = useState(
      determineIsDisabled(upperThreshold, count)
    );
    const [isDecrementDisabled, setIsDecrementDisabled] = useState(
      determineIsDisabled(lowerThreshold, count)
    );

    useEffect(
      function updateDisabledState() {
        setIsIncrementDisabled(determineIsDisabled(upperThreshold, count));
        setIsDecrementDisabled(determineIsDisabled(lowerThreshold, count));
      },
      [count, upperThreshold, lowerThreshold]
    );

    useEffect(
      function emitValueUpdated() {
        if (initialRender.current) {
          return;
        }

        onValueUpdated(count);
      },
      [count, onValueUpdated]
    );

    useEffect(
      function updateBoxValue() {
        setBoxValue(count.toString());
      },
      [count]
    );

    const setValue = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
      ({ target: { value } }) => {
        setBoxValue(value);
        if (isNumber(value)) {
          setCount(getCount(value));
        }
      },
      []
    );

    const decrementValue = useCallback(
      () =>
        setCount(
          sanitizeValue(
            getCount(count) - getCount(decrementAmount),
            lowerThreshold,
            upperThreshold
          )
        ),
      [count, decrementAmount, lowerThreshold, upperThreshold]
    );

    const incrementValue = useCallback(
      () =>
        setCount(
          sanitizeValue(
            getCount(count) + getCount(incrementAmount),
            lowerThreshold,
            upperThreshold
          )
        ),
      [count, incrementAmount, lowerThreshold, upperThreshold]
    );

    useEffect(function setInitialized() {
      initialRender.current = false;
    }, []);

    const handleOnBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
      event => {
        const sanitizedValue = sanitizeValue(
          getCount(event.target.value),
          lowerThreshold,
          upperThreshold
        );
        setCount(sanitizedValue);
      },
      [lowerThreshold, upperThreshold]
    );

    const shortcutKeys = useCallback<
      React.KeyboardEventHandler<HTMLInputElement>
    >(
      event => {
        if (upperThreshold && event.key === 'End') {
          event.preventDefault();
          setCount(upperThreshold);
        }

        if (lowerThreshold && event.key === 'Home') {
          event.preventDefault();
          setCount(lowerThreshold);
        }
      },
      [lowerThreshold, upperThreshold]
    );

    const RenderedButton = useOutlineButton ? OutlineButton : Button;

    return (
      <IncrementerWrapper ref={ref}>
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
          {...other}
          type="number"
          role="spinbutton"
          max={upperThreshold ?? undefined}
          min={lowerThreshold ?? undefined}
          step={incrementAmount}
          value={boxValue}
          aria-valuemin={lowerThreshold ?? undefined}
          aria-valuemax={upperThreshold ?? undefined}
          aria-valuenow={count}
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
);

Incrementer.propTypes = {
  ...basicTextboxPropTypes,
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
  ...basicTextboxDefaultProps,
  startingValue: 0,
  incrementAmount: 1,
  decrementAmount: 1,
  onValueUpdated: noop,
  upperThreshold: null,
  lowerThreshold: null,
  useOutlineButton: false
};

export default Incrementer;
