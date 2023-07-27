import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ToggleButton from '../../controls/buttons/ToggleButton';
import MenuPanel from './MenuPanel';
import MenuSection from './MenuSection';
import { InlineContext } from './InlineContext';
import RootCloseWrapper from '../../util/RootCloseWrapper';
import {
  buttonVariantStyleTypes,
  ButtonVariantStyleType
} from 'es-components-shared-types';

const Backdrop = styled.div<{ isMenuOpen: boolean }>`
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

type MenuProps = Override<
  JSXElementProps<'div'>,
  {
    children: NonNullable<React.ReactNode>;
    buttonContent: NonNullable<React.ReactNode>;
    openButtonType?: ButtonVariantStyleType;
    rootClose?: boolean;
    inline?: boolean;
    hasBackdrop?: boolean;
    headerContent?: React.ReactNode;
  }
>;

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function ForwardedMenu(
  props,
  ref
) {
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
      <div ref={ref} {...other}>
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
});

type MenuComponent = typeof Menu & {
  MenuSection: typeof MenuSection;
};

(Menu as MenuComponent).MenuSection = MenuSection;

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  buttonContent: PropTypes.node.isRequired,
  openButtonType: PropTypes.oneOf(buttonVariantStyleTypes),
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

export default Menu as MenuComponent;
