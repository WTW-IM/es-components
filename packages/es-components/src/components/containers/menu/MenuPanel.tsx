import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DismissButton from '../../controls/DismissButton';
import { InlineContext } from './InlineContext';
import useTopZIndex from '../../../hooks/useTopZIndex';

interface StyledPanelProps {
  isOpen: boolean;
}

interface DismissButtonProps {
  onClick: () => void;
}

const StyledPanel = styled.div<StyledPanelProps>`
  background-color: ${(props: { theme: { colors: { gray2: any } } }) =>
    props.theme.colors.gray2};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  z-index: ${({ topIndex }) => topIndex};
`;

const StyledDismissButton = styled(DismissButton)<DismissButtonProps>`
  margin-left: auto;
  margin-right: 4px;
`;

const Header = styled.header`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: ${(props: { hasHeaderContent: boolean }) =>
    props.hasHeaderContent ? '10px' : '0'};
  padding-left: 11px;
  padding-right: 5px;
  padding-top: ${(props: { hasHeaderContent: boolean }) =>
    props.hasHeaderContent ? '5px' : '0'};
`;

const StyledChildrenContainer = styled.div`
  display: flex;
  flex-direction: ${(props: { inline: boolean }) =>
    props.inline ? 'row' : 'column'};
  flex-wrap: wrap;
`;

function MenuPanel(props: {
  [x: string]: any;
  children: React.ReactNode;
  headerContent: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { children, headerContent, isOpen, onClose, ...other } = props;
  const getTopIndex = useTopZIndex();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onEscape({ key }: { key: string }) {
      if (key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', onEscape);

    return function removeKeydownListener() {
      window.removeEventListener('keydown', onEscape);
    };
  }, [isOpen, onClose]);

  const hasHeaderContent = !!headerContent;

  const inline = useContext(InlineContext);

  return (
    <StyledPanel isOpen={isOpen} topIndex={getTopIndex()} {...other}>
      <Header hasHeaderContent={hasHeaderContent}>
        {hasHeaderContent && <span>{headerContent}</span>}
        <StyledDismissButton onClick={onClose} />
      </Header>
      <StyledChildrenContainer inline={inline}>
        {children}
      </StyledChildrenContainer>
    </StyledPanel>
  );
}

MenuPanel.propTypes = {
  children: PropTypes.any.isRequired,
  headerContent: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

MenuPanel.defaultProps = {
  headerContent: null,
  isOpen: false
};

export default MenuPanel;
