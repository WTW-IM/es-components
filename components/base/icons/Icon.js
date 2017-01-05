/* eslint-disable no-use-before-define */
import React from 'react';
import classnames from 'classnames';

import './oe-icons.less';

Icon.propTypes = {
  /**
   * CSS classes to apply
   */
  className: React.PropTypes.string,
  /**
   * Name of the icon to display
   */
  name: React.PropTypes.string.isRequired,
  /**
   * Specify icon size.
   */
  size: React.PropTypes.oneOf([16, 18, 24, 48]),
  /**
   * Icon is white.
   */
  white: React.PropTypes.bool
};

export default function Icon({ className, name, size, white, ...other }) {
  const classes = classnames(
    className,
    `oe-icon-${name}`,
    `size-${size}`,
    { ['icon-white']: white }
  );
  return <i className={classes} {...other} />;
}
