import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button, { ButtonProps } from './Button';
import OutlineButton from './OutlineButton';

export type ToggleButtonProps = ButtonProps & {
  isPressed?: boolean;
  isOutline?: boolean;
};

function ToggleButton(props: ToggleButtonProps) {
  const {
    styleType,
    size,
    block,
    isOutline,
    onClick = () => ({}),
    ...buttonProps
  } = props;
  const [isPressed, setIsPressed] = useState(props.isPressed);

  useEffect(() => {
    setIsPressed(props.isPressed);
  }, [props.isPressed]);

  const toggleButton = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    event => {
      setIsPressed(oldIsPressed => !oldIsPressed);
      onClick(event);
    },
    [onClick]
  );

  const ToggleButtonType = isOutline ? OutlineButton : Button;

  return (
    <ToggleButtonType
      {...buttonProps}
      onClick={toggleButton}
      styleType={styleType}
      size={size}
      block={block}
      className={
        isPressed
          ? `${buttonProps.className || ''} pressed`
          : buttonProps.className
      }
      aria-pressed={isPressed}
    >
      {props.children}
    </ToggleButtonType>
  );
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
ToggleButton.propTypes = {
  ...Button.propTypes,
  isOutline: PropTypes.bool,
  isPressed: PropTypes.bool
};

const unchildrenDefaults = { ...Button.defaultProps };
delete unchildrenDefaults['children'];

ToggleButton.defaultProps = {
  ...(unchildrenDefaults as Omit<ButtonProps, 'children'>),
  isOutline: false,
  isPressed: false
};
/* eslint-enable @typescript-eslint/no-non-null-assertion */

export default ToggleButton;
