import isParseableDate from './isParseableDate';

export function isPropValidDate(props, propName, componentName) {
  const date = props[propName];
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
