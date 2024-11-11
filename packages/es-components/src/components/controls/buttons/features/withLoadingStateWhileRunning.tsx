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

export type LoadingStateOnClick =
  | ButtonClickHandler
  | AwaitableButtonClickHandler;

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
  ForwardedButtonProps,
  P
>;

const voidClick = () => Promise.resolve();

export function withLoadingStateWhileRunning<P extends ExpectedButtonProps>(
  ButtonComponent: React.ComponentType<P>
) {
  type ButtonWithLoadingStateProps = P extends ExpectedButtonProps
    ? ModifiedButtonProps<P>
    : never;

  type ButtonWithLoadingStateFunction = React.ForwardRefRenderFunction<
    HTMLButtonElement,
    React.PropsWithoutRef<ButtonWithLoadingStateProps>
  >;

  const ButtonWithLoadingState = React.forwardRef<
    HTMLButtonElement,
    ButtonWithLoadingStateProps
  >(
    ((): ButtonWithLoadingStateFunction => {
      const ForwardedButtonWithLoadingState: ButtonWithLoadingStateFunction = (
        {
          showWhileRunning: runningContent,
          children,
          waiting,
          onClick = voidClick,
          ...otherProps
        },
        ref
      ) => {
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
          children: (isRunning && runningContent) || children,
        };

        return <ButtonComponent {...(buttonProps as unknown as P)} ref={ref} />;
      };

      ForwardedButtonWithLoadingState.propTypes = {
        children: PropTypes.node,
        ...(ButtonComponent.propTypes || {}),
        showWhileRunning: PropTypes.node,
        onClick: PropTypes.func,
      } as unknown as (typeof ForwardedButtonWithLoadingState)['propTypes'];

      return ForwardedButtonWithLoadingState;
    })()
  );

  return ButtonWithLoadingState;
}
