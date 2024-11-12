import type ESTheme from 'es-components-shared-types';
import React from 'react';
import PropTypes from 'prop-types';
import type { DefaultTheme } from 'styled-components';

type KeysMatching<T, V> = {
  [K in keyof T]-?: K extends keyof V ? (T[K] extends V[K] ? K : never) : never;
}[keyof T];

declare global {
  type Maybe<T> = T | null | undefined;
  type IsNullable<T, K> = null | undefined extends T ? K : never;
  type IsNonNullable<T, K> = T extends null | undefined ? never : K;

  type NullableKeys<T> = {
    [K in keyof T]-?: IsNullable<T[K], K>;
  }[keyof T];
  type NonNullableKeys<T> = {
    [K in keyof T]-?: IsNonNullable<T[K], K>;
  }[keyof T];

  type BooleanString = 'true' | 'false';

  type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
  > & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  };

  type ReactFCWithChildren<T = unknown> = React.FC<React.PropsWithChildren<T>>;

  type JSXElementProps<T extends keyof JSX.IntrinsicElements> =
    T extends keyof JSX.IntrinsicElements
      ? React.PropsWithoutRef<
          'key' extends keyof JSX.IntrinsicElements[T]
            ? Omit<JSX.IntrinsicElements[T], 'key'>
            : JSX.IntrinsicElements[T]
        >
      : never;

  type Theme = ESTheme;

  type HTMLElementProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  type StyledComponentElementProps<T extends keyof JSX.IntrinsicElements> =
    JSXElementProps<T> & {
      as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
      forwardedAs?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  interface OptionalThemeProps {
    theme?: DefaultTheme;
  }

  type Without<T, U> = Omit<T, Extract<keyof T, keyof U>>;
  type Override<T, U> = Omit<T, keyof U> & U;

  type PropTypesOf<T> = {
    [key in keyof T]-?:
      | PropTypes.Requireable<T[key]>
      | PropTypes.Validator<T[key]>;
  };

  const ASSETS_PATH: string;

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      basicHTMLElement: HTMLElementProps;
    }
  }
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ESTheme {}
}
