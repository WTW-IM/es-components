import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import { regular } from './icon-definitions';

const StyledIcon = styled.i`
  display: inline-block;
  font-family: ${props => props.fontFamily} !important;
  font-size: ${props => props.fontSize};
  font-style: normal;
  font-weight: inherit;
  font-variant: normal;
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

function Icon({ className, name, size, ...other }) {
  const styledIconProps = {};

  styledIconProps.fontFamily = 'indv-mkt-icons';
  styledIconProps.iconDefinition = `im-icon-${name}`;
  styledIconProps.content = regular[styledIconProps.iconDefinition];
  styledIconProps.fontSize = size !== undefined ? `${size}px` : 'inherit';

  return (
    <StyledIcon
      aria-hidden
      className={classnames('es-icon', className)}
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
  size: PropTypes.number
};

Icon.defaultProps = {
  className: null,
  size: undefined
};

export default Icon;
