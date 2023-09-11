import React from 'react';
import styled, { AnyStyledComponent, StyledComponent } from 'styled-components';

// styles are based off of WebAIM's recommended styles
// https://webaim.org/techniques/css/invisiblecontent/#absolutepositioning
const ScreenReaderOnlyBase = styled.div`
  position: absolute !important;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

function screenReaderOnly<
  T extends AnyStyledComponent | keyof JSX.IntrinsicElements,
  RT = HTMLElement
>(Component: T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type InnerProps = T extends StyledComponent<infer P, any>
    ? P
    : T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : never;

  const ScreenReaderInner = ScreenReaderOnlyBase as React.FC<InnerProps>;

  return React.forwardRef<RT, InnerProps>(function ScreenReaderOnlyComponent(
    props,
    ref
  ) {
    return <ScreenReaderInner as={Component} {...props} ref={ref} />;
  });
}

/** @component */
export default screenReaderOnly;
