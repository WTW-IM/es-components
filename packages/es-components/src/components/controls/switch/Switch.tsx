import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as CSS from 'csstype';
import PropTypes from 'prop-types';
import styled, { DefaultTheme } from 'styled-components';
import {
  ButtonVariantStyleType,
  buttonVariantStyleTypes,
  ValidationStyleType,
  validationStyleTypes
} from 'es-components-shared-types';
import noop from '../../util/noop';

type SwitchStyleType = ButtonVariantStyleType | ValidationStyleType;

const Directions = {
  top: 'column-reverse',
  bottom: 'column',
  right: 'row',
  left: 'row-reverse'
} as const;

type Direction = keyof typeof Directions;
const directions = Object.keys(Directions) as readonly Direction[];

const Padding = {
  top: '0 0 0.5rem',
  bottom: '2.25rem 0 0',
  right: '0 0 0.5rem',
  left: '0 1rem 0 0'
} as const;

type LightColors = {
  [key in `${SwitchStyleType}Light`]: CSS.Property.Color;
};

type ButtonVariantColors = {
  [key in ButtonVariantStyleType]: CSS.Property.Color;
};

function isValidationType(type: SwitchStyleType): type is ValidationStyleType {
  return (validationStyleTypes as readonly string[]).includes(type);
}

function isButtonType(type: SwitchStyleType): type is ButtonVariantStyleType {
  return (buttonVariantStyleTypes as readonly string[]).includes(type);
}

function hasLightColor(
  colors: Maybe<Partial<LightColors>>,
  type: SwitchStyleType
): colors is LightColors {
  return Boolean(colors) && Object.hasOwn(colors as object, `${type}Light`);
}

function hasButtonVariantColor(
  colors: Maybe<Partial<ButtonVariantColors>>,
  type: SwitchStyleType
): colors is ButtonVariantColors {
  return Boolean(colors) && Object.hasOwn(colors as object, type);
}

function getTypeColor(
  theme: DefaultTheme,
  type: SwitchStyleType,
  light?: boolean
) {
  if (isValidationType(type)) {
    if (light && hasLightColor(theme.colors, type)) {
      return theme.colors[`${type}Light`];
    }
    return theme.validationInputColor[type].borderColor;
  } else if (light) {
    return theme.colors.gray2;
  } else if (hasButtonVariantColor(theme.colors, type)) {
    return theme.colors[type];
  } else if (isButtonType(type)) {
    return theme.buttonStyles.button.variant[type].bgColor;
  }

  return theme.colors.gray1;
}

interface SwitchElementProps {
  direction: Direction;
  type: SwitchStyleType;
}

const SwitchBase = styled.div<SwitchElementProps>`
  margin: 0 auto 10px;
  display: flex;
`;

const SwitchLabel = styled.label<SwitchElementProps & { isDisabled?: boolean }>`
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

const SwitchInput = styled.input<{ styleType: SwitchStyleType }>`
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
      background: ${({ theme, styleType }) =>
        getTypeColor(theme, styleType, false)};
    }

    &::after {
      background: #f4f4f4;
      left: 28px;
    }
  }
`;

const SwitchLabelText = styled.span<SwitchElementProps>`
  padding: ${props => Padding[props.direction]};
  flex-grow: 1;
  color: ${({ theme, type }) =>
    type === 'primary' ? '#000' : getTypeColor(theme, type, false)};
`;

const SwitchCheck = styled.span<SwitchElementProps>`
  order: -2;
  position: relative;
  width: 64px;

  &::before {
    background: ${({ theme, type }) => getTypeColor(theme, type, true)};
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

const SwitchOffText = styled.span<
  SwitchElementProps & { textOff: React.ReactNode }
>`
  order: ${props =>
    props.direction === 'left' || props.direction === 'top' ? '-1' : '-3'};
  padding: ${props => (props.textOff === '' ? '0' : '0 1rem 0 1rem')};
  vertical-align: middle;
`;

const SwitchOnText = styled.span<
  SwitchElementProps & { textOn: React.ReactNode }
>`
  order: ${props =>
    props.direction === 'left' || props.direction === 'top' ? '-3' : '-1'};
  padding: ${props => (props.textOn === '' ? '0' : '0 1rem 0 0.75rem')};
  vertical-align: middle;
`;

type InputProps = JSXElementProps<'input'>;

export type SwitchProps = JSXElementProps<'div'> & {
  type?: SwitchStyleType;
  label?: string;
  direction?: Direction;
  ariaLabel?: InputProps['aria-label'];
  onText?: React.ReactNode;
  offText?: React.ReactNode;
  checked?: boolean;
  onChange?: InputProps['onChange'];
  disabled?: InputProps['disabled'];
};

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(function Switch(
  props,
  ref
) {
  const {
    type = 'primary',
    label,
    direction = 'right',
    ariaLabel,
    onText = '',
    offText = '',
    checked,
    disabled,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange,
    ...switchProps
  } = props;
  const propsRef = useRef(props);
  propsRef.current = props;
  const [isToggled, setIsToggled] = useState(checked);

  const elementProps = { direction, type };

  useEffect(() => {
    setIsToggled(checked);
  }, [checked]);

  const handleToggle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      setIsToggled(isChecked);
      (propsRef.current.onChange || noop)(event);
    },
    []
  );

  return (
    <SwitchBase
      {...elementProps}
      {...switchProps}
      ref={ref}
      className={`${switchProps.className || ''} es-switch__container ${
        isToggled ? 'toggled-on' : 'toggled-off'
      }`}
    >
      <SwitchLabel isDisabled={disabled} {...elementProps}>
        <SwitchInput
          disabled={disabled}
          styleType={type}
          type="checkbox"
          checked={isToggled}
          onChange={handleToggle}
          aria-label={ariaLabel}
        />
        <SwitchLabelText {...elementProps} className="es-switch__label-text">
          {label}
        </SwitchLabelText>
        <SwitchOffText
          {...elementProps}
          textOff={offText}
          className="es-switch__off-text"
        >
          {offText}
        </SwitchOffText>
        <SwitchCheck {...elementProps} className="es-switch__display" />
        <SwitchOnText
          {...elementProps}
          textOn={onText}
          className="es-switch__on-text"
        >
          {onText}
        </SwitchOnText>
      </SwitchLabel>
    </SwitchBase>
  );
});

Switch.propTypes = {
  /** The type attribute for the switch */
  type: PropTypes.oneOf<SwitchStyleType>([
    ...buttonVariantStyleTypes,
    ...validationStyleTypes
  ]),
  /** The label text for the switch */
  label: PropTypes.string,
  /** The location of the label */
  direction: PropTypes.oneOf<Direction>(directions),
  /** Accessibility label for the checkbox */
  ariaLabel: PropTypes.string,
  /** This text goes on the right of the switch, denoting the 'on' position */
  onText: PropTypes.node,
  /** This text goes on the left of the switch, denoting the 'off' position */
  offText: PropTypes.node,
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
