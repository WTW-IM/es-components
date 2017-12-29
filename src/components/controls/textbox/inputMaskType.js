import createautoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

// https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md
const inputMask = {
  date: {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    pipe: createautoCorrectedDatePipe('mm/dd/yyyy'),
    showMask: false,
    keepCharPositions: true,
    placeholderChar: '\u2000',
    title: 'Enter month, day, and 4-digit year'
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
    title: 'Enter area code and phone number'
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
