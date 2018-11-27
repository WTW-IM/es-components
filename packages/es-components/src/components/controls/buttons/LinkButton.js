import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import classnames from 'classnames';

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  box-shadow: none;
  color: ${props => props.variant.bgColor};
  font-size: inherit;
  padding: 0;
  text-decoration: underline;

  &:hover,
  &:focus,
  &:active {
    color: ${props => props.variant.hoverBgColor};
    text-decoration: none;
  }

  &:active {
    box-shadow: none;
  }

  &[disabled]:hover {
    color: ${props => props.variant.bgColor};
    text-decoration: underline;
  }
`;

function LinkButton({
  children,
  styleType,
  size,
  block,
  theme,
  ...buttonProps
}) {
  const variant = theme.buttonStyles.button.variant[styleType];
  const { className, ...otherProps } = buttonProps;
  const sharedProps = {
    block,
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

LinkButton.propTypes = {
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

LinkButton.defaultProps = {
  styleType: 'default',
  block: false,
  size: 'default'
};

export default withTheme(LinkButton);
