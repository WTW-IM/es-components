import React from 'react';
import { PropTypes } from 'prop-types';
import { noop, isNumber } from 'lodash';
import styled, { withTheme } from 'styled-components';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';
import { InputBase } from '../../controls/BaseControls';

const IncrementerTextbox = styled(InputBase)`
  margin: 0 10px;
  text-align: center;
  width: 60px;
`;

export class Incrementer extends React.Component {
  static propTypes = {
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
    onValueUpdated: PropTypes.func,
    /**
     * Theme object used by the ThemeProvider,
     * automatically passed by any parent component using a ThemeProvider
     */
    theme: PropTypes.object
  };

  static defaultProps = {
    startingValue: 0,
    incrementAmount: 1,
    decrementAmount: 1,
    onValueUpdated: noop
  };

  constructor(props) {
    super(props);

    const { startingValue } = this.props;

    this.decrementValue = this.decrementValue.bind(this);
    this.incrementValue = this.incrementValue.bind(this);

    this.determineDisabledStates = this.determineDisabledStates.bind(this);

    const disabledStates = this.determineDisabledStates(startingValue);
    this.state = {
      value: startingValue,
      ...disabledStates
    };
  }

  componentWillReceiveProps({ startingValue }) {
    const disabledStates = this.determineDisabledStates(startingValue);
    this.setState(() => ({
      value: startingValue,
      ...disabledStates
    }));
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.onValueUpdated(nextState.value);
  }

  determineDisabledStates(value) {
    const { lowerThreshold, upperThreshold } = this.props;

    return {
      incrementButtonDisabled:
        isNumber(upperThreshold) && value === upperThreshold,
      decrementButtonDisabled:
        isNumber(lowerThreshold) && value === lowerThreshold
    };
  }

  decrementValue() {
    this.setState(previous => {
      const { decrementAmount } = this.props;
      const newValue = previous.value - decrementAmount;
      const disabledStates = this.determineDisabledStates(newValue);
      return {
        value: newValue,
        ...disabledStates
      };
    });
  }

  incrementValue() {
    this.setState(previous => {
      const { incrementAmount } = this.props;
      const newValue = previous.value + incrementAmount;
      const disabledStates = this.determineDisabledStates(newValue);
      return {
        value: newValue,
        ...disabledStates
      };
    });
  }

  render() {
    const {
      value,
      decrementButtonDisabled,
      incrementButtonDisabled
    } = this.state;
    const { theme } = this.props;

    return (
      <div>
        <Button
          className="decrement-button"
          styleType="primary"
          handleOnClick={this.decrementValue}
          disabled={decrementButtonDisabled}
        >
          <Icon name="minus" />
        </Button>
        <IncrementerTextbox
          {...theme.validationInputColor.default}
          type="text"
          value={value}
          readOnly
        />
        <Button
          className="increment-button"
          styleType="primary"
          handleOnClick={this.incrementValue}
          disabled={incrementButtonDisabled}
        >
          <Icon name="add" />
        </Button>
      </div>
    );
  }
}

export default withTheme(Incrementer);
