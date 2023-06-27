import { DefaultTheme } from 'styled-components';
type PathPeriod<O, T extends Exclude<keyof O, symbol>> = `${T}.`;
type PathValue<O, T extends string> = T extends `${PathPeriod<
  O,
  infer P
>}${infer R}`
  ? PathValue<O[P], R>
  : T extends keyof O
  ? O[T]
  : never;

export type ThemeProps = { theme: DefaultTheme };

export default function getStyledProp<
  O extends ThemeProps = ThemeProps,
  P extends string = string,
  T extends keyof O = keyof O
>(propPath: P, propTarget: T = 'theme' as T): (props: O) => PathValue<O[T], P> {
  return (props: O) => {
    let targ: unknown = props[propTarget];
    const properties = propPath.split('.');
    while (properties.length && targ) {
      targ = (targ as { [key: string]: unknown })[properties.shift() as string];
    }
    return targ as PathValue<O[T], P>;
  };
}
