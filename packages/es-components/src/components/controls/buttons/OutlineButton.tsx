import type * as CSS from 'csstype';
import styled from 'styled-components';
import Button from './Button';
import { ButtonSizeBlock } from 'es-components-shared-types';

type OutlineButtonColors = {
  textColor: CSS.Property.Color;
  bgColor: CSS.Property.BackgroundColor;

  hoverTextColor: CSS.Property.Color;
  hoverBgColor: CSS.Property.BackgroundColor;
  hoverBorderColor: CSS.Property.BorderColor;

  focusBoxShadowColor: CSS.Property.Color;
};

const OutlineButton = styled(Button)<{
  colors: OutlineButtonColors;
  buttonSize: ButtonSizeBlock;
  block: boolean;
}>`
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
    &.pressed {
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

export default OutlineButton;
