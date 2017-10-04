import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';

import Icon from '../../base/icons/Icon';
import { sizes } from '../../theme';
import { LabelText, InputBase, MaskedInputBase } from '../BaseControls';
import Label from '../Label';
import Addon from './Addon';
import getValidationStateVariables from '../getValidationStateVariables';
import getAddonType from './getAddonType';
import genId from '../../util/generateAlphaName';

function getBorderRadius(addonType) {
  switch (addonType) {
    case 'append':
      return '2px 0 0 2px';
    case 'prepend':
      return '0 2px 2px 0';
    case 'both':
      return '0';
    default:
      return '2px';
  }
}

const TextBoxLabel = styled(Label)`flex-basis: 50%;`;

const StyledText = styled(InputBase)`
  border-radius: ${props => getBorderRadius(props.addonType)};
`;

const StyledMask = StyledText.withComponent(MaskedInputBase);

const AdditionalHelpContent = styled.div`
  font-size: ${sizes.baseFontSize}px;
  font-weight: normal;
  margin: 10px 0 20px 0;
  text-transform: none;
`;

const TextWrapper = styled.div`
  flex: auto;
  margin-right: ${props => (props.includeMargin ? '20px' : '0')};
  position: relative;
`;

const TextIcon = styled(Icon)`
  font-weight: normal;
  position: absolute;
  right: 9px;
  top: 9px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex: auto;
`;

const inputMaskType = {
  date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  phone: [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ],
  zip: [/\d/, /\d/, /\d/, /\d/, /\d/]
};

function renderAddon(
  type,
  addonContent,
  inputVariables,
  inline,
  prependAddonRef
) {
  return (
    <Addon
      innerRef={prependAddonRef}
      className={type}
      backgroundColor={inputVariables.addonBackgroundColor}
      borderColor={inputVariables.borderColor}
      inline={inline}
    >
      {addonContent}
    </Addon>
  );
}

const Textbox = props => {
  const {
    labelText,
    name,
    value,
    inline,
    inputRef,
    prependAddonRef,
    additionalHelpContent,
    validationState,
    prependContent,
    appendContent,
    onChange,
    onBlur,
    maskType,
    ...additionalTextProps
  } = props;

  const hasHelpContent = additionalHelpContent !== undefined;
  const helpId = hasHelpContent ? genId() : null;
  const additionalHelp = hasHelpContent && (
    <AdditionalHelpContent id={helpId} className="textbox__help">
      {additionalHelpContent}
    </AdditionalHelpContent>
  );

  const hasPrependedText = prependContent !== undefined;
  const hasAppendedText = appendContent !== undefined;
  const addonType = getAddonType(hasPrependedText, hasAppendedText);
  const hasNoAddon = addonType === null;
  const Input = maskType === 'none' ? StyledText : StyledMask;

  let mask;
  switch (maskType) {
    case 'date':
      mask = inputMaskType.date;
      break;
    case 'phone':
      mask = inputMaskType.phone;
      break;
    case 'zip':
      mask = inputMaskType.zip;
      break;
    default:
      mask = [];
      break;
  }

  const inputVariables = getValidationStateVariables(validationState);
  const inputStyleProps = {
    borderColor: inputVariables.borderColor,
    boxShadow: inputVariables.boxShadow,
    focusBorderColor: inputVariables.focusBorderColor,
    focusBoxShadow: inputVariables.focusBoxShadow
  };

  const icon =
    inputVariables.icon !== undefined ? (
      <TextIcon name={inputVariables.icon} size={20} />
    ) : null;

  const inputName = name || labelText.replace(/\s+/g, '');
  const textboxId = genId();

  const handleOnBlur = event => {
    onBlur(event);
  };

  const handleOnChange = event => {
    onChange(event);
  };

  return (
    <TextBoxLabel
      htmlFor={textboxId}
      color={inputVariables.foregroundColor}
      inline={inline}
    >
      <LabelText inline={inline}>{labelText}</LabelText>
      <InputWrapper>
        {hasPrependedText &&
          renderAddon(
            'prepend',
            prependContent,
            inputVariables,
            false,
            prependAddonRef
          )}
        <TextWrapper includeMargin={hasNoAddon && inline}>
          <Input
            id={textboxId}
            addonType={addonType}
            type="text"
            name={inputName}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            aria-describedby={helpId}
            value={value}
            {...inputStyleProps}
            {...additionalTextProps}
            innerRef={inputRef}
            mask={mask}
          />
          {icon}
        </TextWrapper>
        {hasAppendedText &&
          renderAddon('append', appendContent, inputVariables, inline)}
      </InputWrapper>
      {additionalHelp}
    </TextBoxLabel>
  );
};

Textbox.propTypes = {
  labelText: PropTypes.string.isRequired,
  /** The name of the input */
  name: PropTypes.string,
  /** Reference to the underlying input DOM element */
  inputRef: PropTypes.func,
  /** Reference to the underlying prepend DOM element */
  prependAddonRef: PropTypes.func,
  /** Display label inline with text box */
  inline: PropTypes.bool,
  /** Function to execute when text box value changes */
  onChange: PropTypes.func,
  /** Function to execute when text box loses focus */
  onBlur: PropTypes.func,
  /** Content to display underneath the text box */
  additionalHelpContent: PropTypes.node,
  /** Display label and text with contextual state colorings */
  validationState: PropTypes.oneOf(['success', 'warning', 'danger']),
  /** Content to prepend input box with */
  prependContent: PropTypes.node,
  /** Content to append to input box */
  appendContent: PropTypes.node,
  /** Set the initial value, uncontrolled mode */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Value of the textbox */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets a mask type on the input */
  maskType: PropTypes.oneOf(['none', 'date', 'phone', 'zip'])
};

Textbox.defaultProps = {
  inline: false,
  maskType: 'none',
  onChange: noop,
  onBlur: noop
};

export default Textbox;
