import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFieldset = styled.fieldset`
  border: 0;
  margin-bottom: 25px;
  padding: 0;

  > *:last-child {
    margin-bottom: 0;
  }
`;

const Legend = styled.legend`
  border: 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray6};
  color: ${props => props.theme.colors.black};
  display: block;
  font-size: 21.6px;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  margin: 0 0 18px 0;
  padding: 0;
  width: 100%;
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
