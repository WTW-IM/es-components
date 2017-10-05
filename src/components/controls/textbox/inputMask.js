import createautoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

// https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md
const inputMask = {
  date: {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    pipe: createautoCorrectedDatePipe('mm/dd/yyyy'),
    keepCharPositions: true
  },
  dollars: { mask: createNumberMask({}) },
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
    ]
  },
  ssnum: {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  },
  zip: { mask: [/\d/, /\d/, /\d/, /\d/, /\d/] }
};

export default inputMask;
