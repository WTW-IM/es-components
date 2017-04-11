import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './containers.less';

function FormGroup({
  hasError,
  inline,
  children
}) {
  const formClass = inline ? 'form-group-inline' : 'form-group';
  const classes = classNames(formClass, { error: hasError });

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

FormGroup.propTypes = {
   /**
    * Should render in an error state
    */
  hasError: PropTypes.bool,
  /**
   * Should the child elements render line
   */
  inline: PropTypes.bool,
  children: PropTypes.element
};

FormGroup.defaultProps = {
  hasError: false,
  inline: false
};

export default FormGroup;
