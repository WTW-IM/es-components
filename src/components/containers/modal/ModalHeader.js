import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../theme';
import { noop } from 'lodash';
import DismissButton from '../../controls/DismissButton';

const Header = styled.div`
  background-color: ${colors.accent};
  border-bottom: 1px solid ${colors.grayLighter};
  color: ${colors.white};
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
  color: ${colors.white};
  text-shadow: 0 1px 0 ${colors.black};
`;

const ModalHeader = (props, context) => {
  const { closeButton, children, ...otherProps } = props;
  const modal = context.modal;
  const onHide = modal ? modal.onHide : noop;
  const ariaId = modal ? modal.ariaId : null;

  return (
    <Header {...otherProps}>
      <Title id={ariaId}>{children}</Title>

      {closeButton && <DismissModal onClick={onHide} />}
    </Header>
  );
};

ModalHeader.propTypes = {
  /** Specify whether the modal header should contain a close button */
  closeButton: PropTypes.bool,
  children: PropTypes.any
};

ModalHeader.defaultProps = {
  closeButton: true
};

ModalHeader.contextTypes = {
  modal: PropTypes.shape({
    onHide: PropTypes.func,
    ariaId: PropTypes.string
  })
};

export default ModalHeader;
