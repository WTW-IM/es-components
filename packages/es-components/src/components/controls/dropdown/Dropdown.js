import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import InputBase, {
  validationStateHighlightStyles,
  placeholderStyles,
  useValidationStyleProps
} from '../textbox/InputBase';
import callRef from '../../util/callRef';
import { arrowDown } from './assets';
import getStyledProp from '../../util/getStyledProp';

const getCSSArrow = props =>
  `"${getStyledProp('inputStyles.dropdownArrow')(props) || arrowDown}"`;

const DropdownInput = styled(InputBase)`
  min-width: 100px;
  appearance: none;
  background-image: url(${getCSSArrow});
  background-repeat: no-repeat;
  background-position: right 0.5em center;
  background-size: 0.6em auto;
  line-height: ${props =>
    getStyledProp('inputStyles.dropdownLineHeight')(props) || '1.5em'};

  ${({ hasValue }) => !hasValue && placeholderStyles}

  &&:focus {
    ${validationStateHighlightStyles}
  }
`;

const Dropdown = React.forwardRef(function ForwardedDropdown(props, ref) {
  const validationStyleProps = useValidationStyleProps(props);
  const [hasValue, setHasValue] = useState(Boolean(props.value));
  const [inputRef, setInputRef] = useState(null);
  const onChange = useCallback(
    ev => {
      setHasValue(Boolean(ev.target.value));
      (props.onChange || (() => {}))(ev);
    },
    [props.onChange]
  );

  const inputRefCallback = useCallback(
    node => {
      setInputRef(node);
      callRef(ref, node);
    },
    [ref]
  );

  useEffect(() => {
    if (inputRef) {
      setHasValue(Boolean(inputRef && inputRef.value));
      return;
    }

    setHasValue(Boolean(props.value || props.defaultValue));
  }, [props.value, props.defaultValue, inputRef, inputRef?.value]);

  return (
    <DropdownInput
      {...validationStyleProps}
      onChange={onChange}
      hasValue={hasValue}
      ref={inputRefCallback}
      forwardedAs="select"
    />
  );
});

export const propTypes = {
  ...styled.select.propTypes
};

Dropdown.propTypes = propTypes;

export default Dropdown;
