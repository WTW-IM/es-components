import styled from 'styled-components';

const Anchor = styled.a`
  background-color: transparent;
  box-sizing: border-box;
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
    text-decoration: none;
  }
`;

/** @component */
export default Anchor;
