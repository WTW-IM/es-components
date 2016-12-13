import React from 'react';
import classnames from 'classnames';

Icon.propTypes = {
  /**
   * Name of the icon to display
   */
  name: React.PropTypes.string.isRequired
};

export default function Icon({className, name, size, ...other}) {
  var classes = classnames(className, `oe-icon-${name}`, `size-${size}`);
  return <i className={classes} {...other} />;
}
