/* eslint no-confusing-arrow: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Button from './Button';
import OutlineButton from './OutlineButton';
import { useTheme } from '../../util/useTheme';

const buttonMixin = css`
  background-color: ${props =>
    props.isPressed ? props.variant.hoverBgColor : props.variant.bgColor};
  color: ${props =>
    props.isPressed ? props.variant.activeTextColor : props.variant.textColor};
`;

const StyledButton = styled(Button)`
  ${buttonMixin};
`;

const StyledOutlineButton = styled(OutlineButton)`
  ${buttonMixin};
`;

function ToggleButton(props) {
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState(props.isPressed);

  function toggleButton(event) {
    setIsPressed(!isPressed);
    props.onClick(event);
  }

  const { styleType, size, block, isOutline, ...buttonProps } = props;

  if (isOutline) {
    return (
      <StyledOutlineButton
        {...buttonProps}
        onClick={toggleButton}
        styleType={styleType}
        size={size}
        block={block}
        isOutline={isOutline}
        isPressed={isPressed}
        variant={theme.buttonStyles.outlineButton.variant[styleType]}
      >
        {props.children}
      </StyledOutlineButton>
    );
  }

  return (
    <StyledButton
      {...buttonProps}
      onClick={toggleButton}
      styleType={styleType}
      size={size}
      block={block}
      isOutline={isOutline}
      isPressed={isPressed}
      variant={theme.buttonStyles.button.variant[styleType]}
    >
      {props.children}
    </StyledButton>
  );
}

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  styleType: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'default', 'sm', 'xs']),
  block: PropTypes.bool,
  isOutline: PropTypes.bool,
  isPressed: PropTypes.bool
};

ToggleButton.defaultProps = {
  styleType: 'default',
  size: 'default',
  block: false,
  isOutline: false,
  isPressed: false
};

export default ToggleButton;
