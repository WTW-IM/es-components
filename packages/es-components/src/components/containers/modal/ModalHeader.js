import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';
import DismissButton from '../../controls/DismissButton';

// Note: ModalHeader relies on a parent (Modal) with ThemeProvider wrapping it
const Header = styled.div`
  background-color: ${props => props.theme.colors.popoverHeader};
  border-bottom: 1px solid ${props => props.theme.colors.gray2};
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const Title = styled.h4`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
`;

const DismissModal = styled(DismissButton)`
  color: ${props => props.theme.colors.white};
  text-shadow: 0 1px 0 ${props => props.theme.colors.black};
`;

const ModalHeader = (props, context) => {
  const { hideCloseButton, children, ...otherProps } = props;
  const modal = context.modal;
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
  hideCloseButton: false
};

ModalHeader.contextTypes = {
  modal: PropTypes.shape({
    onHide: PropTypes.func,
    ariaId: PropTypes.string
  })
};

export default ModalHeader;
