import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import classnames from 'classnames';
import { ButtonBase } from '../BaseControls';

// the padding-bottom is set to the top value intentionally.
// needed for the slight difference from the normal button style
const StyledButton = styled(ButtonBase)`
  background-color: ${props => props.variant.bgColor};
  border: 2px solid ${props => props.variant.borderColor};
  color: ${props => props.variant.textColor};
  padding-bottom: ${props => props.buttonSize.paddingTop};
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

function OutlineButton({
  children,
  styleType,
  size,
  block,
  theme,
  ...buttonProps
}) {
  const buttonSize = theme.buttonStyles.outlineButton.size[size];
  const variant = theme.buttonStyles.outlineButton.variant[styleType];
  const { className, ...otherProps } = buttonProps;
  const sharedProps = {
    block,
    buttonSize,
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

OutlineButton.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'default', 'sm', 'xs']),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired
};

OutlineButton.defaultProps = {
  styleType: 'default',
  block: false,
  size: 'default'
};

export default withTheme(OutlineButton);
