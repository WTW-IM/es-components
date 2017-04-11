import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { regular, light } from './icon-definitions';

function Icon({
  className,
  name,
  size,
  lightweight = false,
  ...other
}) {
  let fontFamily;
  let iconDefinition;
  let content;

  if (lightweight) {
    fontFamily = 'oe-icons-light';
    iconDefinition = `oe-icon-lt-${name}`;
    content = light[iconDefinition];
  } else {
    fontFamily = 'oecom-icons';
    iconDefinition = `oe-icon-${name}`;
    content = regular[iconDefinition];
  }

  const fontSize = size !== undefined ? `${size}px` : 'inherit';

  const StyledIcon = styled.i`
    display: inline-block;
    font-family: ${fontFamily};
    font-size: ${fontSize};
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    line-height: 1;
    text-decoration: none;
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: text-bottom;

    &:before {
      content: "\\e${content}";
    }
  `;

  return <StyledIcon aria-hidden className={className} {...other} />;
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
