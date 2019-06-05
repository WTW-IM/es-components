import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../base/icons/Icon';
import { Prepend, Append, InputWrapper, TextboxBase } from './TextAddons';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';

const Textbox = React.forwardRef(function Textbox(props, ref) {
  const { prependIconName, appendIconName, ...additionalTextProps } = props;
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);

  const inputRef = React.useRef();
  React.useImperativeHandle(ref, () => inputRef.current);

  const hasPrepend = !!prependIconName;
  const hasAppend = !!appendIconName;
  const hasValidationState = validationState !== 'default';

  const addOnTextColor = hasValidationState
    ? theme.colors.white
    : theme.colors.gray8;
  const addOnBgColor = hasValidationState
    ? theme.validationTextColor[validationState]
    : theme.colors.gray3;

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <InputWrapper>
      {hasPrepend && (
        <Prepend
          addOnTextColor={addOnTextColor}
          addOnBgColor={addOnBgColor}
          aria-hidden="true"
          onClick={focusInput}
        >
          <Icon aria-hidden="true" name={prependIconName} size={18} />
        </Prepend>
      )}
      <TextboxBase
        hasAppend={hasAppend}
        hasPrepend={hasPrepend}
        ref={inputRef}
        {...additionalTextProps}
        {...theme.validationInputColor[validationState]}
      />
      {hasAppend && (
        <Append
          addOnTextColor={addOnTextColor}
          addOnBgColor={addOnBgColor}
          aria-hidden="true"
          onClick={focusInput}
        >
          <Icon aria-hidden="true" name={appendIconName} size={18} />
        </Append>
      )}
    </InputWrapper>
  );
});

Textbox.propTypes = {
  /** Content to prepend input box with */
  prependIconName: PropTypes.string,
  /** Content to append to input box */
  appendIconName: PropTypes.string
};

Textbox.defaultProps = {
  prependIconName: undefined,
  appendIconName: undefined
};

export default Textbox;
