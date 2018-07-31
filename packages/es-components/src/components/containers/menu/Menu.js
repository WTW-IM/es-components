import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import ToggleButton from '../../controls/buttons/ToggleButton';
import MenuPanel from './MenuPanel';
import MenuSection from './MenuSection';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

const Backdrop = styled.div`
  background-color: black;
  bottom: 0;
  cursor: auto;
  left: 0;
  opacity: 0.5;
  position: fixed;
  right: 0;
  top: 0;
  z-index: auto;
  display: ${props => (props.isMenuOpen ? 'inherit' : 'none')};
`;

export class Menu extends React.Component {
  static childContextTypes = {
    inline: PropTypes.bool
  };

  state = {
    isMenuOpen: false
  };

  getChildContext() {
    return { inline: this.props.inline };
  }

  toggleMenu = () => {
    this.setState(previousState => ({ isMenuOpen: !previousState.isMenuOpen }));
  };

  closeMenu = () => {
    if (this.state.isMenuOpen) {
      this.setState({ isMenuOpen: false });
    }
  };

  render() {
    const {
      children,
      buttonContent,
      className,
      openButtonType,
      rootClose,
      hasBackdrop,
      headerContent
    } = this.props;

    return (
      <RootCloseWrapper onRootClose={this.closeMenu} disabled={!rootClose}>
        <div className={classnames('es-menu', className)}>
          {hasBackdrop && (
            <Backdrop
              className="es-menu__backdrop"
              isMenuOpen={this.state.isMenuOpen}
              onClick={this.closeMenu}
            />
          )}
          <ToggleButton
            handleOnClick={this.toggleMenu}
            isPressed={this.state.isMenuOpen}
            styleType={openButtonType}
            aria-expanded={this.state.isMenuOpen}
          >
            {buttonContent}
          </ToggleButton>
          <MenuPanel
            headerContent={headerContent}
            isOpen={this.state.isMenuOpen}
            onClose={this.closeMenu}
          >
            {children}
          </MenuPanel>
        </div>
      </RootCloseWrapper>
    );
  }
}

Menu.MenuSection = MenuSection;

Menu.propTypes = {
  children: PropTypes.any.isRequired,
  buttonContent: PropTypes.any.isRequired,
  openButtonType: PropTypes.string,
  className: PropTypes.string,
  rootClose: PropTypes.bool,
  inline: PropTypes.bool,
  hasBackdrop: PropTypes.bool,
  headerContent: PropTypes.node
};

Menu.defaultProps = {
  rootClose: false,
  openButtonType: 'default'
};

export default Menu;
