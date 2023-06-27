import ESTheme from 'es-components-shared-types';
import React from 'react';

declare global {
  type Maybe<T> = T | null | undefined;
  type ReactFCWithChildren<T = unknown> = React.FC<React.PropsWithChildren<T>>;
  type JSXElementProps<T> = T extends keyof JSX.IntrinsicElements
    ? React.PropsWithoutRef<JSX.IntrinsicElements[T]>
    : never;
  type Theme = ESTheme;
  const ASSETS_PATH: string;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ESTheme {}
}
