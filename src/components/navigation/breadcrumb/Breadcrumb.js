import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import tinycolor from 'tinycolor2';
import genId from '../../util/generateAlphaName';
import defaultTheme from '../../theme/defaultTheme';

const OrderedList = styled.ol`
  background-color: ${props => props.theme.colors.grayLightest};
  border-radius: 2px;
  line-height: 1.4;
  list-style: none;
  margin-bottom: 25px;
  margin-top: 0;
  padding: 8px 15px;

  > li > a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }

  > li > a:hover {
    color: ${props =>
      tinycolor(props.theme.colors.primary)
        .darken(15)
        .toRgbString()};
    text-decoration: underline;
  }

  > li + li {
    padding-left: 1.4em;

    &::before {
      border-color: ${props => props.theme.colors.gray};
      border-style: solid;
      border-width: 0 2px 2px 0;
      content: '';
      display: block;
      height: 13px;
      left: 0px;
      position: absolute;
      top: 20%;
      transform: rotate(-45deg);
      width: 13px;
    }
  }
`;

const Crumb = styled.li`
  color: ${props => props.theme.colors.accent};
  display: inline-block;
  position: relative;
`;

function Breadcrumb({ children, ...props }) {
  return (
    <ThemeProvider theme={props.theme}>
      <OrderedList {...props}>
        {React.Children.map(children, child => (
          <Crumb key={genId()}>{child}</Crumb>
        ))}
      </OrderedList>
    </ThemeProvider>
  );
}

Breadcrumb.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object
};

Breadcrumb.defaultProps = {
  theme: defaultTheme
};

export default Breadcrumb;
