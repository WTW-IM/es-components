import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

const Legend = styled.legend`
  border: 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray6};
  color: ${props => props.theme.colors.black};
  display: block;
  font-size: 27px;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  margin: 0 0 25px 0;
  padding: 0;
  width: 100%;
`;

function renderLegend(content, legendClasses) {
  return content ? (
    <Legend className={classnames('es-fieldset__legend', legendClasses)}>
      {content}
    </Legend>
  ) : null;
}

const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
`;

function Fieldset({ legendClasses, legendContent, children }) {
  return (
    <StyledFieldset className="es-fieldset">
      {renderLegend(legendContent, legendClasses)}
      {children}
    </StyledFieldset>
  );
}

Fieldset.propTypes = {
  /** Determine whether or not to add a legend and what content to display  */
  legendContent: PropTypes.node,
  /** Additional classes to be applied to the legend element */
  legendClasses: PropTypes.string,
  children: PropTypes.node
};

export default Fieldset;
