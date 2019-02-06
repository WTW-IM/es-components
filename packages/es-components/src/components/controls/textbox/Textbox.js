import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { omit } from 'lodash';
import MaskedInput from 'react-text-mask';

import Icon from '../../base/icons/Icon';
import InputBase from './InputText';
import inputMaskType from './inputMaskType';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';

const defaultBorderRadius = '2px';

// apply styles to masked input, but remove props it doesn't use
const StyledMaskedInput = InputBase.withComponent(props => (
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
));

/* eslint-disable no-confusing-arrow */
const CommonInputStyles = css`
  border-bottom-left-radius: ${props =>
    props.hasPrepend ? '0' : defaultBorderRadius};
  border-bottom-right-radius: ${props =>
    props.hasAppend ? '0' : defaultBorderRadius};
  border-top-left-radius: ${props =>
    props.hasPrepend ? '0' : defaultBorderRadius};
  border-top-right-radius: ${props =>
    props.hasAppend ? '0' : defaultBorderRadius};
  box-sizing: border-box;
  color: inherit;
  display: table-cell;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  padding-right: 2em;
`;
/* eslint-enable */

const StyledMask = styled(StyledMaskedInput)`
  ${CommonInputStyles};
`;

const StyledText = styled(InputBase)`
  ${CommonInputStyles};
`;

const ValidationIconWrapper = styled.span`
  height: 0;
  position: relative;
  width: 0;
`;

const ValidationIcon = styled(Icon)`
  height: 20px;
  pointer-events: none;
  position: absolute;
  right: 11px;
  top: 9px;
`;

/* eslint-disable no-confusing-arrow */
const AddOn = css`
  background-color: ${props => props.addOnBgColor};
  border: 1px solid
    ${props =>
      props.addOnBgColor === props.theme.colors.gray3
        ? props.theme.colors.gray5
        : props.addOnBgColor};
  border-radius: ${defaultBorderRadius};
  box-sizing: border-box;
  color: ${props => props.addOnTextColor};
  display: table-cell;
  height: 39px;
  line-height: 1.2;
  padding: 6px 11px;

  i {
    line-height: 1;
    vertical-align: middle;
  }
`;
/* eslint-enable */

const Prepend = styled.span`
  ${AddOn} border-bottom-right-radius: 0;
  border-right: none;
  border-top-right-radius: 0;
`;

const Append = styled.span`
  ${AddOn} border-bottom-left-radius: 0;
  border-left: none;
  border-top-left-radius: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  flex: 1 0 80%;
`;

function Textbox(props) {
  const {
    prependIconName,
    appendIconName,
    maskType,
    customMask,
    ...additionalTextProps
  } = props;
  const theme = useTheme();

  const validationState = React.useContext(ValidationContext);
  const classNameState = `es-textbox__input--${validationState}`;

  const hasPrepend = !!prependIconName;
  const hasAppend = !!appendIconName;
  const hasValidationIcon = validationState !== 'default';

  const Input = maskType === 'none' ? StyledText : StyledMask;
  const maskArgs =
    maskType === 'custom' && customMask ? customMask : inputMaskType[maskType];

  if (maskType !== 'none') {
    maskArgs.render = (ref, maskedProps) => {
      const setRef = inputElement => {
        // Failing to call ref from the `react-text-mask` render prop will cause
        // `react-text-mask` to break, as it needs the ref to function
        ref(inputElement);
      };

      // based on ReactTextMask.defaultProps.render since we don't normally use
      // the render prop
      // https://github.com/text-mask/text-mask/blob/72ed2c40ecd99817b946f15d3e75a4944b364f4e/react/src/reactTextMask.js#L89
      return <input ref={setRef} {...maskedProps} />;
    };
  }

  const addOnTextColor = hasValidationIcon
    ? theme.colors.white
    : theme.colors.gray8;
  const addOnBgColor = hasValidationIcon
    ? theme.validationTextColor[validationState]
    : theme.colors.gray3;

  return (
    <InputWrapper className="es-textbox__wrapper">
      {hasPrepend && (
        <Prepend addOnTextColor={addOnTextColor} addOnBgColor={addOnBgColor}>
          <Icon aria-hidden="true" name={prependIconName} size={18} />
        </Prepend>
      )}
      <Input
        className={classNameState}
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

Textbox.propTypes = {
  /** Content to prepend input box with */
  prependIconName: PropTypes.string,
  /** Content to append to input box */
  appendIconName: PropTypes.string,
  /** Sets a mask type on the input */
  maskType: PropTypes.oneOf([
    'none',
    'date',
    'dollar',
    'phone',
    'ssnum',
    'zip',
    'custom'
  ]),
  customMask: PropTypes.shape({
    mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    guide: PropTypes.bool,
    placeholderChar: PropTypes.string,
    keepCharPositions: PropTypes.bool,
    pipe: PropTypes.func,
    showMask: PropTypes.bool
  })
};

Textbox.defaultProps = {
  maskType: 'none',
  prependIconName: undefined,
  appendIconName: undefined,
  customMask: undefined
};

export default Textbox;
