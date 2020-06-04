import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DismissButton from '../../controls/DismissButton';
import { ModalContext } from './ModalContext';
import Heading from '../heading/Heading';

// Note: ModalHeader relies on a parent (Modal) with ThemeProvider wrapping it
const Header = styled.div`
  align-items: baseline;
  border-bottom: 2px solid ${props => props.theme.brandColors.primary3};
  color: ${props => props.theme.colors.gray9};
  display: flex;
  font-size: 26px;
  justify-content: space-between;
  padding: 15px;
`;

const Title = styled(Heading)`
  margin: 0;
`;

const DismissModal = styled(DismissButton)`
  align-self: center;
  color: ${props => props.theme.colors.black};
  font-size: 18px;
`;

function ModalHeader(props) {
  const { hideCloseButton, children, level, ...otherProps } = props;
  const { onHide, ariaId } = useContext(ModalContext);

  return (
    <Header {...otherProps}>
      <Title id={ariaId} level={level}>
        {children}
      </Title>

      {!hideCloseButton && <DismissModal onClick={onHide} />}
    </Header>
  );
}

ModalHeader.propTypes = {
  /** Specify whether the modal header should contain a close button */
  hideCloseButton: PropTypes.bool,
  children: PropTypes.any,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

ModalHeader.defaultProps = {
  hideCloseButton: false,
  children: undefined,
  level: 4
};

export default ModalHeader;
