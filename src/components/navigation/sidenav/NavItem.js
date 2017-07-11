import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import styled, { css } from 'styled-components';
import { noop } from 'lodash';
import Icon from '../../base/icons/Icon';

const AnchorBase = styled.a`
  background-color: ${colors.white};
  color: ${colors.black};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
  text-decoration: none;

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

    &:hover {
      background-color: ${colors.accent};
      color: ${colors.white};

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

    i {
      color: ${colors.grayLightest};
    }

    &:hover {
      background-color: ${colors.grayLightest};
      color: ${colors.grayDark};

      i {
        color: ${colors.grayLightest};
      }
    }
  `}
`;

const AnchorAltStyle = AnchorBase.extend`
  &:hover {
    border-left: 4px solid ${colors.accent};
    padding-left: 6px;
  }

  ${props => props.isActive && css`
    background-color: ${colors.grayLight};
    border-left: 4px solid ${colors.accent};
    color: ${colors.accent};
    padding-left: 6px;

    i {
      color: ${colors.accent};
    }

    &:hover {
      background-color: ${colors.grayLight};
      color: ${colors.accent};

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
      className,
      highlightedId,
      id,
      isDisabled,
      isExternalLink,
      onNavClick = noop,
      targetUrl
    } = this.props;

    const AnchorStyled = altStyle ? AnchorAltStyle : AnchorBase;
    const href = targetUrl || '#/';
    const openExternal = targetUrl && isExternalLink;

    const itemProps = {
      className,
      href,
      isActive: id === highlightedId,
      isDisabled,
      onClick: isDisabled ? noop : this.onNavItemClicked,
      onNavClick,
      ...(openExternal && { target: '_blank' })
    };

    return (
      <li>
        <AnchorStyled {...itemProps}>
          <FlexSpan>{children}</FlexSpan>
          <Icon name="chevron-right" />
        </AnchorStyled>
      </li>
    );
  }
}

NavItem.propTypes = {
  /** @ignore */
  altStyle: PropTypes.bool,
  /** Item content */
  children: PropTypes.any,
  /** Additional CSS classes to apply */
  className: PropTypes.string,
  /** @ignore */
  highlightedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Each item must have a unique identifier */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Disable the nav item to render it un-clickable */
  isDisabled: PropTypes.bool,
  /** @ignore */
  isHighlighted: PropTypes.bool,
  /** @ignore */
  onClick: PropTypes.func,
  /** Used to assign an onClick event */
  onNavClick: PropTypes.func,
  /** Sets the link to open in a new browser window */
  isExternalLink: PropTypes.bool,
  /** Set the href target for the link */
  targetUrl: PropTypes.string
};

NavItem.defaultProps = {
  isDisabled: false,
  isExternalLink: false,
  onNavClick: noop
};

export default NavItem;
