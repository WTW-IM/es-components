import React from 'react';
import PropTypes from 'prop-types';
import { useLoadingState } from '../../../../hooks/useLoadingState';
import { ButtonBaseProps } from '../ButtonBase';
import { useMonitoringCallback } from '../../../../hooks/useMonitoringHooks';

type ButtonClickHandler = React.MouseEventHandler<HTMLButtonElement>;
type ButtonClickParams = Parameters<ButtonClickHandler>;
type ButtonClickReturn = ReturnType<ButtonClickHandler>;
type AwaitableButtonClickHandler = (
  ...params: ButtonClickParams
) => Promise<ButtonClickReturn>;

export type LoadingStateOnClick = (
  ...params: ButtonClickParams
) => ButtonClickReturn | Promise<ButtonClickReturn>;

export interface LoadingStateProps {
  showWhileRunning?: React.ReactNode;
  onClick?: LoadingStateOnClick;
}

type ExpectedButtonProps = Pick<
  ButtonBaseProps,
  'waiting' | 'children' | 'onClick'
>;
type ForwardedButtonProps = Override<ButtonBaseProps, LoadingStateProps>;
type ModifiedButtonProps<P extends ExpectedButtonProps> = Override<
  P,
  ForwardedButtonProps
>;

const voidClick = () => Promise.resolve();

type ButtonWithLoadingStateProps<P extends ExpectedButtonProps> =
  P extends ExpectedButtonProps ? ModifiedButtonProps<P> : never;

export function withLoadingStateWhileRunning<P extends ExpectedButtonProps>(
  ButtonComponent: React.ComponentType<P>
) {
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
      (currentOnClick, ...params: ButtonClickParams) => {
        if (runningContent && !isRunning)
          return void showRunningWhile(
            (currentOnClick as AwaitableButtonClickHandler)(...params)
          );

        return void currentOnClick(...params);
      },
      [isRunning, runningContent, showRunningWhile],
      onClick
    );

    const buttonProps = {
      ...otherProps,
      waiting: waiting || isRunning,
      onClick: runOperation,
      children: (isRunning && runningContent) || children
    };

    return <ButtonComponent {...(buttonProps as unknown as P)} ref={ref} />;
  });

  ButtonWithLoadingState.propTypes = {
    children: PropTypes.node,
    ...(ButtonComponent.propTypes || {}),
    showWhileRunning: PropTypes.node,
    onClick: PropTypes.func
  } as (typeof ButtonWithLoadingState)['propTypes'];

  return ButtonWithLoadingState;
}
