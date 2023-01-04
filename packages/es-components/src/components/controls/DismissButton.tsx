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

const ScreenReaderText = screenReaderOnly('span');

export type DismissButtonProps = JSXElementProps<'button'>;

const DismissButton = React.forwardRef<HTMLButtonElement, DismissButtonProps>(
  function DismissButton(props, ref) {
    return (
      <DismissButtonBase aria-label="Close" {...props} type="button" ref={ref}>
        <Icon name="remove" />
        <ScreenReaderText>Close</ScreenReaderText>
      </DismissButtonBase>
    );
  }
);

export default DismissButton;
