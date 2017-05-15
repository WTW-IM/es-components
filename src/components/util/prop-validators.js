import parse from 'date-fns/parse';
import isValid from 'date-fns/is_valid';

export function isParseableDate(props, propName, componentName) {
  const date = props[propName];
  if (date) {
    const parsedDate = parse(props[propName]);
    if (!isValid(parsedDate)) {
      return new Error(`The pre-selected date is not valid. Please enter a parseable date.
        See http://en.wikipedia.org/wiki/ISO_8601 for valid date formats.
      `);
    }
    return null;
  }
  return null;
}
