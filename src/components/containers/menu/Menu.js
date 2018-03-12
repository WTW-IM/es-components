import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '../../controls/buttons/ToggleButton';
import { ThemeProvider } from 'styled-components';
import MenuPanel from './MenuPanel';
import MenuSection from './MenuSection';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import defaultTheme from '../../theme/defaultTheme';
import { buttonStyleTypes } from '../../controls/buttons/button-variants';

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
      rootClose
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <RootCloseWrapper onRootClose={this.closeMenu} disabled={!rootClose}>
          <div className={className}>
            <ToggleButton
              handleOnClick={this.toggleMenu}
              isPressed={this.state.isMenuOpen}
              styleType={openButtonType}
            >
              {buttonContent}
            </ToggleButton>
            <MenuPanel
              isOpen={this.state.isMenuOpen}
              closeFunction={this.closeMenu}
            >
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
  openButtonType: PropTypes.oneOf(buttonStyleTypes),
  className: PropTypes.string,
  rootClose: PropTypes.bool,
  inline: PropTypes.bool,
  theme: PropTypes.object
};

Menu.defaultProps = {
  theme: defaultTheme,
  rootClose: false,
  openButtonType: 'default'
};

export default Menu;
