import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../base/icons/Icon';

function Breadcrumb({ children, ...props }) {
  return (
    <div {...props}>
      {React.Children.map(children, (child, i) => (
        <span key={child.props.name}>
          {i > 0 && <Icon name="chevron-right" />}
          {child}
        </span>
      ))}
    </div>
  );
}

Breadcrumb.propTypes = {
  children: (props, propName, component) => {
    if (
      PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
      ])
    ) {
      return props[propName].every(child => child.props.name)
        ? null
        : new Error('The children must have a name attribute');
    }
    return new Error(
      'Please use an element as a child, and ensure the child has a name property'
    );
  }
};

export default Breadcrumb;
