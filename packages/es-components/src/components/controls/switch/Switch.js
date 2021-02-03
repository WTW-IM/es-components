import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';

const Directions = {
  top: 'column-reverse',
  bottom: 'column',
  right: 'row',
  left: 'row-reverse'
};

const Padding = {
  top: '0 0 0.5rem',
  bottom: '2.25rem 0 0',
  right: '0 0 0.5rem',
  left: '0 1rem 0 0'
};

const primary = '#0073b6';
const primaryLight = '#ededed';
const success = '#298544';
const successLight = '#69aa7c';
const warning = '#c25400';
const warningLight = '#d4874d';
const danger = '#cc0000';
const dangerLight = '#db4d4d';

function Type(type, light) {
  switch (type) {
    case 'primary':
      return light ? primaryLight : primary;
    case 'success':
      return light ? successLight : success;
    case 'warning':
      return light ? warningLight : warning;
    case 'danger':
      return light ? dangerLight : danger;
    default:
      return light ? primaryLight : primary;
  }
}

const SwitchBase = styled.div`
  margin: 0 auto 10px;
  display: flex;
`;

const SwitchLabel = styled.label`
  flex-direction: ${props => Directions[props.direction]};
  text-align: ${props =>
    props.direction === 'top' || props.direction === 'bottom'
      ? 'center'
      : 'left'};
  justify-content: ${props =>
    props.direction === 'left' ? 'flex-end' : 'normal'};
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  position: relative:
  padding: 5px 0;
  transition: all .25s linear;

  &:hover {
    span {
      &::before {
        box-shadow: ${props =>
          props.isDisabled ? '0' : 'inset 0 3px 3px rgba(0,0,0,0.4)'};
      }
    }

    input[type="checkbox"]:checked ~ span::before {
      box-shadow: ${props =>
        props.isDisabled ? '0' : 'inset 0 3px 3px rgba(0,0,0,0.7)'};
    }
  }
`;

const SwitchInput = styled.input`
  overflow: visible;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
  box-sizing: border-box;
  padding: 0;

  &:focus ~ span::after {
    box-shadow: 0 0 3px 3px #83bffc;
  }

  &:checked ~ span {
    &::before {
      background: ${props => Type(props.styleType, false)};
    }

    &::after {
      background: #f4f4f4;
      left: 28px;
    }
  }
`;

const SwitchLabelText = styled.span`
  padding: ${props => Padding[props.direction]};
  flex-grow: 1;
  color: ${props =>
    props.type === 'primary' ? '#000' : Type(props.type, false)};
`;

const SwitchCheck = styled.span`
  order: -2;
  position: relative;
  width: 64px;

  &::before {
    background: ${props => Type(props.type, true)};
    border-radius: 11px;
    content: '';
    display: block;
    height: 25px;
    left: 3px;
    outline: none;
    position: absolute;
    top: 0.2rem;
    width: 54px;
    z-index: 5;
    transition: background-color 0.25s linear, border 0.25s linear,
      box-shadow 0.25s linear;
  }

  &::after {
    background: #f4f4f4;
    box-shadow: 0 2px 6px #444;
    display: block;
    position: absolute;
    content: '';
    border-radius: 100%;
    height: 30px;
    width: 30px;
    top: 0;
    left: 0;
    transform: all 0.18s linear;
    z-index: 7;
  }
`;

const SwitchOffText = styled.span`
  order: ${props =>
    props.direction === 'left' || props.direction === 'top' ? '-1' : '-3'};
  padding: ${props => (props.textOff === '' ? '0' : '0 1rem 0 1rem')};
  vertical-align: middle;
`;

const SwitchOnText = styled.span`
  order: ${props =>
    props.direction === 'left' || props.direction === 'top' ? '-3' : '-1'};
  padding: ${props => (props.textOn === '' ? '0' : '0 1rem 0 0.75rem')};
  vertical-align: middle;
`;

function Switch({
  type,
  label,
  direction,
  ariaLabel,
  onText,
  offText,
  checked,
  onChange,
  disabled,
  ...switchProps
}) {
  const [isToggled, setIsToggled] = useState(checked);

  function handleToggle(event) {
    setIsToggled(!isToggled);
    onChange(event);
  }

  return (
    <SwitchBase type={type} {...switchProps}>
      <SwitchLabel
        isDisabled={disabled}
        direction={direction}
        onChange={handleToggle}
      >
        <SwitchInput
          disabled={disabled}
          styleType={type}
          type="checkbox"
          defaultChecked={isToggled}
          aria-label={ariaLabel}
        />
        <SwitchLabelText direction={direction} type={type}>
          {label}
        </SwitchLabelText>
        <SwitchOffText direction={direction} textOff={offText}>
          {offText}
        </SwitchOffText>
        <SwitchCheck type={type} />
        <SwitchOnText direction={direction} textOn={onText}>
          {onText}
        </SwitchOnText>
      </SwitchLabel>
    </SwitchBase>
  );
}

Switch.propTypes = {
  /** The type attribute for the switch */
  type: PropTypes.oneOf(['primary', 'success', 'warning', 'danger']),
  /** The label text for the switch */
  label: PropTypes.string,
  /** The location of the label */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Accessibility label for the checkbox */
  ariaLabel: PropTypes.string,
  /** This text goes on the right of the switch, denoting the 'on' position */
  onText: PropTypes.string,
  /** This text goes on the left of the switch, denoting the 'off' position */
  offText: PropTypes.string,
  /** Initial state of the toggle switch */
  checked: PropTypes.bool,
  /** Function for what happens when the switch is toggled */
  onChange: PropTypes.func,
  /** Determines whether the switch is disabled */
  disabled: PropTypes.bool
};

Switch.defaultProps = {
  type: 'primary',
  label: '',
  direction: 'right',
  ariaLabel: '',
  onText: '',
  offText: '',
  checked: false,
  onChange: noop,
  disabled: false
};

export default Switch;
