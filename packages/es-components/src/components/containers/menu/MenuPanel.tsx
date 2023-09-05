import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DismissButton from '../../controls/DismissButton';
import { InlineContext } from './InlineContext';
import useTopZIndex from '../../../hooks/useTopZIndex';
import { useMonitoringEffect } from '../../../hooks/useMonitoringHooks';

const StyledPanel = styled.div<{ isOpen: boolean; topIndex: number }>`
  background-color: ${({
    theme: {
      colors: { gray2 }
    }
  }) => gray2};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  z-index: ${({ topIndex }) => topIndex};
`;

const StyledDismissButton = styled(DismissButton)`
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
        isOpen={isOpen}
        topIndex={getTopIndex()}
        {...other}
      >
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
