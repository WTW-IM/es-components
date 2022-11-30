import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ToggleButton from '../../controls/buttons/ToggleButton';
import MenuPanel from './MenuPanel';
import MenuSection, { MenuSectionProps } from './MenuSection';
import { InlineContext } from './InlineContext';
import RootCloseWrapper from '../../util/RootCloseWrapper';

type BackdropProps = {
  isMenuOpen: boolean;
};

const Backdrop = styled.div<BackdropProps>`
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

function Menu(props: MenuSectionProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  const {
    inline,
    children,
    buttonContent,
    openButtonType,
    rootClose,
    hasBackdrop,
    headerContent,
    ...other
  } = props;

  return (
    <RootCloseWrapper onRootClose={closeMenu} disabled={!rootClose}>
      <div {...other}>
        {hasBackdrop && (
          <Backdrop isMenuOpen={isMenuOpen} onClick={closeMenu} />
        )}
        <ToggleButton
          onClick={toggleMenu}
          isPressed={isMenuOpen}
          styleType={openButtonType}
          aria-expanded={isMenuOpen}
        >
          {buttonContent}
        </ToggleButton>
        <InlineContext.Provider value={Boolean(inline)}>
          <MenuPanel
            headerContent={headerContent}
            isOpen={isMenuOpen}
            onClose={closeMenu}
          >
            {children}
          </MenuPanel>
        </InlineContext.Provider>
      </div>
    </RootCloseWrapper>
  );
}

Menu.MenuSection = MenuSection;

Menu.propTypes = {
  children: PropTypes.any.isRequired,
  buttonContent: PropTypes.any.isRequired,
  openButtonType: PropTypes.string,
  rootClose: PropTypes.bool,
  inline: PropTypes.bool,
  hasBackdrop: PropTypes.bool,
  headerContent: PropTypes.node
};

Menu.defaultProps = {
  rootClose: false,
  openButtonType: 'default',
  inline: false,
  hasBackdrop: false,
  headerContent: undefined
};

export default Menu;
