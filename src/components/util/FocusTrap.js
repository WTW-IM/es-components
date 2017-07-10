import FocusTrap from 'focus-trap-react';
import React from 'react';

/*
  monkey-patching the FocusTrap component
  fixes a timing issue with the popover
*/
FocusTrap.prototype.componentDidMount = function componentDidMount() {
  const specifiedFocusTrapOptions = this.props.focusTrapOptions;
  const tailoredFocusTrapOptions = {
    returnFocusOnDeactivate: false
  };
  for (const optionName in specifiedFocusTrapOptions) {
    if (!specifiedFocusTrapOptions.hasOwnProperty(optionName)) continue;
    if (optionName === 'returnFocusOnDeactivate') continue;
    tailoredFocusTrapOptions[optionName] =
      specifiedFocusTrapOptions[optionName];
  }
  if (this._reactInternalInstance._hostContainerInfo._node) {
    this.setNode(this._reactInternalInstance._hostContainerInfo._node);
  }
  this.focusTrap = this.props._createFocusTrap(
    this.node,
    tailoredFocusTrapOptions
  );
  if (this.props.active) {
    setTimeout(() => {
      this.focusTrap.activate();
    }, 0);
  }
  if (this.props.paused) {
    this.focusTrap.pause();
  }
};

FocusTrap.prototype.render = function render() {
  const elementProps = {
    ref: this.setNode
  };

  const checkedProps = [
    'active',
    'paused',
    'tag',
    'focusTrapOptions',
    '_createFocusTrap'
  ];

  // This will get id, className, style, etc. -- arbitrary element props
  for (const prop in this.props) {
    if (!this.props.hasOwnProperty(prop)) continue;
    if (checkedProps.indexOf(prop) !== -1) continue;
    if (prop === 'children' || prop === 'ref') continue;
    elementProps[prop] = this.props[prop];
  }

  const childrenWithProps = React.Children.map(this.props.children, child =>
    React.cloneElement(child, elementProps)
  );

  const returnValue = React.createElement(
    this.props.tag,
    this.className,
    childrenWithProps
  );

  return returnValue;
};

export default FocusTrap;
