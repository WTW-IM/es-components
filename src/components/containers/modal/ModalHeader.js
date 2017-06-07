import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../theme';
import { noop } from 'lodash';

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

const Button = styled.button`
  background: transparent;
  border: 0;
  color: ${colors.white};
  cursor: pointer;
  font-size: 27px;
  font-weight: bold;
  line-height: 1;
  margin-top: -2px;
  opacity: 1;
  padding: 0;
  text-shadow: 0 1px 0 ${colors.black};
`;

const ScreenReaderText = styled.span`
  border: 0;
  clip: rect(0,0,0,0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const ModalHeader = (props, context) => {
  const { closeButton, children, ...otherProps } = props;
  const modal = context.modal;
  const onHide = modal ? modal.onHide : noop;
  const ariaId = modal ? modal.ariaId : null;

  return (
    <Header {...otherProps}>
      <Title id={ariaId}>{children}</Title>

      {closeButton &&
        <Button type="button" aria-label="Close" onClick={onHide}>
          <span aria-hidden="true">×</span>
          <ScreenReaderText>Close</ScreenReaderText>
        </Button>}
    </Header>
  );
};

ModalHeader.propTypes = {
  /** Specify whether the Component should contain a close button */
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
