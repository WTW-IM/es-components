import styled, { css } from 'styled-components';

const anchorCss = css`
  background-color: transparent;
  box-sizing: border-box;
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
    text-decoration: none;
  }
`;

export const globalAnchorCss = css`
  a {
    ${anchorCss};
  }
`;

const Anchor = styled.a`
  ${anchorCss}
`;

/** @component */
export default Anchor;
