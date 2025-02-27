import React, { forwardRef } from 'react';
import styled from 'styled-components';

// styles are based off of WebAIM's recommended styles
// https://webaim.org/techniques/css/invisiblecontent/#absolutepositioning
const ScreenReaderOnlyBase = styled.div`
  position: absolute !important;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

function screenReaderOnly<T extends React.ElementType>(Component: T) {
  type TProps = React.ComponentProps<T>;
  type SROProps = React.ComponentProps<typeof ScreenReaderOnlyBase>;
  type P = TProps & SROProps;
  const SROnly = forwardRef<HTMLElement, P>(function SROnly(props, ref) {
    return <ScreenReaderOnlyBase as={Component} {...props} ref={ref} />;
  });
  return SROnly;
}

/** @component */
export default screenReaderOnly;
