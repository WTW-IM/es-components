import React from 'react';
import classnames from 'classnames';

export default function Icon({className, name, size, ...other}) {
  var classes = classnames(className, `oe-icon-${name}`, `size-${size}`);
  return <i className={classes} {...other} />;
}
