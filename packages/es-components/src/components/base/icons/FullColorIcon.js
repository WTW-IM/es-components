import React from 'react';
import PropTypes from 'prop-types';

export default function FullColorIcon({ name, size }) {
  return (
    <div css={{ width: size, height: size }}>
      <img src={`http://127.0.0.1:8081/${name}.svg`} alt={`${name} icon `} />
    </div>
  );
}

FullColorIcon.propTypes = {
  /** Name of the icon to display */
  name: PropTypes.string.isRequired,
  /** Specify icon size in pixels */
  size: PropTypes.number
};

FullColorIcon.defaultProps = {
  size: undefined
};
