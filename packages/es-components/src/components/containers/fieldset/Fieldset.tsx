import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { FormContextProvider } from '../form/Form';
import OrientationContext, {
  Orientation
} from '../../controls/OrientationContext';
import isBool from '../../util/isBool';

type FieldsetProps = Omit<JSX.IntrinsicElements['fieldset'], 'ref'> & {
  legendContent?: React.ReactNode | undefined;
  orientation?: Orientation | undefined;
  flat?: boolean | undefined;
};

const fieldsetReset = css`
  padding: 0;
  border: 0;
  margin: 0;
  appearance: none;
`;

const FieldsetBase = styled.fieldset<{ orientation: Orientation }>`
  ${fieldsetReset}
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 25px;
  width: 100%;

  > *:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.orientation === 'inline' &&
    css`
      @media (min-width: ${props.theme.screenSize.tablet}) {
        flex-direction: row;
        align-items: baseline;
      }
    `};
`;

const Legend = styled.legend`
  ${fieldsetReset}
  color: ${props => props.theme.colors.black};
  flex: 0 0 auto;
  font-size: 21.6px;
  line-height: ${props => props.theme.font.baseLineHeight};
  margin: 0 0 10px;
  width: 100%;
`;

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function ForwardedFieldset(
    { legendContent, children, orientation: orientationProp, flat, ...other },
    ref
  ) {
    const orientation = useContext(OrientationContext);
    const extraFormContext = isBool(flat) ? { flat } : {};
    const finalOrientation = orientationProp || orientation || 'stacked';

    return (
      <OrientationContext.Provider value={finalOrientation}>
        <FormContextProvider value={extraFormContext}>
          <FieldsetBase ref={ref} orientation={finalOrientation} {...other}>
            {legendContent && <Legend>{legendContent}</Legend>}
            {children}
          </FieldsetBase>
        </FormContextProvider>
      </OrientationContext.Provider>
    );
  }
);

type FieldsetComponent = typeof Fieldset & {
  Legend: typeof Legend;
};

Fieldset.propTypes = {
  orientation: PropTypes.oneOf(['stacked', 'inline']),
  /** Determine whether or not to add a legend and what content to display  */
  legendContent: PropTypes.node,
  /** Apply the Flat Style to all children */
  flat: PropTypes.bool,
  children: PropTypes.node
};

Fieldset.defaultProps = {
  orientation: undefined,
  legendContent: null,
  flat: undefined,
  children: undefined
};

(Fieldset as FieldsetComponent).Legend = Legend;

export default Fieldset as FieldsetComponent;
