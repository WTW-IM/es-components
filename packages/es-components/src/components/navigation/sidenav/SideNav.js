/* eslint react/no-unused-prop-types: 0 */
/* ^^^ This is because defaultSelected needs to be defined to be documented */
/* The behavior of defaultSelected is implemented in the Uncontrollable library */

import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { noop } from 'lodash';
import uncontrollable from 'uncontrollable';

import NavItem from './NavItem';

const NavStyled = styled.nav`
  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 2px 5px ${props => props.theme.colors.gray6};

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const SideNav = props => {
  const { useAltStyle, children, onItemSelected, selected } = props;

  const onNavClick = (navId = null) => {
    onItemSelected(navId);
  };

  return (
    <NavStyled className="es-sidenav">
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
  onItemSelected: PropTypes.func
};

SideNav.defaultProps = {
  useAltStyle: false,
  onItemSelected: noop,
  children: undefined,
  selected: undefined,
  defaultSelected: undefined
};

const UncontrolledSideNav = uncontrollable(SideNav, {
  selected: 'onItemSelected'
});

UncontrolledSideNav.Item = NavItem;

export default withTheme(UncontrolledSideNav);
