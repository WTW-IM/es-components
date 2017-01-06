import React from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';
import '../../../styles/inputs.less';
import './radio-list.less';

function RadioButton({
  id,
  disabled,
  shouldDisplayValidation,
  checked,
  inline,
  labelText,
  name,
  onChange,
  value,
  ...radioProps
}) {
  const radioLabelClasses = classNames('label-style', 'radio-label', {
    'disabled-label': disabled
  });

  const radioDisplayClass = classNames({
    'errored-radio': !checked && !disabled && shouldDisplayValidation,
    'empty-radio': !checked && !disabled && !shouldDisplayValidation,
    'disabled-radio': !checked && disabled && !shouldDisplayValidation,
    'filled-radio': checked && !disabled && !shouldDisplayValidation,
    'disabled-filled-radio': disabled && checked && !shouldDisplayValidation
  });

  const radioWrapperClasses = classNames({
    'error': shouldDisplayValidation,
    'inline-radio-list': inline
  });

  return (
    <div className={radioWrapperClasses}>
      <label className={radioLabelClasses} htmlFor={id}>
        <input
          type="radio"
          name={name}
          className="radio-input"
          onChange={onChange}
          value={value}
          disabled={disabled}
          {...radioProps}
        />
        <span className="radio-text">{labelText}</span>
        <span className={radioDisplayClass} />
      </label>
    </div>
  );
}

RadioButton.propTypes = {
  labelText: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  value: React.PropTypes.any,
  /**
   * Should the radio button be displayed as invalid
   */
  shouldDisplayValidation: React.PropTypes.bool
};

RadioButton.defaultProps = {
  disabled: false,
  inline: true,
  shouldDisplayValidation: false,
  onChange: noop
};

export default RadioButton;
