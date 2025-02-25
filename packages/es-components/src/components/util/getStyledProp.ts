import { ExecutionContext } from 'styled-components';
type StringKeys<O> = Extract<keyof O, string>;
type StringKey<O, T extends StringKeys<O>> =
  T extends StringKeys<O> ? T : never;
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

export type StyledPropPathValue<O, PPath, TKey = StringKeys<O>> =
  TKey extends StringKey<O, infer T>
    ? PPath extends PathSegment<O[T], infer P>
      ? PathValue<O[T], P>
      : PPath extends PathSegment<O[StringKeys<O>], infer P>
        ? PathValue<O[StringKeys<O>], P>
        : never
    : never;

export type ESThemeProps<T = object> = ExecutionContext & T;

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
): (
  props: ExecutionContext
) => StyledPropPathValue<ExecutionContext, P, 'theme'>;
export function getStyledProp<P extends string, O extends ExecutionContext>(
  propPath: P,
  givenProps: O
): StyledPropPathValue<O, P, 'theme'>;
export function getStyledProp<
  P extends string,
  T extends StringKeys<O>,
  O extends ExecutionContext
>(propPath: P, propTarget: T, givenProps: O): StyledPropPathValue<O, P, T>;
export default function getStyledProp<
  P extends string,
  T extends StringKeys<O>,
  O extends ExecutionContext
>(
  propPath: P,
  propTarget?: T | O,
  givenProps?: O
):
  | ((
      props: ExecutionContext
    ) => StyledPropPathValue<ExecutionContext, P, 'theme'>)
  | StyledPropPathValue<O, P, T> {
  if (!propTarget && !givenProps) {
    type FuncReturn = StyledPropPathValue<ExecutionContext, P, 'theme'>;
    return (props: ExecutionContext): FuncReturn =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      getProp(propPath, 'theme', props) as unknown as FuncReturn;
  }

  const themeProp = 'theme' as StringKeys<O>;
  if (!givenProps) {
    return getProp(propPath, themeProp, propTarget as O);
  }

  return getProp(
    propPath,
    (propTarget as T | undefined) || themeProp,
    givenProps
  );
}
