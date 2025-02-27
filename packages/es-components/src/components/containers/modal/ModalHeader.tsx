import React, { useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import OrigDismissButton from '../../controls/DismissButton';
import { ModalContext } from './ModalContext';
import Heading from '../heading/Heading';
import { HeadingLevel, headingLevel } from 'es-components-shared-types';

const DismissButton = OrigDismissButton as React.ForwardRefExoticComponent<
  JSX.IntrinsicElements['button']
>;

// Note: ModalHeader relies on a parent (Modal) with ThemeProvider wrapping it
const Header = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: baseline;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 2px solid ${props => props.theme.brandColors.primary3};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.gray9};
  font-size: 26px;

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

export interface ModalHeaderProps extends JSXElementProps<'div'> {
  hideCloseButton?: boolean;
  level?: HeadingLevel;
  size?: HeadingLevel;
}

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(props, ref) {
    const { hideCloseButton, children, level = 4, size, ...otherProps } = props;
    const { onHide, ariaId } = useContext(ModalContext);

    return (
      <Header {...otherProps} ref={ref}>
        <Title id={ariaId} level={level} size={size}>
          {children}
        </Title>

        {!hideCloseButton && <DismissModal onClick={onHide} />}
      </Header>
    );
  }
);

ModalHeader.propTypes = {
  /** Specify whether the modal header should contain a close button */
  hideCloseButton: PropTypes.bool,
  children: PropTypes.any,
  level: PropTypes.oneOf<HeadingLevel>(headingLevel),
  size: PropTypes.oneOf<HeadingLevel>(headingLevel)
};

export default ModalHeader;
