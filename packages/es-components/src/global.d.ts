import theme from '../../es-components-via-theme/src';
import React from 'react';

type ViaTheme = typeof theme;

declare global {
  type Maybe<T> = T | null | undefined;
  type ReactFCWithChildren<T = unknown> = React.FC<React.PropsWithChildren<T>>;
  type JSXElementProps<T> = T extends keyof JSX.IntrinsicElements
    ? Omit<JSX.IntrinsicElements[T], 'ref'>
    : never;
  type Theme = ViaTheme;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ViaTheme {}
}