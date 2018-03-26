import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import defaultTheme from '../../theme/defaultTheme';

const Legend = styled.legend`
  border: 0;
  border-bottom: 1px solid ${props => props.theme.colors.grayDark};
  color: ${props => props.theme.colors.grayDark};
  display: block;
  font-size: ${props => props.theme.sizes.baseFontSize * 1.5}px;
  margin: 0 0 25px 0;
  padding: 0;
  width: 100%;
`;

function renderLegend(content, legendClasses) {
  return content ? <Legend className={legendClasses}>{content}</Legend> : null;
}

const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
`;

function Fieldset({ legendClasses, legendContent, children, theme }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledFieldset>
        {renderLegend(legendContent, legendClasses)}
        {children}
      </StyledFieldset>
    </ThemeProvider>
  );
}

Fieldset.propTypes = {
  /** Determine whether or not to add a legend and what content to display  */
  legendContent: PropTypes.node,
  /** Additional classes to be applied to the legend element */
  legendClasses: PropTypes.string,
  children: PropTypes.node,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object
};

Fieldset.defaultProps = {
  theme: defaultTheme
};

export default Fieldset;
