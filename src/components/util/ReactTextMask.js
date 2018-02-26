import React from 'react';
import ReactTextMask from 'react-text-mask';

// the component was using onInput which made testing more difficult.
// switched to onChange and put in a pull request so hopefully we can
// get rid of this soon.
ReactTextMask.prototype.render = function render() {
  const props = { ...this.props };

  delete props.mask;
  delete props.guide;
  delete props.pipe;
  delete props.placeholderChar;
  delete props.keepCharPositions;
  delete props.onChange;
  delete props.value;
  delete props.showMask;

  /* eslint-disable jsx-a11y/use-onblur-not-onchange */
  return (
    <input
      {...props}
      onChange={event => this.onChange(event)}
      defaultValue={this.props.value}
      ref={inputElement => (this.inputElement = inputElement)}
    />
    /* eslint-enable */
  );
};

export default ReactTextMask;
