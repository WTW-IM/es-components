import FocusTrap from 'focus-trap-react';

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

export default FocusTrap;
