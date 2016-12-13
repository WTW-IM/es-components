/* eslint-disable no-use-before-define */
import React from 'react';
import classnames from 'classnames';

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
  size: React.PropTypes.oneOf([24, 34, 48])
};

export default function Icon({ className, name, size, ...other }) {
  const classes = classnames(className, `oe-icon-${name}`, `size-${size}`);
  return <i className={classes} {...other} />;
}
