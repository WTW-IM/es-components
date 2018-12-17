import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';

const StyledButton = styled.button`
  background: none;
  border: none;
  box-sizing: border-box;
  display: ${props => (props.block ? 'block' : 'inline-block')};
  padding: 0;
  width: ${props => (props.block ? '100%' : 'initial')};

  .es-button__display {
    background-color: ${props => props.variant.bgColor};
    border-color: transparent;
    box-shadow: 0 4px 0 0 ${props => props.variant.boxShadowColor};
    border-radius: ${props => props.buttonSize.borderRadius};
    color: ${props => props.variant.textColor};
    cursor: pointer;
    display: ${props => (props.block ? 'block' : 'inline-block')};
    font-family: inherit;
    font-size: ${props => props.buttonSize.fontSize};
    font-weight: ${props => props.buttonSize.fontWeight || 'normal'};
    line-height: ${props =>
      props.buttonSize.lineHeight
        ? props.buttonSize.lineHeight
        : props.theme.sizes.baseLineHeight};
    margin-bottom: 4px;
    margin-top: 0;
    padding-bottom: ${props => props.buttonSize.paddingBottom};
    padding-left: ${props => props.buttonSize.paddingSides};
    padding-right: ${props => props.buttonSize.paddingSides};
    padding-top: ${props => props.buttonSize.paddingTop};
    text-align: center;
    text-transform: ${props =>
      props.buttonSize.textTransform ? props.buttonSize.textTransform : 'none'};
    transition: background-color 250ms linear;
    vertical-align: middle;
    white-space: nowrap;
  }

  &:hover .es-button__display {
    background-color: ${props => props.variant.hoverBgColor};
  }

  &:active {
    outline: none;
  }

  &:active .es-button__display {
    box-shadow: 0 0 0 0 transparent;
    margin-bottom: 0;
    margin-top: 4px;
  }

  &[disabled],
  &[disabled] .es-button__display {
    cursor: not-allowed;
    opacity: 0.65;

    > * {
      pointer-events: none;
    }
  }

  &[disabled]:hover .es-button__display {
    background-color: ${props => props.variant.bgColor};
  }
`;

function InnerButton({ children, styleType, size, block, innerRef, ...other }) {
  const theme = useTheme();
  const buttonSize = theme.buttonStyles.button.size[size];
  const variant = theme.buttonStyles.button.variant[styleType];
  const sharedProps = {
    block,
    buttonSize,
    ref: innerRef,
    variant,
    ...other
  };

  return (
    <StyledButton {...sharedProps}>
      <span className="es-button__display">{children}</span>
    </StyledButton>
  );
}

const Button = React.forwardRef((props, ref) => (
  <InnerButton innerRef={ref} {...props} />
));

Button.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
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
