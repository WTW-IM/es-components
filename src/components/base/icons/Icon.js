/* eslint-disable no-use-before-define */
import React from 'react';
import classnames from 'classnames';

import './oe-icons.less';

Icon.propTypes = {
  /** CSS classes to apply */
  className: React.PropTypes.string,
  /** Name of the icon to display */
  name: React.PropTypes.string.isRequired,
  /** Specify icon size. */
  size: React.PropTypes.oneOf([16, 18, 24, 48]).isRequired,
  /** Use the lightweight icon font */
  lightweight: React.PropTypes.bool
};

export default function Icon({ className, name, size, lightweight, ...other }) {
  const classes = classnames({
    [`oe-icon-${name}`]: !lightweight,
    [`oe-icon-lt-${name}`]: lightweight
  }, className, `size-${size}`);
  return <i aria-hidden className={classes} {...other} />;
}
