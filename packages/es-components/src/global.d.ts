import theme from '../../es-components-via-theme/src';

type ViaTheme = typeof theme;

declare global {
  type Maybe<T> = T | null | undefined;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ViaTheme {}
}
