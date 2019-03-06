import React from 'react';

export function getCallToActionChildren(children, type = 'default') {
  const allChildren = React.Children.toArray(children);
  const actions = allChildren
    .filter(child => child.type.name === 'Action')
    .map(action => {
      if (type === 'light') {
        const styleType = action.props.isPrimary ? 'primary' : 'darkDefault';
        return React.cloneElement(action, { styleType });
      }
      const styleType = action.props.isPrimary ? 'primary' : 'default';
      return React.cloneElement(action, { styleType });
    });

  const nonActions = allChildren.filter(child => child.type.name !== 'Action');

  return {
    actions,
    nonActions
  };
}
