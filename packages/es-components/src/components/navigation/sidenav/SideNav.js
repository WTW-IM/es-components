import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import { noop } from 'lodash';
import uncontrollable from 'uncontrollable';
import viaTheme from 'es-components-via-theme';

import NavItem from './NavItem';

const NavStyled = styled.nav`
  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 2px 5px ${props => props.theme.colors.grayDark};

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const SideNav = props => {
  const { useAltStyle, children, onItemSelected, selected, theme } = props;

  const onNavClick = (navId = null) => {
    onItemSelected(navId);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavStyled>
        <ul>
          {Children.toArray(children).map(child => {
            if (child !== null && child.type === NavItem) {
              const currentSelected = selected;
              return cloneElement(child, {
                useAltStyle,
                highlightedId: currentSelected,
                onNavClick
              });
            }
            return child;
          })}
        </ul>
      </NavStyled>
    </ThemeProvider>
  );
};

SideNav.propTypes = {
  /** Use the alternate nav style */
  useAltStyle: PropTypes.bool,
  children: PropTypes.node,
  /** Set the selected nav item by id, controlled mode */
  selected: PropTypes.string,
  /** Use to set a default nav, uncontrolled mode */
  defaultSelected: PropTypes.string,
  /** Function called when a nav item is clicked */
  onItemSelected: PropTypes.func,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object
};

SideNav.defaultProps = {
  useAltStyle: false,
  onItemSelected: noop,
  theme: viaTheme
};

const UncontrolledSideNav = uncontrollable(SideNav, {
  selected: 'onItemSelected'
});

UncontrolledSideNav.Item = NavItem;

export default withTheme(UncontrolledSideNav);
