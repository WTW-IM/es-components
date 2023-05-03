// Path: withLoadingStateWhileRunning.js
import React from 'react';

export type LoadingStateWhileRunningResult<T> = React.ForwardRefExoticComponent<
  React.PropsWithChildren<
    React.RefAttributes<
      T & {
        showWhileRunning?: React.ComponentType<any>;
        onClick?: (
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void;
      }
    >
  >
>;

export function withLoadingStateWhileRunning<T>(
  ButtonComponent: React.ForwardRefExoticComponent<React.RefAttributes<T>>
): LoadingStateWhileRunningResult<T>;
