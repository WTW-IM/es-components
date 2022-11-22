import { Theme } from '../types/theme';
import * as generics from '../types/generics';
import viaTheme from 'es-components-via-theme';

type ViaTheme = typeof viaTheme;

declare global {
  type Maybe<T> = T | null | undefined;
  type RequireAtLeastOne<
    T,
    K extends keyof T = keyof T
  > = generics.RequireAtLeastOne<T, K>;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
