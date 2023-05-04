import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import inputMaskType from './inputMaskType';
import Textbox from './Textbox';

export function MaskedTextboxComponent(props, ref) {
  const { maskType, customMask, ...additionalTextProps } = props;
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
      {...additionalTextProps}
    />
  );
}

MaskedTextboxComponent.propTypes = {
  /** Sets a mask type on the input */
  maskType: PropTypes.oneOf([
    'date',
    'dollar',
    'phone',
    'ssnum',
    'zip',
    'custom'
  ]).isRequired,
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

MaskedTextboxComponent.defaultProps = {
  customMask: undefined
};

const MaskedTextbox = React.forwardRef(MaskedTextboxComponent);
export default MaskedTextbox;
