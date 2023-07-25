import getInterpolatedContent from './getInterpolatedContent';
import { Example } from 'orig-sg-typings';

function getInterpolatedExample(ex: Example) {
  return {
    ...ex,
    content: getInterpolatedContent(ex.content)
  };
}

export default function getInterpolatedExamples(
  examplesList: Example[]
): Example[] {
  return examplesList.map(getInterpolatedExample);
}
