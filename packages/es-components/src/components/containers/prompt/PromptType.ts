import { DefaultTheme } from 'styled-components';

type PromptType = keyof DefaultTheme['promptStyles'];

export const PromptType: { [index: string]: PromptType } = {
  readAloud: 'readAloud',
  doNotReadAloud: 'doNotReadAloud'
};
