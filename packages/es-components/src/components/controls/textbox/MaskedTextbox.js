import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import inputMaskType from './inputMaskType';
import Textbox from './Textbox';

function MaskedTextbox({ maskType, customMask, ...rest }) {
  const maskArgs =
    maskType === 'custom' && customMask ? customMask : inputMaskType[maskType];

  return (
    <MaskedInput
      {...maskArgs}
      render={(ref, props) => <Textbox ref={ref} {...props} {...rest} />}
    />
  );
}

MaskedTextbox.propTypes = {
  /** Sets a pre-configured mask type */
  maskType: PropTypes.oneOf([
    'none',
    'date',
    'dollar',
    'phone',
    'ssnum',
    'zip',
    'custom'
  ]),
  /** Provide a custom mask object */
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
  maskType: 'none',
  customMask: undefined
};

export default MaskedTextbox;
