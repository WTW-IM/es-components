import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../../base/icons/Icon';
import InputBase from './InputBase';
import { Prepend, Append, InputWrapper } from './TextAddons';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';

const defaultBorderRadius = '2px';

const TextboxBase = styled(InputBase)`
  border-bottom-left-radius: ${props =>
    props.hasPrepend ? '0' : defaultBorderRadius};
  border-bottom-right-radius: ${props =>
    props.hasAppend ? '0' : defaultBorderRadius};
  border-top-left-radius: ${props =>
    props.hasPrepend ? '0' : defaultBorderRadius};
  border-top-right-radius: ${props =>
    props.hasAppend ? '0' : defaultBorderRadius};
  display: table-cell;
  -webkit-appearance: none;
`;

const Textbox = React.forwardRef(function Textbox(props, ref) {
  const { prependIconName, appendIconName, inputmode, pattern, ...additionalTextProps } = props;
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
        inputmode={inputmode}
        pattern={pattern}
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
  appendIconName: PropTypes.string,
  inputmode: PropTypes.string,
  pattern: PropTypes.string
};

Textbox.defaultProps = {
  prependIconName: undefined,
  appendIconName: undefined,
  inputmode: 'text',
  pattern: ''
};

export default Textbox;
