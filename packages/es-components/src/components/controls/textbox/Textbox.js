import React, { useCallback, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../../base/icons/Icon';
import InputBase, { useValidationStyleProps } from './InputBase';
import { Prepend, Append, InputWrapper } from './TextAddons';

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

  &:read-only {
    background-color: ${({ disabledBackgroundColor }) =>
      disabledBackgroundColor};
    cursor: text;
  }
`;

const Textbox = React.forwardRef(function Textbox(props, ref) {
  const {
    prependIconName,
    appendIconName,
    type,
    flat,
    ...additionalTextProps
  } = props;
  const validationProps = useValidationStyleProps({ flat });

  const inputRef = useRef();
  useImperativeHandle(ref, () => inputRef.current);

  const hasPrepend = !!prependIconName;
  const hasAppend = !!appendIconName;

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  return (
    <InputWrapper>
      {hasPrepend && (
        <Prepend aria-hidden="true" onClick={focusInput} {...validationProps}>
          <Icon aria-hidden="true" name={prependIconName} size={18} />
        </Prepend>
      )}
      <TextboxBase
        hasAppend={hasAppend}
        hasPrepend={hasPrepend}
        ref={inputRef}
        type={type}
        {...additionalTextProps}
        {...validationProps}
      />
      {hasAppend && (
        <Append aria-hidden="true" onClick={focusInput} {...validationProps}>
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
  /** The type attribute for the textboxa */
  type: PropTypes.string,
  /** Whether the textbox is the flat style or not */
  flat: PropTypes.bool
};

Textbox.defaultProps = {
  prependIconName: undefined,
  appendIconName: undefined,
  type: 'text',
  flat: undefined
};

export default Textbox;
