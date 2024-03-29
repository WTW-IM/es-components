import React from 'react';
import PropTypes from 'prop-types';
import { useLoadingState } from '../../../../hooks/useLoadingState';
import {
  ButtonBaseProps,
  propTypes as buttonBasePropTypes,
  defaultProps as buttonBaseDefaultProps
} from '../ButtonBase';
import { useMonitoringCallback } from '../../../../hooks/useMonitoringHooks';

export interface LoadingStateOnClick {
  (ev: React.MouseEvent<HTMLButtonElement>): Promise<void>;
}

export interface LoadingStateProps {
  showWhileRunning?: React.ReactNode;
  onClick?: LoadingStateOnClick;
}

type ButtonProps<P> = React.PropsWithoutRef<P>;

type ButtonWithLoadingStateProps<P> = Override<
  ButtonProps<P>,
  LoadingStateProps
>;

type ForwardedButtonComponent<P> = React.ForwardRefExoticComponent<
  ButtonProps<P>
>;

type ForwardedButtonBaseProps = ButtonProps<ButtonBaseProps>;

type ButtonWithLoadingStateComponent<P> = React.ForwardRefExoticComponent<
  ButtonWithLoadingStateProps<P> & React.RefAttributes<HTMLButtonElement>
>;

const voidClick = () => Promise.resolve();

export function withLoadingStateWhileRunning<
  P extends ForwardedButtonBaseProps
>(ButtonComponent: ForwardedButtonComponent<P>) {
  const ButtonWithLoadingState = React.forwardRef<
    HTMLButtonElement,
    ButtonWithLoadingStateProps<P>
  >(function ForwardedButtonWithLoadingState(
    {
      showWhileRunning: runningContent,
      children,
      waiting,
      onClick = voidClick,
      ...otherProps
    },
    ref
  ) {
    const [isRunning, showRunningWhile] = useLoadingState();
    const runOperation = useMonitoringCallback(
      (
        currentOnClick,
        ...params: Parameters<React.MouseEventHandler<HTMLButtonElement>>
      ) => {
        if (runningContent && !isRunning)
          return void showRunningWhile(currentOnClick(...params));

        return void currentOnClick(...params);
      },
      [isRunning, runningContent, showRunningWhile],
      onClick
    );

    return (
      <ButtonComponent
        {...(otherProps as ButtonProps<P>)}
        waiting={waiting || isRunning}
        onClick={runOperation}
        ref={ref}
      >
        {(isRunning && runningContent) || children}
      </ButtonComponent>
    );
  }) as ButtonWithLoadingStateComponent<P>;

  ButtonWithLoadingState.propTypes = {
    ...buttonBasePropTypes,
    ...(ButtonComponent.propTypes || {}),
    showWhileRunning: PropTypes.node,
    onClick: PropTypes.func
  } as React.WeakValidationMap<ButtonWithLoadingStateProps<P>>;

  ButtonWithLoadingState.defaultProps = {
    ...buttonBaseDefaultProps,
    ...((ButtonComponent.defaultProps || {}) as ButtonProps<P>),
    showWhileRunning: undefined,
    onClick: undefined
  };

  return ButtonWithLoadingState;
}
