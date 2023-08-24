import React from 'react';
import PropTypes from 'prop-types';
import * as CSS from 'csstype';
import styled, { css } from 'styled-components';

import { useTheme } from '../util/useTheme';
import ValidationContext from './ValidationContext';
import OrientationContext, {
  Orientation,
  orientations
} from './OrientationContext';
import { FormContextProvider } from '../containers/form/Form';
import isBool from '../util/isBool';
import {
  ValidationStyleType,
  validationStyleTypes
} from 'es-components-shared-types';

interface ControlDisplayProps {
  borderOffset?: CSS.Property.PaddingRight;
  validationState?: ValidationStyleType;
}

export type ControlProps = Override<
  JSXElementProps<'div'>,
  ControlDisplayProps & {
    hasValidationBorder?: boolean;
    orientation?: Orientation;
    flat?: boolean;
  }
>;

interface FlexControlProps extends ControlDisplayProps {
  hasValidationBorder?: boolean;
  textColor?: CSS.Property.Color;
  layoutOrientation?: Orientation;
}

const FlexControl = styled.div<FlexControlProps>`
  color: ${props => props.textColor};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 25px;

  >[role="group"] {
    margin-bottom: 0;
  }

  ${props =>
    props.hasValidationBorder &&
    props.validationState !== 'default' &&
    css`
      border-bottom: 2px solid ${props.theme.colors.gray4};
      box-shadow: inset 0 7px 6px -6px ${props.textColor};
      padding: 15px ${props.borderOffset};
      margin-left: -${props.borderOffset};
      margin-right: -${props.borderOffset};
    `}
  }

  ${props =>
    props.layoutOrientation === 'inline' &&
    css`
      @media (min-width: ${props.theme.screenSize.tablet}) {
        align-items: baseline;
        flex-direction: row;
      }
    `};
`;

const Control = React.forwardRef<HTMLDivElement, ControlProps>(
  function ForwardedControl(props, ref) {
    const {
      validationState = 'default',
      hasValidationBorder,
      orientation = 'stacked',
      borderOffset,
      children,
      flat,
      ...other
    } = props;
    const theme = useTheme();
    const extraFormContext = isBool(flat) ? { flat } : {};
    const textColor =
      theme.validationTextColor[validationState] ||
      theme.validationTextColor['default'];

    return (
      <OrientationContext.Provider value={orientation}>
        <FormContextProvider value={extraFormContext}>
          <FlexControl
            ref={ref}
            textColor={textColor}
            borderOffset={borderOffset}
            validationState={validationState}
            {...theme.validationInputColor[validationState]}
            layoutOrientation={orientation}
            hasValidationBorder={hasValidationBorder}
            {...other}
          >
            <ValidationContext.Provider value={validationState}>
              {children}
            </ValidationContext.Provider>
          </FlexControl>
        </FormContextProvider>
      </OrientationContext.Provider>
    );
  }
);

Control.propTypes = {
  ...FlexControl.propTypes,
  orientation: PropTypes.oneOf(orientations),
  validationState: PropTypes.oneOf(validationStyleTypes),
  /** Apply a top/bottom validation border to a control (usually checkbox/radios)  */
  hasValidationBorder: PropTypes.bool,
  /** Set the border offset to match container padding */
  borderOffset: PropTypes.string,
  /** Apply the Flat Style to all children */
  flat: PropTypes.bool,
  children: PropTypes.node
};

Control.defaultProps = {
  orientation: 'stacked',
  validationState: 'default',
  hasValidationBorder: false,
  borderOffset: '15px',
  flat: undefined,
  children: null
};

export default Control;
