import React from 'react';
import PropTypes from 'prop-types';
import { useLoadingState } from '../../../../hooks/useLoadingState';

export const withDisabledContentWhileRunning = ButtonComponent => {
  const ButtonWithLoadingState = React.forwardRef(
    (
      {
        showWhileRunning: runningContent,
        disabled,
        children,
        onClick,
        ...otherProps
      },
      ref
    ) => {
      const [isRunning, showRunningWhile] = useLoadingState();

      const runOperation = (...params) =>
        runningContent
          ? showRunningWhile(onClick(...params))
          : onClick(...params);

      return (
        <ButtonComponent
          {...otherProps}
          disabled={runningContent ? isRunning : disabled}
          onClick={runOperation}
          ref={ref}
        >
          {runningContent && isRunning ? runningContent : children}
        </ButtonComponent>
      );
    }
  );

  ButtonWithLoadingState.propTypes = {
    showWhileRunning: PropTypes.any,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
  };

  ButtonWithLoadingState.defaultProps = {
    showWhileRunning: undefined,
    disabled: undefined,
    onClick: undefined
  };

  return ButtonWithLoadingState;
};
