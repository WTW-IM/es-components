import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import inputMaskType from './inputMaskType';
import Textbox from './Textbox';

const MaskedTextbox = React.forwardRef(function MaskedTextbox(props, ref) {
  const { maskType, customMask, inputMode, pattern, ...additionalTextProps } = props;
  const inputRef = React.useRef();
  React.useImperativeHandle(ref, () => inputRef.current);

  const maskArgs =
    maskType === 'custom' && customMask ? customMask : inputMaskType[maskType];

  return (
    <MaskedInput
      render={(maskRef, textboxProps) => {
        const setRef = inputElement => {
          // we need to set both the mask ref and the passed in ref
          maskRef(inputElement);
          inputRef.current = inputElement;
        };
        return <Textbox ref={setRef} {...textboxProps} />;
      }}
      {...maskArgs}
      type="text"
      inputmode={inputMode}
      pattern={pattern}
      {...additionalTextProps}
    />
  );
});

MaskedTextbox.propTypes = {
  /** Sets a mask type on the input */
  maskType: PropTypes.oneOf([
    'date',
    'dollar',
    'phone',
    'ssnum',
    'zip',
    'custom'
  ]).isRequired,
  inputMode: PropTypes.string,
  pattern: PropTypes.string,
  /** Provide a custom mask */
  customMask: PropTypes.shape({
    mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    guide: PropTypes.bool,
    placeholderChar: PropTypes.string,
    keepCharPositions: PropTypes.bool,
    pipe: PropTypes.func,
    showMask: PropTypes.bool
  })
};

MaskedTextbox.defaultProps = {
  customMask: undefined,
  inputMode: undefined,
  pattern: undefined
};

export default MaskedTextbox;
