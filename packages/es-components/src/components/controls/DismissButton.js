import React from 'react';
import styled from 'styled-components';

const DismissButtonBase = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 27px;
  font-weight: bold;
`;

const ScreenReaderText = styled.span`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const DismissButton = props => (
  <DismissButtonBase aria-label="Close" {...props}>
    <span aria-hidden="true">×</span>
    <ScreenReaderText>Close</ScreenReaderText>
  </DismissButtonBase>
);

export default DismissButton;
