import React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme';

const Body = styled.div`
  color: ${colors.grayDarkest};
  padding: 15px;
`;

const ModalBody = props => <Body {...props} />;

export default ModalBody;
