import isParseableDate from './isParseableDate';

export function isPropValidDate(propsList, propName, componentName) {
  const date = propsList[propName];
  if (date) {
    if (!isParseableDate(date)) {
      return new Error(`The pre-selected date is not valid. Please enter a parseable date.
        See http://en.wikipedia.org/wiki/ISO_8601 for valid date formats.
      `);
    }
    return null;
  }
  return null;
}
