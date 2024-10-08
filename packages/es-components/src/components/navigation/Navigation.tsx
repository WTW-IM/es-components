import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import type { NavigationItemProps } from './NavigationItem';

const VerticalNavigation = styled.nav`
  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 2px 5px ${props => props.theme.colors.gray6};

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const HorizontalNavigation = styled.nav`
  background-color: ${props => props.theme.colors.white};
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export type NavOrientation = 'horizontal' | 'vertical';

export type NavigationProps = Override<
  JSXElementProps<'nav'>,
  {
    navOrientation: NavOrientation;
    useAltStyle?: boolean;
    selected?: string;
  }
>;

export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  function ForwardedNavigation(
    { navOrientation, children, useAltStyle, selected: selectedProp, ...props },
    ref
  ) {
    const OrientedNavigation =
      navOrientation === 'horizontal'
        ? HorizontalNavigation
        : VerticalNavigation;

    const [selected, setSelected] = React.useState(selectedProp);

    React.useEffect(() => {
      setSelected(selectedProp);
    }, [selectedProp]);

    const className = `es-sidenav ${props.className || ''}`;
    const navProps = {
      ...props,
      className
    };

    return (
      <OrientedNavigation ref={ref} {...navProps} role="tablist">
        <ul>
          {React.Children.map(children, child =>
            React.isValidElement<NavigationItemProps>(child)
              ? React.cloneElement(child, {
                  useAltStyle,
                  highlightedId: selected,
                  role: 'tab',
                  'aria-selected': child.props.id === selected
                })
              : child
          )}
        </ul>
      </OrientedNavigation>
    );
  }
);

Navigation.propTypes = {
  /** Use the alternate nav style */
  useAltStyle: PropTypes.bool,
  children: PropTypes.node.isRequired,
  /** Set the selected nav item by id, controlled mode */
  selected: PropTypes.string
};

Navigation.defaultProps = {
  useAltStyle: false,
  selected: undefined
};
