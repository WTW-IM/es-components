import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import slug from 'slug';

import Label from '../Label';
import { LabelText, SelectBase } from '../BaseControls';
import getValidationStateVariables from '../getValidationStateVariables';

const optionsShape = {
  /** Text to display in drop down */
  optionText: PropTypes.string.isRequired,
  optionValue: PropTypes.string.isRequired
};

export default class Dropdown extends React.Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    /** The name of the select element*/
    name: PropTypes.string,
    /** Display label inline with dropdown */
    inline: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape(optionsShape)),
    /** Display a default first option */
    includeDefaultFirstOption: PropTypes.bool,
    /** The text of the first option displayed */
    firstOptionDisplayText: PropTypes.string,
    /** The currently selected value */
    selectedValue: PropTypes.string,
    /** Display label and text with contextual state colorings */
    validationState: PropTypes.oneOf(['success', 'warning', 'danger']),
    /** Function to execute when the dropdown value changes */
    onOptionChanged: PropTypes.func,
    /** Function to execute when the dropdown loses focus */
    onDropdownFocusLost: PropTypes.func
  };

  static defaultProps = {
    inline: false,
    includeDefaultFirstOption: true,
    firstOptionDisplayText: '--',
    selectedValue: '',
    onOptionChanged: noop,
    onDropdownFocusLost: noop
  };

  constructor(props) {
    super(props);

    this.state = {
      currentValue: props.selectedValue
    };

    this.handleOptionChanged = this.handleOptionChanged.bind(this);
    this.handleFocusLost = this.handleFocusLost.bind(this);
  }

  handleEvent(event, handlerName) {
    const { value } = event.target;

    const handler = this.props[handlerName];
    this.setState({ currentValue: value }, () => handler(value));
  }

  handleOptionChanged(event) {
    this.handleEvent(event, 'onOptionChanged');
  }

  handleFocusLost(event) {
    this.handleEvent(event, 'onDropdownFocusLost');
  }

  render() {
    const {
      labelText,
      name,
      inline,
      options,
      includeDefaultFirstOption,
      firstOptionDisplayText,
      validationState,
      ...selectProps
    } = this.props;

    const { currentValue } = this.state;

    const firstOption = includeDefaultFirstOption
      ? <option disabled value="">{firstOptionDisplayText}</option>
      : null;

    const selectOptions = options.map(opt => {
      const optionKey = slug(opt.optionValue);
      return (
        <option key={optionKey} value={opt.optionValue}>
          {opt.optionText}
        </option>
      );
    });

    const selectVariables = getValidationStateVariables(validationState);
    const selectName = name || slug(labelText);

    return (
      <Label inline={inline}>
        <LabelText
          foregroundColor={selectVariables.foregroundColor}
          inline={inline}
        >
          {labelText}
        </LabelText>
        <SelectBase
          name={selectName}
          value={currentValue}
          onChange={this.handleOptionChanged}
          onBlur={this.handleFocusLost}
          {...selectVariables}
          {...selectProps}
        >
          {firstOption}
          {selectOptions}
        </SelectBase>
      </Label>
    );
  }
}
