import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { omit, noop } from 'lodash';
import MaskedInput from 'react-text-mask';

import Icon from '../../base/icons/Icon';
import inputMaskType from './inputMaskType';
import {
  ValidationIconWrapper,
  ValidationIcon,
  Prepend,
  Append,
  InputWrapper,
  TextboxBase
} from './TextAddons';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';

// apply styles to masked input, but remove props it doesn't use
const StyledMask = styled(props => (
  <MaskedInput
    {...omit(props, [
      'borderColor',
      'boxShadow',
      'focusBorderColor',
      'focusBoxShadow',
      'hasAppend',
      'hasPrepend',
      'initialValue'
    ])}
  />
))``;

function MaskedTextbox(props) {
  const {
    prependIconName,
    appendIconName,
    maskType,
    customMask,
    inputRef,
    ...additionalTextProps
  } = props;
  const theme = useTheme();

  const validationState = React.useContext(ValidationContext);

  const hasPrepend = !!prependIconName;
  const hasAppend = !!appendIconName;
  const hasValidationIcon = validationState !== 'default';
  const maskArgs =
    maskType === 'custom' && customMask ? customMask : inputMaskType[maskType];

  maskArgs.render = (maskRef, maskProps) => {
    const setRef = inputElement => {
      maskRef(inputElement);
      inputRef(inputElement);
    };
    return <input ref={setRef} {...maskProps} />;
  };

  const addOnTextColor = hasValidationIcon
    ? theme.colors.white
    : theme.colors.gray8;
  const addOnBgColor = hasValidationIcon
    ? theme.validationTextColor[validationState]
    : theme.colors.gray3;

  return (
    <InputWrapper>
      {hasPrepend && (
        <Prepend addOnTextColor={addOnTextColor} addOnBgColor={addOnBgColor}>
          <Icon aria-hidden="true" name={prependIconName} size={18} />
        </Prepend>
      )}
      <TextboxBase
        as={StyledMask}
        hasAppend={hasAppend}
        hasPrepend={hasPrepend}
        type="text"
        {...maskArgs}
        {...additionalTextProps}
        {...theme.validationInputColor[validationState]}
      />
      {hasValidationIcon && (
        <ValidationIconWrapper>
          <ValidationIcon
            aria-hidden="true"
            name={theme.validationIconName[validationState]}
            size={18}
          />
        </ValidationIconWrapper>
      )}
      {hasAppend && (
        <Append addOnTextColor={addOnTextColor} addOnBgColor={addOnBgColor}>
          <Icon aria-hidden="true" name={appendIconName} size={18} />
        </Append>
      )}
    </InputWrapper>
  );
}

MaskedTextbox.propTypes = {
  /** Content to prepend input box with */
  prependIconName: PropTypes.string,
  /** Content to append to input box */
  appendIconName: PropTypes.string,
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
  }),
  /** Callback function to get inner mask ref */
  inputRef: PropTypes.func
};

MaskedTextbox.defaultProps = {
  prependIconName: undefined,
  appendIconName: undefined,
  customMask: undefined,
  inputRef: noop
};

export default MaskedTextbox;
