import React, { Children, Component, cloneElement } from 'react';
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

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.defaultSelected,
      defaultSelected: props.defaultSelected
    };
  }

  onNavClick = (navId = null) => {
    const { onItemSelected = noop } = this.props;

    if (this.state.defaultSelected) {
      this.setState({ selected: navId }, () => {
        onItemSelected(navId);
      });
    } else {
      onItemSelected(navId);
    }
  };

  render() {
    const { altStyle, children, selected } = this.props;
    return (
      <NavStyled>
        <ul>
          {Children.toArray(children).map(child => {
            if (child !== null && child.type === NavItem) {
              const currentSelected = this.state.defaultSelected
                ? this.state.selected
                : selected;
              return cloneElement(child, {
                altStyle,
                highlightedId: currentSelected,
                onClick: this.onNavClick
              });
            }
            return child;
          })}
        </ul>
      </NavStyled>
    );
  }
}

SideNav.propTypes = {
  /** Use the alternate nav style */
  altStyle: PropTypes.bool,
  children: PropTypes.node,
  /** Use to manually select nav item by id, stateless mode */
  selected: PropTypes.string,
  /** Use to set a default nav, stateful mode */
  defaultSelected: PropTypes.string,
  /** Function called when a nav item is clicked */
  onItemSelected: PropTypes.func
};

SideNav.Item = NavItem;

export default SideNav;
