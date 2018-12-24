/* eslint react/no-unused-prop-types: 0 */
/* ^^^ This is because defaultSelected needs to be defined to be documented */
/* The behavior of defaultSelected is implemented in the Uncontrollable library */

import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { noop } from 'lodash';
import uncontrollable from 'uncontrollable';

import { HorizontalNavItem } from './HorizontalNavItem';

const NavStyled = styled.nav`
  background-color: ${props => props.theme.colors.white};
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export function HorizontalNav(props) {
  const { useAltStyle, children, onItemSelected, selected } = props;

  const onNavClick = (navId = null) => {
    onItemSelected(navId);
  };

  return (
    <NavStyled className="es-horizontalnav">
      <ul>
        {Children.toArray(children).map(child => {
          if (child !== null && child.type === HorizontalNavItem) {
            return cloneElement(child, {
              useAltStyle,
              highlightedId: selected,
              onNavClick
            });
          }
          return child;
        })}
      </ul>
    </NavStyled>
  );
}

HorizontalNav.propTypes = {
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

HorizontalNav.defaultProps = {
  useAltStyle: false,
  onItemSelected: noop,
  children: undefined,
  selected: undefined,
  defaultSelected: undefined
};

const UncontrolledHorizontalNav = uncontrollable(HorizontalNav, {
  selected: 'onItemSelected'
});

UncontrolledHorizontalNav.Item = HorizontalNavItem;

export default withTheme(UncontrolledHorizontalNav);
