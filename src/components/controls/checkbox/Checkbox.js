import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';

import Label from '../Label';
import { sizes, colors, inputColors } from '../../theme';

const CheckboxLabel = Label.extend`
  font-size: ${sizes.baseFontSize}px;
  font-weight: normal;
  text-transform: none;

  > .checkbox-fill {
    background-color: ${props => (props.isChecked ? colors.accent : colors.white)};
    border-color: ${props => (props.isChecked ? colors.accent : colors.grayDark)};

    &:after {
      border-color: ${props => (props.isChecked > colors.white: colors.grayDark)};
    }
  }

  &:hover > .checkbox-fill:after {
    border-color: ${props => (props.isChecked ? colors.white : colors.grayLight)};
  }

  &[disabled] > .checkbox-fill {
    background-color: ${props => (props.isChecked ? colors.gray : colors.white)};
    border-color: ${colors.gray};
    cursor: not-allowed;
    outline: 0;

    &:after {
      border-color: ${colors.white};
    }
  }
`;

const CheckboxInput = styled.input`
  clip: rect(0, 0, 0, 0);
  position: absolute;

  &:focus ~ .checkbox-fill {
    outline: 5px auto ${inputColors.inputDefaultFocus};
  }
`;

const CheckboxWrapper = styled.span`
  background: ${colors.white};
  border: 3px solid ${colors.grayDarker};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  height: 25px;
  position: absolute;
  transition: all .25s linear;
  width: 25px;

  &:after {
    background: transparent;
    border: 3px solid ${colors.white};
    border-right: none;
    border-top: none;
    box-sizing: border-box;
    content: '';
    height: 9px;
    top: 3px;
    left: 2px;
    position: absolute;
    transform: rotate(-45deg);
    transition: border .25s linear;
    width: 15px;
  }
`;

const CheckboxText = styled.span`
  line-height: 1.4;
  margin-left: 30px;
`;

export default class Checkbox extends React.Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    initiallyChecked: PropTypes.bool,
    checkedValueChanged: PropTypes.func,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    initiallyChecked: false,
    disabled: false,
    checkedValueChanged: noop
  };

  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  state = {
    isChecked: this.props.initiallyChecked
  };

  componentWillReceiveProps({ initiallyChecked }) {
    this.setState(() => ({ isChecked: initiallyChecked }));
  }

  handleOnClick({ target }) {
    if (!this.props.disabled) {
      this.setState(previousState => ({ isChecked: !previousState.isChecked }));
      this.props.checkedValueChanged(target.checked);
    }
  }

  render() {
    const { labelText, disabled } = this.props;

    return (
      <CheckboxLabel disabled={disabled} isChecked={this.state.isChecked}>
        <CheckboxInput
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.handleOnClick}
          focusBorderColor={inputColors.inputDefaultFocus}
        />
        <CheckboxWrapper className="checkbox-fill" />
        <CheckboxText>{labelText}</CheckboxText>
      </CheckboxLabel>
    );
  }
}
