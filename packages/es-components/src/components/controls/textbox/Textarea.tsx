import React from 'react';
import styled, { css } from 'styled-components';
import { ValidationInputColor } from 'es-components-shared-types';

import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';

type TextareaBaseProps = Partial<ValidationInputColor>;

const TextareaBase = styled.textarea.withConfig({
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
})<TextareaBaseProps>`
  ${({
    borderColor,
    boxShadow,
    theme,
    focusBorderColor,
    focusBoxShadow
  }) => css`
    min-width: 0;
    box-sizing: border-box;
    padding: 6px 12px;
    border: 1px solid ${borderColor};
    border-radius: 2px;
    box-shadow: ${boxShadow};
    color: ${theme.colors.black};
    font-family: ${theme.font.baseFontFace};
    font-size: ${theme.font.baseFontSize};
    font-weight: normal;
    line-height: ${theme.font.baseLineHeight};
    transition:
      border-color ease-in-out 0.15s,
      box-shadow ease-in-out 0.15s;

    &:focus {
      border-color: ${focusBorderColor};
      box-shadow: ${focusBoxShadow};
      outline: 0;
    }

    &:disabled {
      background-color: ${theme.colors.gray2};
      cursor: not-allowed;
    }

    &:read-only {
      padding-right: 0;
      padding-left: 0;
      border: 0;
      background-color: transparent;
      box-shadow: none;
    }
  `}
`;

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  JSXElementProps<'textarea'>
>(function Textarea(props, ref) {
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);

  return (
    <TextareaBase
      ref={ref}
      {...props}
      {...theme?.validationInputColor[validationState]}
    />
  );
});

export default Textarea;
