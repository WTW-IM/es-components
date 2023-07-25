import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';

type ParseableDate = Parameters<typeof parse>[0];

export default function isParseableDate(date: ParseableDate) {
  const parsedDate = parse(date);
  return isValid(parsedDate);
}
