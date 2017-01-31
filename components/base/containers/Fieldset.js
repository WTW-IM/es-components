import React from 'react';
import classnames from 'classnames';

function renderLegend(text, additionalLegendClasses) {
  const legendClasses = classnames('legend-style', additionalLegendClasses);
  return text ?
    <legend className={legendClasses}>{text}</legend> :
    null;
}

function Fieldset({
  additionalLegendClasses,
  legendText,
  children
}) {
  return (
    <fieldset>
      { renderLegend(legendText, additionalLegendClasses) }
      { children }
    </fieldset>
  );
}

Fieldset.propTypes = {
  /**
   * determine whether or not to add a legend and what text to display
   */
  legendText: React.PropTypes.string,
  /**
   * Additional classes to be applied to the legend element
   */
  additionalLegendClasses: React.PropTypes.string,
  children: React.PropTypes.element
};

export default Fieldset;
