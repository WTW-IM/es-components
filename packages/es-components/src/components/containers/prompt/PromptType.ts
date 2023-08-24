import { PromptStyle } from 'es-components-shared-types';

export const PromptType: { [index in PromptStyle]: PromptStyle } = {
  readAloud: 'readAloud',
  doNotReadAloud: 'doNotReadAloud'
};
