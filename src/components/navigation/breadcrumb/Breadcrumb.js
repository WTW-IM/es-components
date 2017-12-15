import React from 'react';
import Icon from '../../base/icons/Icon';
import PropTypes from 'prop-types';

function Breadcrumb({ name, children, ...props }) {
  return (
    <div {...props}>
      {React.Children.map(children, (child, i) => (
        <span key={`${name}-item${i}`}>
          {i > 0 && <Icon name="chevron-right" />}
          {child}
        </span>
      ))}
    </div>
  );
}

Breadcrumb.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Breadcrumb;
