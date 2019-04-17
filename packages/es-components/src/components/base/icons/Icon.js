import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { regular } from './icon-definitions';

const StyledIcon = styled.i`
  display: inline-block;
  font-family: ${props => props.fontFamily} !important;
  font-size: ${props => props.fontSize};
  font-style: normal;
  font-weight: inherit;
  font-variant: normal;
  line-height: 1;
  speak: none;
  text-decoration: none;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: text-bottom;

  &:before {
    content: "\\e${props => props.content}";
  }
`;

function Icon({ name, size, ...other }) {
  const iconName = `im-icon-${name}`;

  const styledIconProps = {
    content: regular[iconName],
    fontFamily: 'indv-mkt-icons',
    fontSize: size !== undefined ? `${size}px` : 'inherit'
  };

  return <StyledIcon aria-hidden {...styledIconProps} {...other} />;
}

Icon.propTypes = {
  /** Name of the icon to display */
  name: PropTypes.string.isRequired,
  /** Specify icon size in pixels */
  size: PropTypes.number
};

Icon.defaultProps = {
  size: undefined
};

export default Icon;
