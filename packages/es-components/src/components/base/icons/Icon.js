import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledIcon = styled.i`
  display: inline-block;
  font-size: ${props => props.size};
  text-decoration: none;
  vertical-align: text-bottom;
`;

function Icon({ name, size, className, ...other }) {
  return (
    <StyledIcon
      className={`bds-icon bds-${name} ${className || ''}`.trim()}
      size={/^\d+$/.test(size) ? `${size}px` : size || 'inherit'}
      aria-hidden
      {...other}
    />
  );
}

Icon.propTypes = {
  /** Name of the icon to display */
  name: PropTypes.string.isRequired,
  /** Specify icon size in pixels */
  size: PropTypes.number,
  /** Additional classes to include */
  className: PropTypes.string
};

Icon.defaultProps = {
  size: undefined,
  className: undefined
};

export default Icon;
