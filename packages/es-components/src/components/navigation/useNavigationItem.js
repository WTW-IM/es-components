import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Icon from '../base/icons/Icon';

const NavItemWrapper = styled.li`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  cursor: pointer;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  min-width: 75px;
  padding: 0;

  &:hover {
    background-color: ${props => props.theme.colors.gray2};
    color: ${props => props.theme.colors.primary};

    > i {
      color: ${props => props.theme.colors.primary};
    }
  }

  ${props =>
    props.isActive &&
    css`
      background-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.white};

      &:hover {
        background-color: ${props.theme.colors.primary};
        color: ${props.theme.colors.white};

        > i {
          color: ${props.theme.colors.white};
        }
      }
    `} ${props =>
    props.isDisabled &&
    css`
      background-color: ${props.theme.colors.gray1};
      color: ${props.theme.colors.gray6};
      cursor: not-allowed;

      > span {
        pointer-events: none;
      }

      > i {
        color: ${props.theme.colors.gray1};
      }

      &:hover {
        background-color: ${props.theme.colors.gray1};
        color: ${props.theme.colors.gray6};

        > i {
          color: ${props.theme.colors.gray1};
        }
      }
    `};
`;

const AltNavItemWrapper = styled(NavItemWrapper)`
  border-bottom: ${props =>
    props.isVertical ? 'none' : '2px solid'} ${props =>
  props.theme.colors.gray5};
  padding-left: ${props => (props.isVertical ? '4px' : '0')};

  &:hover {
    border-${props =>
      props.isVertical ? 'left' : 'bottom'}: 4px solid ${props =>
  props.theme.colors.primary};
    padding-left: 0;
  }

  ${props =>
    props.isActive &&
    css`
      background-color: ${props.theme.colors.gray1};
      border-${props.isVertical ? 'left' : 'bottom'}: 4px solid ${
      props.theme.brandColors.primary3
    };
      color: ${props.theme.colors.black};
      padding-left: 0;

      > i {
        color: ${props.theme.brandColors.primary3};
      }

      &:hover {
        background-color: ${props.theme.colors.gray1};
        border-${props.isVertical ? 'left' : 'bottom'}: 4px solid ${
      props.theme.brandColors.primary3
    };
        color: ${props.theme.colors.black};

        > i {
          color: ${props.theme.brandColors.primary3};
        }
      }
    `} ${props =>
  props.isDisabled &&
  css`
    padding-left: 0;

    &:hover {
      border-left: none;
    }
  `};
`;

const NavIcon = styled(Icon)`
  align-self: flex-end;
`;

const NavigationAnchor = styled.a`
  align-content: center;
  background-color: transparent;
  box-sizing: border-box;
  border: 0;
  color: inherit;
  cursor: inherit;
  display: flex;
  font-size: inherit;
  height: 100%;
  padding: 10px;
  text-decoration: none;
  width: 100%;
`;

export function useNavigationItem(orientation) {
  function NavItem(props) {
    const { highlightedId, id, isDisabled, useAltStyle, children } = props;

    const isActive = id === highlightedId;
    const Wrapper = useAltStyle ? AltNavItemWrapper : NavItemWrapper;
    const isVertical = orientation === 'vertical';

    const child = React.Children.only(children);
    const { children: grandChildren, ...rest } = child.props;
    const styledChild = (
      <NavigationAnchor
        as={child.type}
        style={{ justifyContent: isVertical ? 'space-between' : 'center' }}
        {...rest}
      >
        <span>{grandChildren}</span>
        {isVertical ? <NavIcon name="chevron-right" /> : null}
      </NavigationAnchor>
    );

    return (
      <Wrapper
        className="es-sidenav__navitem"
        isActive={isActive}
        isDisabled={isDisabled}
        isVertical={isVertical}
      >
        {styledChild}
      </Wrapper>
    );
  }

  NavItem.propTypes = {
    /** @ignore */
    useAltStyle: PropTypes.bool,
    /** Item content */
    children: PropTypes.any,
    /** @ignore */
    highlightedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Each item must have a unique identifier */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Disable the nav item to render it un-clickable */
    isDisabled: PropTypes.bool
  };

  NavItem.defaultProps = {
    useAltStyle: false,
    isDisabled: false,
    children: undefined,
    highlightedId: undefined
  };

  return NavItem;
}
