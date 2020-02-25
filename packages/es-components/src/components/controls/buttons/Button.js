import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

import { useTheme } from '../../util/useTheme';

function darken(color, percent) {
  return tinycolor(color)
    .darken(percent)
    .toHexString();
}

const StyledButton = styled.button`
  background-color: ${props => props.colors.bgColor};
  border: 2px solid transparent;
  border-color: ${props => props.colors.bgColor};
  border-radius: ${props => props.buttonSize.borderRadius};
  box-sizing: border-box;
  color: ${props => props.colors.textColor};
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  font-size: ${props => props.buttonSize.fontSize};
  font-weight: ${props => props.buttonSize.fontWeight || 'normal'};
  line-height: ${props =>
    props.buttonSize.lineHeight
      ? props.buttonSize.lineHeight
      : props.theme.sizes.baseLineHeight};
  min-width: 100px;
  padding-bottom: ${props => props.buttonSize.paddingBottom};
  padding-left: ${props => props.buttonSize.paddingSides};
  padding-right: ${props => props.buttonSize.paddingSides};
  padding-top: ${props => props.buttonSize.paddingTop};
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: ${props =>
    props.buttonSize.textTransform ? props.buttonSize.textTransform : 'none'};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    display: ${props => (props.block ? 'block' : 'inline-block')};
    width: ${props => (props.block ? '100%' : 'auto')};
  }

  &:hover {
    color: ${props => props.colors.hoverTextColor};
    background-color: ${props => props.colors.hoverBgColor};
    border-color: ${props => props.colors.hoverBorderColor};
    text-decoration: none;
  }

  &:focus {
    color: ${props => props.colors.hoverTextColor};
    background-color: ${props => props.colors.hoverBgColor};
    border-color: ${props => props.colors.hoverBorderColor};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
    outline: 0;
  }

  &:active,
  &.pressed {
    color: ${props => props.colors.activeTextColor};
    background-color: ${props => props.colors.activeBgColor};
    border-color: ${props => props.colors.activeBorderColor};
  }

  &.pressed {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25);
  }

  &:active:focus {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25),
      0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.65;

    > * {
      pointer-events: none;
    }
  }
`;

const Button = React.forwardRef(function Button(props, ref) {
  const { children, styleType, size, block, ...other } = props;
  const theme = useTheme();
  const buttonSize = theme.buttonStyles.button.size[size];
  const variant = theme.buttonStyles.button.variant[styleType];
  const isInheritedStyle = styleType === 'inherited';

  function getTextColor(bgColor) {
    return tinycolor.readability(theme.colors.black, bgColor) > 10
      ? theme.colors.black
      : theme.colors.white;
  }

  const focusBoxShadowColor = tinycolor.mix(
    variant.bgColor,
    theme.colors.black,
    14
  );
  focusBoxShadowColor.setAlpha(0.5);

  const buttonColors = {
    bgColor: isInheritedStyle ? 'inherited' : variant.bgColor,
    textColor: isInheritedStyle ? 'inherited' : getTextColor(variant.bgColor),
    borderColor: isInheritedStyle ? 'inherited' : variant.bgColor,
    hoverBgColor: isInheritedStyle ? 'inherited' : darken(variant.bgColor, 7.5),
    hoverBorderColor: isInheritedStyle
      ? 'inherited'
      : darken(variant.bgColor, 9.9),
    focusBoxShadowColor: isInheritedStyle
      ? theme.colors.gray4
      : focusBoxShadowColor.toRgbString()
  };
  buttonColors.activeBgColor = isInheritedStyle
    ? 'inherited'
    : darken(buttonColors.hoverBgColor, 2.5);
  buttonColors.activeTextColor = isInheritedStyle
    ? 'inherited'
    : getTextColor(buttonColors.activeBgColor);
  buttonColors.activeBorderColor = isInheritedStyle
    ? 'inherited'
    : darken(buttonColors.hoverBgColor, 5);
  buttonColors.hoverTextColor = isInheritedStyle
    ? 'inherited'
    : getTextColor(buttonColors.hoverBgColor);

  return (
    <StyledButton
      type="button"
      block={block}
      buttonSize={buttonSize}
      colors={buttonColors}
      ref={ref}
      {...other}
    >
      {children}
    </StyledButton>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme buttonStyles.button */
  styleType: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'default', 'sm', 'xs']),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool
};

Button.defaultProps = {
  styleType: 'default',
  block: false,
  size: 'default'
};

export default Button;
