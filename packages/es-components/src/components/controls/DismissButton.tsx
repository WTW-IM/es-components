import React from 'react';
import styled from 'styled-components';
import screenReaderOnly from '../patterns/screenReaderOnly/screenReaderOnly';
import Icon from '../base/icons/Icon';

const DismissButtonBase = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  font-weight: bold;
  opacity: 0.2;
  padding: 0;

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;

interface Props {
  children?: React.ReactNode;
  type?: 'submit' | 'button';
}

type Ref = HTMLButtonElement;

const ScreenReaderText = screenReaderOnly('span');

const DismissButton = React.forwardRef<Ref, Props>(function DismissButton(
  props,
  ref
) {
  return (
    <DismissButtonBase aria-label="Close" {...props} type="button" ref={ref}>
      <Icon name="remove" />
      <ScreenReaderText>Close</ScreenReaderText>
    </DismissButtonBase>
  );
});

export default DismissButton;
