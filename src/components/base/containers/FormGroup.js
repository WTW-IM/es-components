import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../theme';

function getErrorColor(hasError) {
  return hasError ? colors.red : 'inherit';
}

const BaseFormGroup = styled.div`
  color: ${props => getErrorColor(props.error)};
`;

const InlineFormGroup = styled(BaseFormGroup)`
  display: flex;
  margin-bottom: 0;
  vertical-align: middle;

  > * {
    margin-right: 15px;
  }
`;

const StackedFormGroup = styled(BaseFormGroup)`
  margin-bottom: 20px;
`;

function FormGroup({
  hasError = false,
  inline = false,
  children
}) {
  const FormGroupContainer = inline ? InlineFormGroup : StackedFormGroup;

  return (
    <FormGroupContainer error={hasError}>
      {children}
    </FormGroupContainer>
  );
}

FormGroup.propTypes = {
   /** Should render in an error state */
  hasError: PropTypes.bool,
  /** Should the child elements render inline */
  inline: PropTypes.bool,
  children: PropTypes.element
};

export default FormGroup;
