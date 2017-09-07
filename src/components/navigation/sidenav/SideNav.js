import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import styled from 'styled-components';
import { noop } from 'lodash';

import NavItem from './NavItem';

const NavStyled = styled.nav`
  background-color: ${colors.white};
  box-shadow: 2px 2px 5px ${colors.grayDark};

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const SideNav = props => {
  const { altStyle, children, onItemSelected, selected } = props;

  const onNavClick = (navId = null) => {
    onItemSelected(navId);
  };

  return (
    <NavStyled>
      <ul>
        {Children.toArray(children).map(child => {
          if (child !== null && child.type === NavItem) {
            const currentSelected = selected;
            return cloneElement(child, {
              altStyle,
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
  altStyle: PropTypes.bool,
  children: PropTypes.node,
  /** Use to manually select nav item by id, controlled mode */
  selected: PropTypes.string,
  /** Use to set a default nav, uncontrolled mode */
  defaultSelected: PropTypes.string,
  /** Function called when a nav item is clicked */
  onItemSelected: PropTypes.func
};

SideNav.defaultProps = {
  altStyle: false,
  onItemSelected: noop
};

SideNav.Item = NavItem;

export default SideNav;
