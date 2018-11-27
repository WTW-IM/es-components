import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import { ButtonBase } from '../BaseControls';
import { useTheme } from '../../util/useTheme';

const StyledButton = styled(ButtonBase)`
  background-color: ${props => props.variant.bgColor};
  border-color: transparent;
  box-shadow: 0 4px 0 0 ${props => props.variant.boxShadowColor};
  color: ${props => props.variant.textColor};
  margin-bottom: 4px;
  margin-top: 0;
  transition: background-color 250ms linear;

  &[disabled]:hover {
    background-color: ${props => props.variant.bgColor};
  }

  &:hover {
    background-color: ${props => props.variant.hoverBgColor};
  }

  &:active {
    margin-bottom: 0;
    margin-top: 4px;
    box-shadow: 0 0 0 0 transparent;
  }
`;

function InnerButton({
  children,
  styleType,
  size,
  block,
  innerRef,
  ...buttonProps
}) {
  const theme = useTheme();
  const buttonSize = theme.buttonStyles.button.size[size];
  const variant = theme.buttonStyles.button.variant[styleType];
  const { className, ...otherProps } = buttonProps;
  const sharedProps = {
    block,
    buttonSize,
    ref: innerRef,
    variant,
    ...otherProps
  };

  return (
    <StyledButton
      {...sharedProps}
      className={classnames('es-button es-button--default', className)}
    >
      {children}
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
