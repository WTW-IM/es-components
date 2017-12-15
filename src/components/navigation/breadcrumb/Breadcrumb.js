import React from 'react';
import Icon from '../../base/icons/Icon';
import PropTypes from 'prop-types';

function Breadcrumb({ keySelector, children, ...props }) {
  return (
    <div {...props}>
      {React.Children.map(children, (child, i) => (
        <span key={keySelector(child)}>
          {i > 0 && <Icon name="chevron-right" />}
          {child}
        </span>
      ))}
    </div>
  );
}

Breadcrumb.propTypes = {
  keySelector: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Breadcrumb;
