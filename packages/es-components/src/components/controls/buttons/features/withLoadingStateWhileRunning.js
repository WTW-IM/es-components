import React from 'react';
import PropTypes from 'prop-types';
import { useLoadingState } from '../../../../hooks/useLoadingState';

export const withLoadingStateWhileRunning = ButtonComponent => {
  const ButtonWithLoadingState = React.forwardRef(
    (
      {
        showWhileRunning: runningContent,
        children,
        onClick,
        waiting,
        ...otherProps
      },
      ref
    ) => {
      const [isRunning, showRunningWhile] = useLoadingState();
      const runOperation = (...params) =>
        runningContent
          ? !isRunning && showRunningWhile(onClick(...params))
          : onClick(...params);

      return (
        <ButtonComponent
          {...otherProps}
          waiting={waiting || isRunning}
          onClick={runOperation}
          ref={ref}
        >
          {runningContent && isRunning ? runningContent : children}
        </ButtonComponent>
      );
    }
  );

  ButtonWithLoadingState.propTypes = {
    ...ButtonComponent.propTypes,
    showWhileRunning: PropTypes.any,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
  };

  ButtonWithLoadingState.defaultProps = {
    ...ButtonComponent.defaultProps,
    showWhileRunning: undefined,
    onClick: undefined
  };

  return ButtonWithLoadingState;
};
