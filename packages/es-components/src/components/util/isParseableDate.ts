import { parseJSON, parseISO, isValid } from 'date-fns';

type ParseableDate = Parameters<typeof parseJSON>[0];

export default function isParseableDate(date: ParseableDate) {
  if (!date) return false;

  // If already a date, returns true
  // Otherwise, parses ISO
  const parsedUTCDate = parseJSON(date);
  if (isValid(parsedUTCDate)) return true;

  let parsedDate: Date;
  try {
    // Parses ISOs missing time. i.e. 2020-10-01
    parsedDate = parseISO(date);
  } catch {
    return false;
  }

  return isValid(parsedDate);
}
