import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, sizes } from '../../theme';

const Legend = styled.legend`
  border: 0;
  border-bottom: 1px solid ${colors.grayDark};
  color: ${colors.grayDark};
  display: block;
  font-size: ${sizes.baseFontSize * 0.75}px;
  font-weight: bold;
  margin: 0 0 10px 0;
  padding: 0;
  text-transform: uppercase;
  width: 100%;
`;

function renderLegend(text, additionalLegendClasses) {
  return text ?
    <Legend className={additionalLegendClasses}>{text}</Legend> :
    null;
}

const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
`;

function Fieldset({
  additionalLegendClasses,
  legendText,
  children
}) {
  return (
    <StyledFieldset>
      { renderLegend(legendText, additionalLegendClasses) }
      { children }
    </StyledFieldset>
  );
}

Fieldset.propTypes = {
  /** Determine whether or not to add a legend and what text to display  */
  legendText: PropTypes.string,
  /** Additional classes to be applied to the legend element */
  additionalLegendClasses: PropTypes.string,
  children: PropTypes.node
};

export default Fieldset;
