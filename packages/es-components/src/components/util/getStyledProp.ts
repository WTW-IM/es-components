import { DefaultTheme, ThemeProps } from 'styled-components';
type StringKeys<O> = Extract<keyof O, string>;
type StringKey<O, T extends StringKeys<O>> = T extends StringKeys<O>
  ? T
  : never;
type PathBlock<O, T extends string> = T extends StringKeys<O> ? T : never;
type PathPeriod<O, T extends StringKeys<O>> = `${PathBlock<O, T>}.`;
type PathSegment<
  O,
  T extends string,
  F extends string = T
> = T extends `${PathPeriod<O, infer P>}${infer R}`
  ? PathSegment<O[P], R, F>
  : T extends PathBlock<O, T>
  ? F
  : never;
type PathValue<O, T extends string> = T extends `${PathPeriod<
  O,
  infer P
>}${infer R}`
  ? PathValue<O[P], R>
  : T extends keyof O
  ? O[T]
  : never;

export type StyledPropPathValue<
  O,
  PPath,
  TKey = StringKeys<O>
> = TKey extends StringKey<O, infer T>
  ? PPath extends PathSegment<O[T], infer P>
    ? PathValue<O[T], P>
    : PPath extends PathSegment<O[StringKeys<O>], infer P>
    ? PathValue<O[StringKeys<O>], P>
    : never
  : never;

export type ESThemeProps<T = object> = ThemeProps<DefaultTheme> & T;

export function getProp<
  O extends ESThemeProps,
  P extends string,
  T extends StringKeys<O>
>(propPath: P, propTarget: T, props: O): StyledPropPathValue<O, P, T> {
  let targ: unknown = props[propTarget];
  const properties = propPath.split('.');
  while (properties.length && targ) {
    targ = (targ as { [key: string]: unknown })[properties.shift() as string];
  }
  return targ as StyledPropPathValue<O, P, T>;
}

export type InputStylesHeight = StyledPropPathValue<
  ESThemeProps,
  'inputStyles.inputHeight',
  'theme'
>;

export function getStyledProp<P extends string>(
  propPath: P
): (props: ESThemeProps) => StyledPropPathValue<ESThemeProps, P, 'theme'>;
export function getStyledProp<P extends string>(
  propPath: P,
  givenProps: ESThemeProps
): StyledPropPathValue<ESThemeProps, P, 'theme'>;
export function getStyledProp<
  P extends string,
  T extends StringKeys<O>,
  O extends ESThemeProps = ESThemeProps
>(propPath: P, propTarget: T, givenProps: O): StyledPropPathValue<O, P, T>;
export default function getStyledProp<
  P extends string,
  T extends StringKeys<O>,
  O extends ESThemeProps = ESThemeProps
>(
  propPath: P,
  propTarget?: T | O | undefined,
  givenProps?: O | undefined
): ((props: O) => StyledPropPathValue<O, P, T>) | StyledPropPathValue<O, P, T> {
  const themeProp = 'theme' as Extract<keyof O, string>;
  if (!propTarget && !givenProps) {
    return (props: O) => getProp(propPath, themeProp, props);
  }

  if (!givenProps) {
    return getProp(propPath, themeProp, propTarget as O);
  }

  return getProp(
    propPath,
    (propTarget as T | undefined) || themeProp,
    givenProps
  );
}
