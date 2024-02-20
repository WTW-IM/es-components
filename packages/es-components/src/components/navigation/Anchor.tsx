import styled, { css } from 'styled-components';

export const anchorCss = css`
  background-color: transparent;
  box-sizing: border-box;
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
    text-decoration: none;
  }
`;

const Anchor = styled.a`
  ${anchorCss}
`;

/** @component */
export default Anchor;
