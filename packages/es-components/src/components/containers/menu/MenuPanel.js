import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DismissButton from '../../controls/DismissButton';
import { InlineContext } from './InlineContext';

const StyledPanel = styled.div`
  background-color: ${props => props.theme.colors.gray2};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  z-index: 999;
`;

const StyledDismissButton = styled(DismissButton)`
  margin-left: auto;
`;

const Header = styled.header`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: ${props => (props.hasHeaderContent ? '10px' : '0')};
  padding-left: 11px;
  padding-right: 5px;
  padding-top: ${props => (props.hasHeaderContent ? '5px' : '0')};
`;

const StyledChildrenContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
  flex-wrap: wrap;
`;

function MenuPanel(props) {
  function onEscape({ keyCode }) {
    if (keyCode === 27) {
      props.onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onEscape);

    return function removeKeydownListener() {
      document.removeEventListener('keydown', onEscape);
    };
  });

  const { children, headerContent, isOpen, onClose } = props;
  const hasHeaderContent = !!headerContent;

  const inline = useContext(InlineContext);

  return (
    <StyledPanel isOpen={isOpen}>
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
