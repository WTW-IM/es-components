import React from 'react';
import styled from 'styled-components';

const StyledAnchor = styled.a`
  background-color: transparent;
  box-sizing: border-box;
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
    text-decoration: none;
  }
`;

function Anchor({ ...props }) {
  return <StyledAnchor {...props} />;
}

export default Anchor;
