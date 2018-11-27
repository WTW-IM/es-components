/* eslint no-confusing-arrow: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';
import { useTheme } from '../../util/useTheme';

const StyledToggleButton = styled(Button)`
  background-color: ${props =>
    props.isPressed ? props.variant.hoverBgColor : props.variant.bgColor};
  color: ${props =>
    props.isPressed ? props.variant.activeTextColor : props.variant.textColor};
`;

function ToggleButton(props) {
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState(props.isPressed);

  function toggleButton(event) {
    setIsPressed(!isPressed);
    props.handleOnClick(event);
  }

  const {
    buttonClasses,
    styleType,
    size,
    block,
    isOutline,
    ...buttonProps
  } = props;

  let variant;
  if (isOutline) {
    variant = theme.buttonStyles.buttonsOutline[styleType];
  } else {
    variant = theme.buttonStyles.buttonsNormal[styleType];
  }

  return (
    <StyledToggleButton
      {...buttonProps}
      handleOnClick={toggleButton}
      buttonClasses={buttonClasses}
      styleType={styleType}
      size={size}
      block={block}
      isOutline={isOutline}
      isPressed={isPressed}
      variant={variant}
    >
      {props.children}
    </StyledToggleButton>
  );
}

ToggleButton.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  /** @deprecated ToggleButton will accept standard className prop */
  buttonClasses: PropTypes.string,
  styleType: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'default', 'sm', 'xs']),
  block: PropTypes.bool,
  isOutline: PropTypes.bool,
  isPressed: PropTypes.bool
};

ToggleButton.defaultProps = {
  styleType: 'default',
  buttonClasses: undefined,
  size: 'default',
  block: false,
  isOutline: false,
  isPressed: false
};

export default ToggleButton;
