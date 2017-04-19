import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';
import slug from 'slug';

import Icon from '../../base/icons/Icon';
import { sizes } from '../../theme';
import { LabelText, InputBase } from '../BaseControls';
import Label from '../Label';
import Addon from './Addon';
import getValidationStateVariables from '../getValidationStateVariables';
import getAddonType from './getAddonType';

const TextBoxLabel = styled(Label)`
  flex-basis: 50%;
`;

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

const StyledText = styled(InputBase)`
  border-radius: ${props => getBorderRadius(props.addonType)};
`;

const AdditionalHelpContent = styled.div`
  font-size: ${sizes.baseFontSize}px;
  font-weight: normal;
  margin: 10px 0 20px 0;
  text-transform: none;
`;

const TextWrapper = styled.div`
  flex: auto;
  margin-right: ${props => (props.hasAddon ? '0' : '20px')};
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

class Textbox extends React.Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    /** The name of the input */
    name: PropTypes.string,
    /** Display label inline with text box */
    inline: PropTypes.bool,
    /** Function to execute when text box value changes */
    handleOnChange: PropTypes.func,
    /** Function to execute when text box loses focus */
    handleFocusLost: PropTypes.func,
    /** Content to display underneath the text box */
    additionalHelpContent: PropTypes.node,
    /** Display label and text with contextual state colorings */
    validationState: PropTypes.oneOf(['success', 'warning', 'danger']),
    /** Content to prepend input box with */
    prependContent: PropTypes.node,
    /** Content to append to input box */
    appendContent: PropTypes.node,
    /** Default value of the textbox */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    inline: false,
    handleOnChange: noop,
    handleFocusLost: noop
  }

  constructor(props) {
    super(props);

    this.state = {
      currentValue: this.props.value
    };

    this.handleOnTextChanged = this.handleOnTextChanged.bind(this);
    this.handleOnTextFocusLost = this.handleOnTextFocusLost.bind(this);
  }

  executeHandler(event, handlerName) {
    const { value } = event.target;
    const handler = this.props[handlerName];
    this.setState({ currentValue: value }, () => handler(value));
  }

  handleOnTextChanged(event) {
    this.executeHandler(event, 'handleOnChange');
  }

  handleOnTextFocusLost(event) {
    this.executeHandler(event, 'handleFocusLost');
  }

  renderAddon(type, addonContent, inputVariables, shouldRenderAddon, inline) {
    if (shouldRenderAddon) {
      return (
        <Addon
          className={type}
          backgroundColor={inputVariables.addonBackgroundColor}
          borderColor={inputVariables.borderColor}
          inline={inline}
        >
          {addonContent}
        </Addon>
      );
    }
    return null;
  }

  render() {
    const {
      labelText,
      name,
      inline,
      additionalHelpContent,
      validationState,
      prependContent,
      appendContent,
      ...additionalTextProps
    } = this.props;

    const inputVariables = getValidationStateVariables(validationState);

    const hasHelpContent = additionalHelpContent !== undefined;

    const ariaId = hasHelpContent ? `${slug(labelText, { lower: true })}-help-content` : null;
    const additionalHelp = hasHelpContent ?
          <AdditionalHelpContent id={ariaId}>{additionalHelpContent}</AdditionalHelpContent> :
          null;

    const hasPrependedText = prependContent !== undefined;
    const hasAppendedText = appendContent !== undefined;

    const addonType = getAddonType(hasPrependedText, hasAppendedText);
    const hasAddon = addonType !== null;

    const icon = inputVariables.icon !== undefined ?
          <TextIcon name={inputVariables.icon} size={20} /> :
          null;

    const inputName = name || labelText.replace(/\s+/g, '');

    return (
      <TextBoxLabel color={inputVariables.foregroundColor} inline={inline}>
        <LabelText inline={inline}>{labelText}</LabelText>
        <InputWrapper>
          {this.renderAddon('prepend', prependContent, inputVariables, hasPrependedText)}
          <TextWrapper hasAddon={hasAddon}>
            <StyledText
              addonType={addonType}
              type="text"
              name={inputName}
              onChange={this.handleOnTextChanged}
              onBlur={this.handleOnTextFocusLost}
              aria-describedby={ariaId}
              value={this.state.currentValue}
              {...inputVariables}
              {...additionalTextProps}
            />
            {icon}
          </TextWrapper>
          {this.renderAddon('append', appendContent, inputVariables, hasAppendedText, inline)}
        </InputWrapper>
        {additionalHelp}
      </TextBoxLabel>
    );
  }
}

export default Textbox;
