import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import OrigDismissButton from '../../controls/DismissButton';
import { ModalContext } from './ModalContext';
import Heading from '../heading/Heading';
import { HeadingLevel } from 'es-components-shared-types';

const DismissButton = OrigDismissButton as React.ForwardRefExoticComponent<
  JSX.IntrinsicElements['button']
>;

// Note: ModalHeader relies on a parent (Modal) with ThemeProvider wrapping it
const Header = styled.div`
  align-items: baseline;
  background-color: ${props => props.theme.colors.white};
  border-bottom: 2px solid ${props => props.theme.brandColors.primary3};
  box-sizing: border-box;
  color: ${props => props.theme.colors.gray9};
  display: flex;
  font-size: 26px;
  justify-content: space-between;
  padding: 15px;

  .small & {
    @media (min-width: ${props => props.theme.screenSize.phone}) {
      position: static;
      width: unset;
    }
  }

  .medium & {
    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      position: static;
      width: unset;
    }
  }

  .large & {
    @media (min-width: ${props => props.theme.screenSize.desktop}) {
      position: static;
      width: unset;
    }
  }
`;

const Title = styled(Heading)`
  margin: 0;
`;

const DismissModal = styled(DismissButton)`
  align-self: center;
  color: ${props => props.theme.colors.black};
  font-size: 18px;
`;

interface ModalHeaderProps {
  hideCloseButton: boolean;
  children: React.ReactNode;
  level: HeadingLevel;
}

function ModalHeader(props: ModalHeaderProps) {
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
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
};

ModalHeader.defaultProps = {
  hideCloseButton: false,
  children: undefined,
  level: 4,
  ref: null
};

export default ModalHeader;
