import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import styled, { css } from 'styled-components';
import { noop } from 'lodash';
import Icon from '../../base/icons/Icon';

const NavItemBase = styled.div`
  background-color: ${colors.white};
  color: ${colors.black};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;

  a {
    color: ${colors.black};
    display: block;
    margin: -10px -30px -10px -10px;
    padding: 10px 30px 10px 10px;
    text-decoration: none;
  }

  i {
    color: ${colors.white};
  }

  &:hover {
    background-color: ${colors.grayLighter};
    color: ${colors.accent};

    a {
      color: ${colors.accent};
    }

    i {
      color: ${colors.accent};
    }
  }

  ${props => props.isActive && css`
    background-color: ${colors.accent};
    color: ${colors.white};

    a {
      color: ${colors.white};
    }

    &:hover {
      background-color: ${colors.accent};
      color: ${colors.white};

      a {
        color: ${colors.white};
      }

      i {
        color: ${colors.white};
      }
    }
  `}

  ${props => props.isDisabled && css`
    background-color: ${colors.grayLightest};
    color: ${colors.grayDark};
    cursor: not-allowed;

    span {
      pointer-events: none;
    }

    a {
      color: ${colors.grayDark};
    }

    i {
      color: ${colors.grayLightest};
    }

    &:hover {
      background-color: ${colors.grayLightest};
      color: ${colors.grayDark};

      a {
        color: ${colors.grayDark};
      }

      i {
        color: ${colors.grayLightest};
      }
    }
  `}
`;

const NavItemAltStyle = NavItemBase.extend`
  &:hover {
    border-left: 4px solid ${colors.accent};
    padding-left: 6px;
  }

  ${props => props.isActive && css`
    background-color: ${colors.grayLight};
    border-left: 4px solid ${colors.accent};
    color: ${colors.accent};
    padding-left: 6px;

    a {
      color: ${colors.accent};
    }

    i {
      color: ${colors.accent};
    }

    &:hover {
      background-color: ${colors.grayLight};
      color: ${colors.accent};

      a {
        color: ${colors.accent};
      }

      i {
        color: ${colors.accent};
      }
    }
  `}

  ${props => props.isDisabled && css`
    &:hover {
      border-left: none;
      padding-left: 10px;
    }
  `}
`;

const FlexSpan = styled.span`
  flex-grow: 1;
`;

class NavItem extends Component {
  onNavItemClicked = () => {
    const { onClick = noop, onNavClick } = this.props;
    this.setState(() => {
      onNavClick(this.props.id, null);
      onClick(this.props.id, null);
    });
  };

  render() {
    const {
      altStyle = false,
      children,
      highlightedId,
      id,
      isDisabled,
      onNavClick = noop
    } = this.props;

    const NavItemStyled = altStyle ? NavItemAltStyle : NavItemBase;

    const itemProps = {
      onClick: isDisabled ? noop : this.onNavItemClicked,
      onNavClick,
      isActive: id === highlightedId,
      isDisabled
    };

    return (
      <li>
        <NavItemStyled {...itemProps}>
          <FlexSpan>{children}</FlexSpan>
          <Icon name="chevron-right" />
        </NavItemStyled>
      </li>
    );
  }
}

NavItem.propTypes = {
  altStyle: PropTypes.bool,
  children: PropTypes.node,
  highlightedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  isDisabled: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  onClick: PropTypes.func,
  onNavClick: PropTypes.func
};

NavItem.defaultProps = {
  onNavClick: noop
};

export default NavItem;
