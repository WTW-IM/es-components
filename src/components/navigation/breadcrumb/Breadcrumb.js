import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../base/icons/Icon';

function Breadcrumb({ children, ...props }) {
  return (
    <div {...props}>
      {React.Children.map(children, (child, i) => (
        <span key={name}>
          {i > 0 && <Icon name="chevron-right" />}
          {child}
        </span>
      ))}
    </div>
  );
}

Breadcrumb.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default Breadcrumb;
