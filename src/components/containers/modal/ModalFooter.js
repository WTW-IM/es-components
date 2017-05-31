import React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme';

const Footer = styled.div`
  background-color: ${colors.grayLighter};
  border-top: 1px solid ${colors.gray};
  padding: 15px;
  text-align: right;
`;

const ModalFooter = props => <Footer {...props} />;

export default ModalFooter;
