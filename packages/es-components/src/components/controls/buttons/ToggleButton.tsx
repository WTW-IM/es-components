import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button, { ButtonProps } from './Button';
import OutlineButton from './OutlineButton';
import { useMonitoringCallback } from '../../../hooks/useMonitoringHooks';

export type ToggleButtonProps = ButtonProps & {
  isPressed?: boolean;
  isOutline?: boolean;
};

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  function ToggleButton(props, ref) {
    const {
      styleType,
      size,
      block,
      isOutline = false,
      onClick,
      isPressed: isPressedProp = false,
      ...buttonProps
    } = props;
    const [isPressed, setIsPressed] = useState(isPressedProp);

    useEffect(() => {
      setIsPressed(isPressedProp);
    }, [isPressedProp]);

    const toggleButton = useMonitoringCallback(
      (currentOnClick, event: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(oldIsPressed => !oldIsPressed);
        currentOnClick?.(event);
      },
      onClick
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
        ref={ref}
      >
        {props.children}
      </ToggleButtonType>
    );
  }
);

ToggleButton.propTypes = {
  ...Button.propTypes,
  isOutline: PropTypes.bool,
  isPressed: PropTypes.bool
};

export default ToggleButton;
