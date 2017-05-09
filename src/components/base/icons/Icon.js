import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { regular, light } from './icon-definitions';

const StyledIcon = styled.i`
  display: inline-block;
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  font-style: normal;
  font-weight: inherit;
  font-variant: normal;
  line-height: 1;
  text-decoration: none;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: text-bottom;

  &:before {
    content: "\\e${props => props.content}";
  }
`;

function Icon({ className, name, size, lightweight = false, ...other }) {
  const styledIconProps = {};

  if (lightweight) {
    styledIconProps.fontFamily = 'oe-icons-light';
    styledIconProps.iconDefinition = `oe-icon-lt-${name}`;
    styledIconProps.content = light[styledIconProps.iconDefinition];
  } else {
    styledIconProps.fontFamily = 'oecom-icons';
    styledIconProps.iconDefinition = `oe-icon-${name}`;
    styledIconProps.content = regular[styledIconProps.iconDefinition];
  }

  styledIconProps.fontSize = size !== undefined ? `${size}px` : 'inherit';

  return (
    <StyledIcon
      aria-hidden
      className={className}
      {...styledIconProps}
      {...other}
    />
  );
}

Icon.propTypes = {
  /** CSS classes to apply */
  className: PropTypes.string,
  /** Name of the icon to display */
  name: PropTypes.string.isRequired,
  /** Specify icon size in pixels */
  size: PropTypes.number,
  /** Use the lightweight icon font */
  lightweight: PropTypes.bool
};

export default Icon;
