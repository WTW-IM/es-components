import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DismissButton from '../../controls/DismissButton';
import { InlineContext } from './InlineContext';
import useTopZIndex from '../../../hooks/useTopZIndex';
import { useMonitoringEffect } from '../../../hooks/useMonitoringHooks';

interface StyledPanelProps {
  $isOpen: boolean;
  $topIndex: number;
}

const StyledPanel = styled.div<StyledPanelProps>`
  position: absolute;
  z-index: ${({ $topIndex }) => $topIndex};
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  background-color: ${({
    theme: {
      colors: { gray2 }
    }
  }) => gray2};
`;

const StyledDismissButton = styled(DismissButton)`
  margin-right: 4px;
  margin-left: auto;
`;

interface HeaderStyledProps {
  $hasHeaderContent: boolean;
}
const Header = styled.header<HeaderStyledProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: ${props => (props.$hasHeaderContent ? '5px' : '0')} 5px
    ${props => (props.$hasHeaderContent ? '10px' : '0')} 11px;
`;

interface StyledChildrenContainerProps {
  $inline: boolean;
}
const StyledChildrenContainer = styled.div<StyledChildrenContainerProps>`
  display: flex;
  flex-flow: ${props => (props.$inline ? 'row' : 'column')} wrap;
`;

type MenuPanelProps = JSXElementProps<'div'> & {
  headerContent?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const MenuPanel = React.forwardRef<HTMLDivElement, MenuPanelProps>(
  function ForwardedMenuPanel(
    { children, headerContent, isOpen, onClose, ...other },
    ref
  ) {
    const getTopIndex = useTopZIndex();

    useMonitoringEffect(
      currentOnClose => {
        if (!isOpen) {
          return;
        }

        function onEscape({ key }: { key: string }) {
          if (key === 'Escape') {
            currentOnClose?.();
          }
        }
        window.addEventListener('keydown', onEscape);

        return function removeKeydownListener() {
          window.removeEventListener('keydown', onEscape);
        };
      },
      [isOpen],
      onClose
    );

    const hasHeaderContent = !!headerContent;

    const inline = useContext(InlineContext);

    return (
      <StyledPanel
        ref={ref}
        $isOpen={isOpen}
        $topIndex={getTopIndex()}
        {...other}
      >
        <Header $hasHeaderContent={hasHeaderContent}>
          {hasHeaderContent && <span>{headerContent}</span>}
          <StyledDismissButton onClick={onClose} />
        </Header>
        <StyledChildrenContainer $inline={inline}>
          {children}
        </StyledChildrenContainer>
      </StyledPanel>
    );
  }
);

MenuPanel.propTypes = {
  children: PropTypes.any.isRequired,
  headerContent: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

MenuPanel.defaultProps = {
  headerContent: null,
  isOpen: false
};

export default MenuPanel;
