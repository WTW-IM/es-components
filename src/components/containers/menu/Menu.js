import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '../../controls/buttons/ToggleButton';
import styled, { ThemeProvider } from 'styled-components';
import MenuPanel from './MenuPanel';
import MenuSection from './MenuSection';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import defaultTheme from '../../theme/defaultTheme';

const Backdrop = styled.div`
  background-color: black;
  bottom: 0;
  cursor: auto;
  left: 0;
  opacity: 0.5;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${props => (props.isMenuOpen ? 'auto' : '-1')};
`;

class Menu extends React.Component {
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
      theme,
      openButtonType,
      rootClose,
      hasBackdrop
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <RootCloseWrapper onRootClose={this.closeMenu} disabled={!rootClose}>
          <div className={className}>
            {hasBackdrop && (
              <Backdrop
                isMenuOpen={this.state.isMenuOpen}
                onClick={this.closeMenu}
              />
            )}
            <ToggleButton
              handleOnClick={this.toggleMenu}
              isPressed={this.state.isMenuOpen}
              styleType={openButtonType}
            >
              {buttonContent}
            </ToggleButton>
            <MenuPanel isOpen={this.state.isMenuOpen} onClose={this.closeMenu}>
              {children}
            </MenuPanel>
          </div>
        </RootCloseWrapper>
      </ThemeProvider>
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
  theme: PropTypes.object,
  hasBackdrop: PropTypes.bool
};

Menu.defaultProps = {
  theme: defaultTheme,
  rootClose: false,
  openButtonType: 'default'
};

export default Menu;
