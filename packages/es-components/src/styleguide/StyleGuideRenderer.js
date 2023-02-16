import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useStyleguideTheme, ThemeSwitch } from './styleguideTheme';
import DefaultStyleGuideRenderer from 'react-styleguidist/lib/client/rsg-components/StyleGuide/StyleGuideRenderer';

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  position: sticky;
`;

export default function StyleGuideRenderer(props) {
  const theme = useStyleguideTheme();

  // We can add a ThemeSwitch to the header when the switch is worked out
  // return (
  //   <ThemeProvider theme={theme}>
  //     <Header>
  //       <ThemeSwitch />
  //     </Header>
  //     <DefaultStyleGuideRenderer {...props} />
  //   </ThemeProvider>
  // );

  return (
    <ThemeProvider theme={theme}>
      <DefaultStyleGuideRenderer {...props} />
    </ThemeProvider>
  );
}
