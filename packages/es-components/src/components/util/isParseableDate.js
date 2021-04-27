import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';

export default function isParseableDate(date) {
  const parsedDate = parse(date);
  return isValid(parsedDate);
}
