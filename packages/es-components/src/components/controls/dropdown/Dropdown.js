import React from 'react';
import styled from 'styled-components';
import InputBase, { useValidationStyleProps } from '../textbox/InputBase';

const DropdownInput = styled(InputBase)`
  min-width: 100px;
  box-shadow: 0 0 0 0 $({ borderColor }) => borderColor};
`;

export default function Dropdown(props) {
  const validationStyleProps = useValidationStyleProps(props);
  return (
    <DropdownInput
      {...{
        ...validationStyleProps,
        ...props
      }}
      as="select"
    />
  );
}
