import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Icon from '../base/icons/Icon';
import type { NavOrientation } from './Navigation';

type NavItemProps = {
  $isActive?: boolean;
  $isDisabled?: boolean;
  $isVertical?: boolean;
};

const NavItemWrapper = styled.li<NavItemProps>`
  ${({ $isActive, $isDisabled, theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    cursor: pointer;
    line-height: ${theme.font.baseLineHeight};
    min-width: 75px;
    padding: 0;

    &:hover {
      background-color: ${theme.colors.gray2};
      color: ${theme.colors.primary};

      > i {
        color: ${theme.colors.primary};
      }
    }

    ${$isActive &&
    css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};

      &:hover {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};

        > i {
          color: ${theme.colors.white};
        }
      }
    `} ${$isDisabled &&
    css`
      background-color: ${theme.colors.gray1};
      color: ${theme.colors.gray6};
      cursor: not-allowed;

      > span {
        pointer-events: none;
      }

      > i {
        color: ${theme.colors.gray1};
      }

      &:hover {
        background-color: ${theme.colors.gray1};
        color: ${theme.colors.gray6};

        > i {
          color: ${theme.colors.gray1};
        }
      }
    `};
  `}
`;

const AltNavItemWrapper = styled(NavItemWrapper)<NavItemProps>`
  border-bottom: ${props =>
    props.$isVertical ? 'none' : '2px solid'} ${props =>
    props.theme.colors.gray5};
  padding-left: ${props => (props.$isVertical ? '4px' : '0')};

  &:hover {
    padding-left: 0;
    border-${props =>
      props.$isVertical ? 'left' : 'bottom'}: 4px solid ${props =>
      props.theme.colors.primary};
  }

  ${props =>
    props.$isActive &&
    css`
      padding-left: 0;
      background-color: ${props.theme.colors.gray1};
      border-${props.$isVertical ? 'left' : 'bottom'}: 4px solid ${
        props.theme.brandColors.primary3
      };

      color: ${props.theme.colors.black};

      > i {
        color: ${props.theme.brandColors.primary3};
      }

      &:hover {
        background-color: ${props.theme.colors.gray1};
        border-${props.$isVertical ? 'left' : 'bottom'}: 4px solid ${
          props.theme.brandColors.primary3
        };

        color: ${props.theme.colors.black};

        > i {
          color: ${props.theme.brandColors.primary3};
        }
      }
    `} ${props =>
    props.$isDisabled &&
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
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  align-content: center;
  padding: 10px;
  border: 0;
  background-color: transparent;
  color: inherit;
  cursor: inherit;
  font-size: inherit;
  text-decoration: none;

  &:hover,
  &:focus,
  &:active,
  &:visited {
    color: inherit;
  }
`;

export type NavigationItemProps = Override<
  JSXElementProps<'li'>,
  {
    id: string | number;
    highlightedId?: string | number;
    isDisabled?: boolean;
    useAltStyle?: boolean;
    navOrientation?: NavOrientation;
  }
>;

export const NavigationItem = React.forwardRef<
  HTMLLIElement,
  NavigationItemProps
>(function NavigationItem(
  {
    highlightedId,
    id,
    isDisabled,
    useAltStyle,
    children,
    navOrientation,
    ...props
  },
  ref
) {
  const isActive = id === highlightedId;
  const Wrapper = useAltStyle ? AltNavItemWrapper : NavItemWrapper;
  const isVertical = navOrientation === 'vertical';
  const disabledClick = useCallback<React.MouseEventHandler<HTMLLIElement>>(
    ev => {
      ev.preventDefault();
      ev.stopPropagation();
    },
    []
  );

  const child = React.Children.only(children);

  const isElement =
    React.isValidElement<React.PropsWithChildren<unknown>>(child);

  const { children: grandChildren, ...rest } = isElement
    ? child.props
    : ({} as React.PropsWithChildren<unknown>);
  const styledChild = isElement ? (
    <NavigationAnchor
      as={child.type}
      style={{ justifyContent: isVertical ? 'space-between' : 'center' }}
      {...rest}
    >
      <span>{grandChildren}</span>
      {isVertical ? <NavIcon name="chevron-right" /> : null}
    </NavigationAnchor>
  ) : (
    child
  );

  const className = `es-sidenav__navitem ${props.className || ''}`;

  const wrapperProps = {
    ...props,
    onClick: isDisabled ? disabledClick : props.onClick,
    className
  };

  return (
    <Wrapper
      ref={ref}
      {...wrapperProps}
      $isActive={isActive}
      $isDisabled={isDisabled}
      $isVertical={isVertical}
    >
      {styledChild}
    </Wrapper>
  );
});

NavigationItem.propTypes = {
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

NavigationItem.defaultProps = {
  useAltStyle: false,
  isDisabled: false,
  children: undefined,
  highlightedId: undefined
};
