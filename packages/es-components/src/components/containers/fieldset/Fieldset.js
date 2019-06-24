import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Legend from './Legend';

const StyledFieldset = styled.fieldset`
  border: 0;
  margin-bottom: 25px;
  padding: 0;

  > *:last-child {
    margin-bottom: 0;
  }
`;

function Fieldset(props) {
  const { legendContent, children, ...other } = props;

  return (
    <StyledFieldset {...other}>
      {legendContent && <Legend>{legendContent}</Legend>}
      {children}
    </StyledFieldset>
  );
}

Fieldset.propTypes = {
  /** Determine whether or not to add a legend and what content to display  */
  legendContent: PropTypes.node,
  children: PropTypes.node
};

Fieldset.defaultProps = {
  legendContent: null,
  children: undefined
};

export default Fieldset;
