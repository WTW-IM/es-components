import { useMemo } from 'react';
import generateAlphaName from './generateAlphaName';

// from: https://gist.github.com/codeguy/6684588?permalink_comment_id=4325476#gistcomment-4325476
const slugify = (text: string) =>
  text
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/_/g, '-') // Replace _ with -
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/-$/g, '');

let testNameCount = 0;
const getIdName = () => {
  try {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') {
      const currentTestName = expect.getState().currentTestName;
      if (currentTestName) {
        testNameCount += 1;
        return slugify(`${currentTestName}-${testNameCount}`);
      }
    }
  } catch (err) {
    console.warn(
      'Error getting test name for unique id; falling back to truly-unique id',
      err
    );
  }

  return generateAlphaName();
};

export default function useUniqueId(providedId?: Maybe<string>) {
  const idRef = useMemo(() => providedId || getIdName(), [providedId]);
  return idRef;
}
