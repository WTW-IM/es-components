import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import ButtonBase from './ButtonBase';
import { useTheme } from '../../util/useTheme';

const StyledButton = styled(ButtonBase)`
  background-color: ${props => props.colors.bgColor};
  border: 2px solid ${props => props.colors.textColor};
  border-radius: ${props => props.buttonSize.borderRadius};
  box-sizing: border-box;
  color: ${props => props.colors.textColor};
  cursor: pointer;
  display: block;
  font-family: inherit;
  font-size: ${props => props.buttonSize.fontSize};
  font-weight: ${props => props.buttonSize.fontWeight || 'normal'};
  line-height: ${props =>
    props.buttonSize.lineHeight || props.theme.font.baseLineHeight};
  min-width: 100px;
  padding-bottom: ${props => props.buttonSize.paddingBottom};
  padding-left: ${props => props.buttonSize.paddingSides};
  padding-right: ${props => props.buttonSize.paddingSides};
  padding-top: ${props => props.buttonSize.paddingTop};
  text-align: center;
  text-decoration: none;
  text-transform: ${props =>
    props.buttonSize.textTransform ? props.buttonSize.textTransform : 'none'};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    display: ${props => (props.block ? 'block' : 'inline-block')};
    width: ${props => (props.block ? '100%' : 'auto')};
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
    outline: none;
  }

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      background-color: ${props => props.colors.hoverBgColor};
      color: ${props => props.colors.hoverTextColor};
      border-color: ${props => props.colors.hoverBorderColor};
    }
  }

  &:active,
  &.pressed {
    background-color: ${props => props.colors.textColor};
    color: ${props => props.colors.hoverTextColor};
  }

  &.pressed {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25);
  }

  &:active:focus,
  &.pressed:focus {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25),
      0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
  }

  &[disabled],
  &[data-waiting],
  &[data-waiting]:active,
  &[data-waiting].pressed,
  &[data-waiting].pressed {
    background-color: #e6e6e6;
    border-color: #e6e6e6;
    color: #ccc;
    cursor: not-allowed;

    &:hover,
    &:active,
    &.pressed,
      background-color: #e6e6e6;
      border-color: #e6e6e6;
      color: #ccc;
      &:focus {
        box-shadow: 0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
      }
    }

    > * {
      pointer-events: none;
    }
  }
`;

export function OutlineButtonComponent(props, ref) {
  const { children, styleType, size, block, ...other } = props;
  const theme = useTheme();
  const buttonSize = theme.buttonStyles.outlineButton.size[size];
  const variant = theme.buttonStyles.outlineButton.variant[styleType];
  const isInheritedStyle = styleType === 'inherited';

  const focusBoxShadowColor = tinycolor.mix(
    variant.bgColor,
    theme.colors.black,
    14
  );
  focusBoxShadowColor.setAlpha(0.5);

  let buttonColors = {
    textColor: 'inherited',
    bgColor: 'inherited',

    hoverTextColor: 'inherited',
    hoverBgColor: 'inherited',
    hoverBorderColor: 'inherited',

    focusBoxShadowColor: theme.colors.gray4
  };

  if (!isInheritedStyle) {
    buttonColors = {
      textColor: variant.bgColor,
      bgColor: theme.colors.white,

      hoverTextColor: variant?.hoverColor || theme.colors.white,
      hoverBgColor: variant?.hoverBgColor || variant.bgColor,
      hoverBorderColor: variant?.hoverColor || variant?.bgColor,

      focusBoxShadowColor: focusBoxShadowColor.toRgbString()
    };
  }

  return (
    <StyledButton
      ref={ref}
      block={block}
      buttonSize={buttonSize}
      colors={buttonColors}
      type="button"
      {...other}
    >
      {children}
    </StyledButton>
  );
}

OutlineButtonComponent.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme buttonStyles.outlineButton */
  styleType: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'default', 'sm', 'xs']),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool
};

OutlineButtonComponent.defaultProps = {
  styleType: 'default',
  block: false,
  size: 'default'
};

const OutlineButton = React.forwardRef(OutlineButtonComponent);

export default OutlineButton;
