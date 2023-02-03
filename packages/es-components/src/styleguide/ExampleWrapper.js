/* eslint-disable react/prop-types */

import React, { useState, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import wtwTheme from 'es-components-wtw-theme';
import tinycolor from 'tinycolor2';
import Switch from '../components/controls/switch/Switch';
import { useStyleguideTheme, useIsViaTheme } from './styleguideTheme';

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SwitchContainer = styled.div`
  align-items: center;
  border: 1px solid ${props => props.theme.colors.gray5};
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  height: 3em;
  background-color: ${props => props.theme.colors.gray3};
  color: ${props => props.theme.colors.gray9};
  justify-content: flex-end;
  padding: 0.5em;
  box-shadow: 0 1px 2px 0 ${props => props.theme.colors.gray5};
  margin-bottom: 2em;

  div[type='primary'] {
    margin: 0;

    span[type='primary'][direction='left'] {
      color: ${props => props.theme.colors.gray9};
    }

    span[type='primary']:not([direction='left']) {
      top: -3px;
      &:before {
        background-color: ${({ theme: { brandColors, themeName } }) =>
          themeName === 'via-theme'
            ? brandColors.primary1
            : brandColors.primary3};
      }
    }
  }
`;

const SelectedLabel = styled.span`
  color: ${props => props.theme.colors.gray9};
  text-shadow: 1px 1px 2px
    ${props => tinycolor(props.theme.colors.gray4).setAlpha(0.85).toRgbString()};
`;

const UnelectedLabel = styled.span`
  color: ${props => props.theme.colors.gray6};
`;

export default function ExampleWrapper({ children }) {
  const globalTheme = useStyleguideTheme();
  const [theme, setTheme] = useState(globalTheme);
  const toggleTheme = useCallback(() => {
    setTheme(currentTheme =>
      currentTheme.themeName === 'via-theme' ? wtwTheme : viaTheme
    );
  }, []);

  const ViaLabel =
    theme.themeName === 'via-theme' ? SelectedLabel : UnelectedLabel;
  const WtwLabel =
    theme.themeName === 'wtw-theme' ? SelectedLabel : UnelectedLabel;

  return (
    <ThemeProvider theme={theme}>
      <ExampleContainer>
        <SwitchContainer>
          <Switch
            direction="left"
            offText={<ViaLabel>via-theme</ViaLabel>}
            onText={<WtwLabel>wtw-theme</WtwLabel>}
            onChange={toggleTheme}
          ></Switch>
        </SwitchContainer>
        <div>{children}</div>
      </ExampleContainer>
    </ThemeProvider>
  );
}
