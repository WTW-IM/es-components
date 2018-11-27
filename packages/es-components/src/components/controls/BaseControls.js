// Note: Any component importing these will likely need a ThemeProvider wrapper
import styled, { css } from 'styled-components';

export const Label = styled.label`
  color: ${props => props.color || 'inherit'};
  cursor: pointer;
  display: ${props => (props.inline ? 'flex' : 'block')};
  margin-bottom: 20px;
  flex: ${props => (props.inline ? 'auto' : 'initial')};
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: 700;

  &[disabled] {
    cursor: not-allowed;
  }
`;

export const LabelText = styled.span`
  align-self: ${props => (props.inline ? 'center' : 'initial')};
  color: ${props => props.foregroundColor || 'inherit'};
  display: block;
  flex: 0 auto;
  flex-basis: 100px;
  margin-bottom: ${props => (props.inline ? 'initial' : '5px')};
  margin-right: 10px;
`;

const baseStyles = css`
  border-radius: 2px;
  box-sizing: border-box;
  color: ${props => props.theme.colors.gray9};
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: normal;
  height: 39px;
  padding: 6px 12px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  width: 100%;

  &:focus {
    outline: 0;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.gray2};
    cursor: not-allowed;
  }
`;

export const InputBase = styled.input`
  ${baseStyles} border: 1px solid ${props => props.borderColor};
  box-shadow: ${props => props.boxShadow};

  &:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
  }

  &:read-only {
    background-color: ${props => props.theme.colors.gray2};
    cursor: text;
  }
`;

export const SelectBase = styled.select`
  ${baseStyles} background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.borderColor};

  color: ${props => props.foregroundColor};

  &:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
  }
`;

export const ButtonBase = styled.button`
  border: none;
  border-radius: ${props => props.buttonSize.borderRadius};
  box-sizing: border-box;
  cursor: pointer;
  display: ${props => (props.block ? 'block' : 'inline-block')};
  font-family: inherit;
  font-size: ${props => props.buttonSize.fontSize};
  font-weight: ${props => props.buttonSize.fontWeight || 'normal'};
  line-height: ${props =>
    props.buttonSize.lineHeight || props.theme.sizes.baseLineHeight};
  padding-bottom: ${props => props.buttonSize.paddingBottom};
  padding-left: ${props => props.buttonSize.paddingSides};
  padding-right: ${props => props.buttonSize.paddingSides};
  padding-top: ${props => props.buttonSize.paddingTop};
  text-align: center;
  text-transform: ${props =>
    props.buttonSize.textTransform ? props.buttonSize.textTransform : 'none'};
  vertical-align: middle;
  white-space: nowrap;
  width: ${props => (props.block ? '100%' : 'initial')};

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.65;

    > * {
      pointer-events: none;
    }
  }
`;
