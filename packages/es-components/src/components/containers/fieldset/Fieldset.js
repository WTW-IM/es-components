import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import OrientationContext from '../../controls/OrientationContext';
import genName from '../../util/generateAlphaName';

const FieldsetBase = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 25px;
  width: 100%;

  > *:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.orientation === 'inline' &&
    css`
      @media (min-width: ${props.theme.screenSize.tablet}) {
        align-items: baseline;
        flex-direction: row;
      }
    `};
`;

const Legend = styled.div`
  color: ${props => props.theme.colors.black};
  flex: 0 0 auto;
  font-size: 21.6px;
  line-height: ${props => props.theme.font.baseLineHeight};
  margin: 0 0 10px 0;
  width: 100%;
`;

function Fieldset(props) {
  const { legendContent, children, ...other } = props;
  const legendId = legendContent ? genName() : undefined;
  const orientation = React.useContext(OrientationContext);

  return (
    <FieldsetBase
      role="group"
      aria-labelledby={legendId}
      orientation={orientation}
      {...other}
    >
      {legendContent && <Legend id={legendId}>{legendContent}</Legend>}
      {children}
    </FieldsetBase>
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

Fieldset.Legend = Legend;

export default Fieldset;
