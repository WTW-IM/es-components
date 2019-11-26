import React, { useState } from 'react';
import PropTypes from 'prop-types';
import formatMessage from 'format-message';
import { noop } from 'lodash';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import Textarea from '../../controls/textbox/Textarea';
import AdditionalHelp from '../../controls/AdditionalHelp';

const defaultDetermineValidation = charactersRemaining =>
  charactersRemaining === 0 ? 'warning' : 'default';

export default function CountdownTextarea({
  id,
  labelText,
  limit,
  determineValidation,
  defaultValue,
  onChange = noop,
  ...props
}) {
  const [value, setValue] = useState(defaultValue || '');
  const charactersRemaining = limit - value.length;
  const validationState = determineValidation(charactersRemaining) || 'default';

  const handleOnChange = e => {
    onChange(e);
    setValue(e.target.value);
  };

  return (
    <Control validationState={validationState}>
      <Label htmlFor={id}>{labelText}</Label>
      <Textarea
        id={id}
        maxLength={limit}
        onChange={handleOnChange}
        value={value}
        {...props}
      />
      <AdditionalHelp id={`${id}-help`}>
        {formatMessage('{count} character(s) remaining', {
          count: charactersRemaining
        })}
      </AdditionalHelp>
    </Control>
  );
}

CountdownTextarea.propTypes = {
  /** A custom handler that returns a `validationState` based on the remaining length */
  determineValidation: PropTypes.func,
  /** The maximum number of characters allowed */
  limit: PropTypes.number.isRequired,
  labelText: PropTypes.string
};

CountdownTextarea.defaultProps = {
  labelText: 'Description',
  determineValidation: defaultDetermineValidation
};
