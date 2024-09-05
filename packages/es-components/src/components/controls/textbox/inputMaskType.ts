import { MaskedInputProps } from 'react-text-mask';
import type {
  createNumberMask as typedCreateNumberMask,
  createAutoCorrectedDatePipe as typedCreateAutoCorrectedDatePipe
} from 'text-mask-addons';
import createAutoCorrectedDatePipeOrig from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import createNumberMaskOrig from 'text-mask-addons/dist/createNumberMask';

const createAutoCorrectedDatePipe =
  createAutoCorrectedDatePipeOrig as typeof typedCreateAutoCorrectedDatePipe;
const createNumberMask = createNumberMaskOrig as typeof typedCreateNumberMask;

export const maskTypes = ['date', 'dollar', 'phone', 'ssnum', 'zip'] as const;

export type InputMaskType = (typeof maskTypes)[number];

export type InputMask = {
  [key in InputMaskType]: MaskedInputProps;
};

// https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md
const inputMask: InputMask = {
  date: {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    pipe: createAutoCorrectedDatePipe('mm/dd/yyyy'),
    showMask: false,
    keepCharPositions: true,
    placeholderChar: '\u2000',
    title: 'Enter month, day, and 4-digit year',
    guide: false
  },
  dollar: { mask: createNumberMask({ prefix: '$' }) },
  phone: {
    mask: [
      '(',
      /[1-9]/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/
    ],
    showMask: false,
    keepCharPositions: true,
    placeholderChar: '\u2000',
    title: 'Enter area code and phone number',
    guide: false
  },
  ssnum: {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    showMask: false,
    keepCharPositions: true,
    placeholderChar: '\u2000',
    title: 'Enter 9-digit social security number'
  },
  zip: {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/],
    guide: false,
    title: 'Enter 5-digit zip code'
  }
};

export default inputMask;
