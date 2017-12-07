import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbAction from './BreadcrumbAction';
import Icon from '../../base/icons/Icon';

function Breadcrumb({ breadcrumbClasses, ...props }) {
  const children = props.children;

  return (
        <div className={breadcrumbClasses}>
            {React.Children.map(children, (child, i) => (
                <span>
                    {i > 0 ? <Icon name="chevron-right" /> : ''}
                    {child}
                </span>
            ))}
        </div>
    );
}

Breadcrumb.propTypes = {
  breadcrumbClasses: PropTypes.string,
  children: PropTypes.node.isRequired
};

Breadcrumb.BreadcrumbAction = BreadcrumbAction;

export default Breadcrumb;
