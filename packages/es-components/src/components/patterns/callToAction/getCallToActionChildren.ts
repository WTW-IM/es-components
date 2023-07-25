import React, { isValidElement } from 'react';
import { ActionProps } from './Action';

export function getCallToActionChildren(
  children: React.ReactNode,
  type = 'default'
) {
  const allChildren = React.Children.toArray(children);
  const actionChildren = allChildren
    .filter(isValidElement)
    .filter<React.ReactElement<ActionProps>>(
      (child): child is React.ReactElement<ActionProps> =>
        (child.type as Exclude<typeof child.type, string>).name === 'Action'
    );

  const actions = actionChildren.map(action => {
    if (type === 'light') {
      const styleType = action.props.isPrimary ? 'primary' : 'darkDefault';
      return React.cloneElement(action, { ...action.props, styleType });
    }
    const styleType = action.props.isPrimary ? 'primary' : 'default';
    return React.cloneElement(action, { styleType });
  });

  const nonActions = allChildren.filter(
    child => !(actionChildren as React.ReactNode[]).includes(child)
  );

  return {
    actions,
    nonActions
  };
}
