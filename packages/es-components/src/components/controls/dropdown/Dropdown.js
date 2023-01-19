import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import InputBase, {
  useValidationStyleProps,
  validationStateHighlightStyles,
  placeholderStyles
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
