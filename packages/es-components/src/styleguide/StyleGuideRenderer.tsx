import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useStyleguideTheme, ThemeSwitch } from './styleguideTheme';
import DefaultStyleGuideRenderer from 'orig-sg-components/StyleGuide/StyleGuideRenderer';
import GlobalStyleDefaults from '../components/base/global-styles/GlobalStyleDefaults';

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  position: sticky;
`;

const StyleGuideRenderer: typeof DefaultStyleGuideRenderer = props => {
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
  //

  // console.log('rendering with theme', theme);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyleDefaults />
      <DefaultStyleGuideRenderer {...props} />
    </ThemeProvider>
  );
};
export default StyleGuideRenderer;
