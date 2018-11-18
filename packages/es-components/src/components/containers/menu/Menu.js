import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import ToggleButton from '../../controls/buttons/ToggleButton';
import MenuPanel from './MenuPanel';
import MenuSection from './MenuSection';
import { InlineContext } from './InlineContext';

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

function Menu(props) {
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
    className,
    openButtonType,
    rootClose,
    hasBackdrop,
    headerContent
  } = props;

  return (
    <RootCloseWrapper onRootClose={closeMenu} disabled={!rootClose}>
      <div className={classnames('es-menu', className)}>
        {hasBackdrop && (
          <Backdrop
            className="es-menu__backdrop"
            isMenuOpen={isMenuOpen}
            onClick={closeMenu}
          />
        )}
        <ToggleButton
          handleOnClick={toggleMenu}
          isPressed={isMenuOpen}
          styleType={openButtonType}
          aria-expanded={isMenuOpen}
        >
          {buttonContent}
        </ToggleButton>
        <InlineContext.Provider value={inline}>
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
  className: PropTypes.string,
  rootClose: PropTypes.bool,
  inline: PropTypes.bool,
  hasBackdrop: PropTypes.bool,
  headerContent: PropTypes.node
};

Menu.defaultProps = {
  rootClose: false,
  openButtonType: 'default',
  className: undefined,
  inline: false,
  hasBackdrop: false,
  headerContent: undefined
};

export default Menu;
