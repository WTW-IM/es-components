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

interface FlexControlProps {
  $hasValidationBorder?: boolean;
  $textColor?: CSS.Property.Color;
  $layoutOrientation?: Orientation;
  $borderOffset: ControlDisplayProps['borderOffset'];
  $validationState: ControlDisplayProps['validationState'];
}

const FlexControl = styled.div.withConfig({
  shouldForwardProp: prop =>
    ![
      'backgroundColor',
      'backgroundColorFlat',
      'borderColor',
      'boxShadow',
      'focusBorderColor',
      'focusBoxShadow',
      'focusBoxShadowFlat',
      'addOn'
    ].includes(prop)
})<FlexControlProps>`
  ${({
    $textColor,
    theme,
    $borderOffset,
    $hasValidationBorder,
    $validationState,
    $layoutOrientation
  }) => css`
    color: ${$textColor};
    display: flex;
    flex-flow: column wrap;
    margin-bottom: 25px;

    > [role='group'] {
      margin-bottom: 0;
    }

    ${$hasValidationBorder &&
    $validationState !== 'default' &&
    css`
      padding: 15px ${$borderOffset};
      border-bottom: 2px solid ${theme.colors.gray4};
      margin-right: -${$borderOffset};
      margin-left: -${$borderOffset};
      box-shadow: inset 0 7px 6px -6px ${$textColor};
    `}

    ${$layoutOrientation === 'inline' &&
    css`
      @media (min-width: ${theme.screenSize.tablet}) {
        flex-direction: row;
        align-items: baseline;
      }
    `};
  `}
`;

const Control = React.forwardRef<HTMLDivElement, ControlProps>(
  function ForwardedControl(props, ref) {
    const {
      validationState = 'default',
      hasValidationBorder = false,
      orientation = 'stacked',
      borderOffset = '15px',
      children,
      flat,
      ...other
    } = props;
    const theme = useTheme();
    const extraFormContext = isBool(flat) ? { flat } : {};
    const textColor =
      theme?.validationTextColor[validationState] ||
      theme?.validationTextColor['default'];

    return (
      <OrientationContext.Provider value={orientation}>
        <FormContextProvider value={extraFormContext}>
          <FlexControl
            ref={ref}
            $textColor={textColor}
            $borderOffset={borderOffset}
            $validationState={validationState}
            {...(theme?.validationInputColor[validationState] ?? {})}
            $layoutOrientation={orientation}
            $hasValidationBorder={hasValidationBorder}
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

export default Control;
