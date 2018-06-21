import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DismissButton from '../../controls/DismissButton';

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
  padding-bottom: ${props => (props.hasHeaderContent ? '10px' : '0')}
  padding-left: 11px;
  padding-right: 5px;
  padding-top: ${props => (props.hasHeaderContent ? '5px' : '0')}
`;

const StyledChildrenContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
  flex-wrap: wrap;
`;

class MenuPanel extends React.Component {
  componentDidMount = () => {
    document.addEventListener('keydown', this.onEscape);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.onEscape);
  };

  onEscape = ({ keyCode }) => {
    if (keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    const { children, headerContent, isOpen, onClose } = this.props;
    const hasHeaderContent = !!headerContent;

    return (
      <StyledPanel isOpen={isOpen} className="es-menu__panel">
        <Header hasHeaderContent={hasHeaderContent}>
          {hasHeaderContent && <span>{headerContent}</span>}
          <StyledDismissButton onClick={onClose} />
        </Header>
        <StyledChildrenContainer inline={this.context.inline}>
          {children}
        </StyledChildrenContainer>
      </StyledPanel>
    );
  }
}

MenuPanel.propTypes = {
  children: PropTypes.any.isRequired,
  headerContent: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.object
};

MenuPanel.contextTypes = {
  inline: PropTypes.bool
};

export default MenuPanel;
