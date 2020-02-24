import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';

const StyledButton = styled.button`
  background-color: ${props => props.variant.bgColor};
  border: 2px solid transparent;
  border-color: ${props => props.variant.bgColor};
  border-radius: ${props => props.buttonSize.borderRadius};
  box-sizing: border-box;
  color: ${props => props.variant.textColor};
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
    color: ${props => props.variant.hoverTextColor};
    background-color: ${props => props.variant.hoverBgColor};
    border-color: #bfbfbf;
    text-decoration: none;
  }

  &:focus {
    background-color: #c5c5c5;
    border-color: #bfbfbf;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 0.2rem rgba(184, 184, 184, 0.5);
    outline: 0;
  }

  &:active:focus {
    color: #000;
    background-color: #bfbfbf;
    border-color: #b8b8b8;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25),
      0 0 0 0.2rem rgba(184, 184, 184, 0.5);
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

  return (
    <StyledButton
      type="button"
      block={block}
      buttonSize={buttonSize}
      variant={variant}
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
