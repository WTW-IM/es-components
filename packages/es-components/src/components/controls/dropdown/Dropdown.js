import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import InputBase, {
  useValidationStyleProps,
  validationStateHighlightStyles,
  placeholderStyles
} from '../textbox/InputBase';
import callRef from '../../util/callRef';

const DropdownInput = styled(InputBase)`
  min-width: 100px;

  ${({ hasValue }) => !hasValue && placeholderStyles}

  &&:focus {
    ${validationStateHighlightStyles}
  }
`;

const Dropdown = React.forwardRef(function ForwardedDropdown(props, ref) {
  const validationStyleProps = useValidationStyleProps(props);
  const [hasValue, setHasValue] = useState(false);
  const onChange = useCallback(
    ev => {
      setHasValue(Boolean(ev.target.value));
      (props.onChange || (() => {}))(ev);
    },
    [props.onChange]
  );

  const inputRef = useCallback(
    node => {
      setHasValue(Boolean(node?.value));
      callRef(ref, node);
    },
    [ref]
  );

  return (
    <DropdownInput
      {...{
        ...validationStyleProps,
        ...props
      }}
      onChange={onChange}
      hasValue={hasValue}
      ref={inputRef}
      as="select"
    />
  );
});

Dropdown.propTypes = styled.select.propTypes;

export default Dropdown;
