import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

interface NavigationProps {
  useAltStyle?: boolean;
  children: React.ReactNode;
  selected: string;
  [others: string]: string | boolean | React.ReactNode;
}

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

export function useNavigation(orientation: string) {
  const OrientedNavigation =
    orientation === 'horizontal' ? HorizontalNavigation : VerticalNavigation;

  function Navigation(props: NavigationProps) {
    const { useAltStyle, children } = props;

    const [selected, setSelected] = React.useState(props.selected);

    React.useEffect(() => {
      setSelected(props.selected);
    }, [props.selected]);

    const mappingFunction = (child: React.ReactNode) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      return React.cloneElement(child as React.ReactElement, {
        useAltStyle,
        highlightedId: selected
      });
    };

    return (
      <OrientedNavigation className="es-sidenav">
        <ul>{React.Children.map(children, mappingFunction)}</ul>
      </OrientedNavigation>
    );
  }

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

  return Navigation;
}
