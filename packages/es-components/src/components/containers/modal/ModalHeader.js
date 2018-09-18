import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';
import DismissButton from '../../controls/DismissButton';

// Note: ModalHeader relies on a parent (Modal) with ThemeProvider wrapping it
const Header = styled.div`
  border-bottom: 2px solid ${props => props.theme.brandColors.vbMagenta};
  color: ${props => props.theme.colors.gray9};
  display: flex;
  font-size: 26px;
  font-weight: 500;
  justify-content: space-between;
  padding: 15px;
`;

const Title = styled.h4`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
`;

const DismissModal = styled(DismissButton)`
  color: ${props => props.theme.colors.black};
  line-height: 1;
  opacity: 0.2;
  text-shadow: 0 1px 0 ${props => props.theme.colors.white};

  &:hover {
    opacity: 0.5;
  }
`;

const ModalHeader = (props, { modal }) => {
  const { hideCloseButton, children, ...otherProps } = props;
  const onHide = modal ? modal.onHide : noop;
  const ariaId = modal ? modal.ariaId : null;

  return (
    <Header {...otherProps}>
      <Title id={ariaId}>{children}</Title>

      {!hideCloseButton && <DismissModal onClick={onHide} />}
    </Header>
  );
};

ModalHeader.propTypes = {
  /** Specify whether the modal header should contain a close button */
  hideCloseButton: PropTypes.bool,
  children: PropTypes.any
};

ModalHeader.defaultProps = {
  hideCloseButton: false,
  children: null
};

ModalHeader.contextTypes = {
  modal: PropTypes.shape({
    onHide: PropTypes.func,
    ariaId: PropTypes.string
  })
};

export default ModalHeader;
