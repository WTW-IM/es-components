import React from 'react';
import styled from 'styled-components';
import screenReaderOnly from '../patterns/screenReaderOnly/screenReaderOnly';

const DismissButtonBase = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 27px;
  font-weight: bold;
`;

const ScreenReaderText = screenReaderOnly('span');

const DismissButton = props => (
  <DismissButtonBase aria-label="Close" type="button" {...props}>
    <span aria-hidden="true">×</span>
    <ScreenReaderText>Close</ScreenReaderText>
  </DismissButtonBase>
);

export default DismissButton;
