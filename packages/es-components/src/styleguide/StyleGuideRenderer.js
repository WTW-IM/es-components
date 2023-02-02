import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useStyleguideTheme, ThemeSwitch } from './styleguideTheme';
import DefaultStyleGuideRenderer from 'react-styleguidist/lib/client/rsg-components/StyleGuide/StyleGuideRenderer'
import Heading from '../components/containers/heading/Heading';

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  position: sticky;
`;

export default function StyleGuideRenderer(props) {
  const theme = useStyleguideTheme();

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <ThemeSwitch />
      </Header>
      <DefaultStyleGuideRenderer {...props} />
    </ThemeProvider>
  );
}
