import styled from 'styled-components';

const getThemeProp = propPath => {
  return ({ theme }) => {
    const props = propPath.split('.');
    let target = theme;
    while (props.length) {
      target = target[props.shift()];
    }
    return target;
  };
};

export default styled.input`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 2px;
  box-sizing: border-box;
  color: ${getThemeProp('colors.black')};
  font-size: ${getThemeProp('font.baseFontSize')};
  font-face: ${getThemeProp('font.baseFontFace')};
  font-weight: normal;
  height: 39px;
  line-height: ${getThemeProp('font.baseLineHeight')};
  min-width: 0;
  padding: 6px 12px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  width: 100%;

  ${props =>
    !props.flat
      ? `box-shadow: ${props => props.boxShadow}`
      : `border-bottom: 2px solid ${props => props.borderColor};`}

  &:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
    outline: 0;
  }

  &:disabled {
    background-color: ${getThemeProp('colors.gray2')};
    cursor: not-allowed;
  }

  &:read-only {
    background-color: ${getThemeProp('colors.gray2')};
    cursor: text;
  }
`;
