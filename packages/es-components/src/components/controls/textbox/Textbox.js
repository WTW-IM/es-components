import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';
import { noop, omit } from 'lodash';
import MaskedInput from 'react-text-mask';
import classnames from 'classnames';

import Icon from '../../base/icons/Icon';
import { LabelText, InputBase } from '../BaseControls';
import Label from '../Label';
import inputMaskType from './inputMaskType';

const defaultInputPad = '12px';
const defaultBorderRadius = '2px';

const TextBoxLabel = styled(Label)`
  flex-basis: 50%;
  font-weight: 700;
`;

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
      'initialValue',
      'hasValidationIcon'
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
  display: table-cell;
  padding-right: ${props =>
    props.hasValidationIcon ? '2em' : defaultInputPad};
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

const AdditionalHelpContent = styled.div`
  font-size: ${props => props.theme.sizes.baseFontSize};
  margin: 10px 0 20px 0;
  text-transform: none;
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
  color: ${props => props.addOnTextColor};
  display: table-cell;
  padding: 6px 11px;

  i {
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
  flex: auto;
`;

const Textbox = props => {
  const {
    labelText,
    name,
    id,
    inline,
    inputRef,
    additionalHelpContent,
    validationState,
    prependIconName,
    appendIconName,
    maskType,
    customMask,
    theme,
    className,
    ...additionalTextProps
  } = props;
  const inputName = name || labelText.replace(/\s+/g, '');
  const textboxId = id || `for-${inputName}`;
  const helpId = additionalHelpContent ? `${textboxId}-help` : null;
  const additionalHelp = additionalHelpContent && (
    <AdditionalHelpContent id={helpId} className="textbox__help">
      {additionalHelpContent}
    </AdditionalHelpContent>
  );
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
        inputRef(inputElement);
      };

      // based on ReactTextMask.defaultProps.render since we don't normally use
      // the render prop
      // https://github.com/text-mask/text-mask/blob/72ed2c40ecd99817b946f15d3e75a4944b364f4e/react/src/reactTextMask.js#L89
      return <input ref={setRef} {...maskedProps} />;
    };
  } else {
    additionalTextProps.innerRef = inputRef;
  }

  const addOnTextColor = hasValidationIcon
    ? theme.colors.white
    : theme.colors.gray8;
  const addOnBgColor = hasValidationIcon
    ? theme.validationTextColor[validationState]
    : theme.colors.gray3;

  return (
    <TextBoxLabel
      className={classnames('es-textbox', className)}
      htmlFor={textboxId}
      color={theme.validationTextColor[validationState]}
      inline={inline}
    >
      <LabelText className="es-textbox__label" inline={inline}>
        {labelText}
      </LabelText>
      <InputWrapper className="es-textbox__wrapper">
        {hasPrepend && (
          <Prepend addOnTextColor={addOnTextColor} addOnBgColor={addOnBgColor}>
            <Icon aria-hidden="true" name={prependIconName} size={20} />
          </Prepend>
        )}
        <Input
          aria-describedby={helpId}
          className={classNameState}
          hasAppend={hasAppend}
          hasPrepend={hasPrepend}
          id={textboxId}
          name={inputName}
          hasValidationIcon={hasValidationIcon}
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
              size={20}
            />
          </ValidationIconWrapper>
        )}
        {hasAppend && (
          <Append addOnTextColor={addOnTextColor} addOnBgColor={addOnBgColor}>
            <Icon aria-hidden="true" name={appendIconName} size={20} />
          </Append>
        )}
      </InputWrapper>
      {additionalHelp}
    </TextBoxLabel>
  );
};

Textbox.propTypes = {
  labelText: PropTypes.string.isRequired,
  /** The name of the input */
  name: PropTypes.string,
  /** Identifier of the input */
  id: PropTypes.string,
  /** Reference to the underlying input DOM element */
  inputRef: PropTypes.func,
  /** Display label inline with text box */
  inline: PropTypes.bool,
  /** Content to display underneath the text box */
  additionalHelpContent: PropTypes.node,
  /** Display label and text with contextual state colorings */
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /** Content to prepend input box with */
  prependIconName: PropTypes.string,
  /** Content to append to input box */
  appendIconName: PropTypes.string,
  /** Set the initial value, uncontrolled mode */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  }),
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired,
  className: PropTypes.string
};

Textbox.defaultProps = {
  inline: false,
  maskType: 'none',
  validationState: 'default',
  name: null,
  id: undefined,
  inputRef: noop,
  additionalHelpContent: null,
  prependIconName: undefined,
  appendIconName: undefined,
  defaultValue: undefined,
  customMask: null,
  className: null
};

export default withTheme(Textbox);
