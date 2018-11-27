import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import { ButtonBase } from '../BaseControls';
import { useTheme } from '../../util/useTheme';

const StyledButton = styled(ButtonBase)`
  background-color: ${props => props.variant.bgColor};
  border: 2px solid ${props => props.variant.borderColor};
  color: ${props => props.variant.textColor};
  transition: background-color 250ms linear, color 250ms linear;

  &:hover {
    background-color: ${props => props.variant.hoverBgColor};
    color: ${props => props.variant.hoverTextColor};
  }

  &:active {
    background-color: ${props => props.variant.activeBgColor};
    color: ${props => props.variant.activeTextColor};
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
  const buttonSize = theme.buttonStyles.outlineButton.size[size];
  const variant = theme.buttonStyles.outlineButton.variant[styleType];
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
      className={classnames('es-button es-button--outline', className)}
    >
      {children}
    </StyledButton>
  );
}

const OutlineButton = React.forwardRef((props, ref) => (
  <InnerButton innerRef={ref} {...props} />
));

OutlineButton.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
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
