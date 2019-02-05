import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import generateAlphaName from '../../util/generateAlphaName';

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

const FieldsetLegend = ({ legendClasses, legendId, children, ...otherProps }) =>
  children ? (
    <Legend
      className={classnames('es-fieldset__legend', legendClasses)}
      id={legendId}
      {...otherProps}
    >
      {children}
    </Legend>
  ) : null;

FieldsetLegend.propTypes = {
  legendClasses: PropTypes.string,
  legendId: PropTypes.string,
  children: PropTypes.node
};

FieldsetLegend.defaultProps = {
  legendClasses: null,
  legendId: null,
  children: null
};

const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
`;

function Fieldset({
  legendClasses,
  legendContent,
  legendId,
  children,
  className
}) {
  const fieldsetClasses = classnames('es-fieldset', className);
  const legId = legendId || `${generateAlphaName()}-legend`;

  return (
    <StyledFieldset className={fieldsetClasses} aria-labelledby={legId}>
      <FieldsetLegend
        aria-hidden
        legendId={legId}
        legendClasses={legendClasses}
      >
        {legendContent}
      </FieldsetLegend>
      {children}
    </StyledFieldset>
  );
}

Fieldset.propTypes = {
  /** Determine whether or not to add a legend and what content to display  */
  legendContent: PropTypes.node,
  /** Additional classes to be applied to the legend element */
  legendClasses: PropTypes.string,
  /** Additional id for the legend element */
  legendId: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};

Fieldset.defaultProps = {
  legendContent: null,
  legendClasses: null,
  legendId: null,
  children: undefined,
  className: undefined
};

export default Fieldset;
