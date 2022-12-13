import { DefaultTheme } from 'styled-components';
export const popoverVariantNames = [
  'primary',
  'default',
  'darkDefault',
  'success',
  'info',
  'warning',
  'danger',
  'inherited'
];
export type PopoverStyleType =
  keyof DefaultTheme['buttonStyles']['linkButton']['variant'];
