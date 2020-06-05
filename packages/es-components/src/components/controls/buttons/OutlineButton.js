import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

import { useTheme } from '../../util/useTheme';

const StyledButton = styled.button`
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
  outline: none;
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
  }

  &:hover {
    background-color: ${props => props.colors.textColor};
    color: ${props => props.colors.hoverTextColor};
  }

  &:active,
  &.pressed {
    background-color: ${props => props.colors.textColor};
    color: ${props => props.colors.hoverTextColor};
  }

  &.pressed {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25);
  }

  &:active:focus {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25),
      0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
  }

  &[disabled] {
    background-color: #e6e6e6;
    border-color: #e6e6e6;
    color: #ccc;
    cursor: not-allowed;

    &:hover {
      background-color: #e6e6e6;
      border-color: #e6e6e6;
      color: #ccc;
    }

    > * {
      pointer-events: none;
    }
  }
`;

const OutlineButton = React.forwardRef(function OutlineButton(props, ref) {
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

  const buttonColors = {
    textColor: isInheritedStyle ? 'inherited' : variant.bgColor,
    bgColor: isInheritedStyle ? 'inherited' : theme.colors.white,
    hoverTextColor: isInheritedStyle ? 'inherited' : theme.colors.white,
    focusBoxShadowColor: isInheritedStyle
      ? theme.colors.gray4
      : focusBoxShadowColor.toRgbString()
  };

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
});

OutlineButton.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme buttonStyles.outlineButton */
  styleType: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'default', 'sm', 'xs']),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool
};

OutlineButton.defaultProps = {
  styleType: 'default',
  block: false,
  size: 'default'
};

export default OutlineButton;
