import React, { useState, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import wtwTheme from 'es-components-wtw-theme';
import tinycolor from 'tinycolor2';
import Wrapper from 'orig-sg-components/Wrapper';
import Switch from '../components/controls/switch/Switch';
import { useStyleguideTheme } from './styleguideTheme';

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

  div.theme-switch {
    margin: 0;

    .es-switch__display {
      top: -3px;
    }

    &.toggled-off {
      .es-switch__on-text {
        color: ${props => props.theme.colors.gray9};
      }

      .es-switch__display {
        &:before {
          background-color: ${({ theme: { brandColors } }) =>
            brandColors.primary1};
        }
      }
    }

    &.toggled-on {
      .es-switch__off-text {
        color: ${props => props.theme.colors.gray9};
      }
      .es-switch__display {
        &:before {
          background-color: ${({ theme: { brandColors } }) =>
            brandColors.primary3};
        }
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

type ExampleWrapperComponent = typeof Wrapper;
type ExampleWrapperProps = React.ComponentProps<ExampleWrapperComponent>;

export default function ExampleWrapper(props: ExampleWrapperProps) {
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
            className="theme-switch"
            direction="left"
            offText={<ViaLabel>via-theme</ViaLabel>}
            onText={<WtwLabel>wtw-theme</WtwLabel>}
            onChange={toggleTheme}
          ></Switch>
        </SwitchContainer>
        <Wrapper {...props} />
      </ExampleContainer>
    </ThemeProvider>
  );
}
