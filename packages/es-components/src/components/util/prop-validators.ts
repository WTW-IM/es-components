import isParseableDate from './isParseableDate';
import { Validator } from 'prop-types';

type ValidatorParams = Parameters<Validator<Date>>;

export const isPropValidDate: Validator<Date> = (
  propsList: ValidatorParams[0],
  propName: ValidatorParams[1]
) => {
  const date = propsList[propName] as unknown;
  if (!date) return null;

  if (typeof date !== 'string' || !isParseableDate(date))
    return new Error(`The pre-selected date is not valid. Please enter a parseable date.
        See http://en.wikipedia.org/wiki/ISO_8601 for valid date formats.
      `);

  return null;
};
