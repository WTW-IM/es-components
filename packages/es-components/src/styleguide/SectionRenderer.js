/* eslint-disable react/prop-types */

import React from 'react';
import OrigSectionRenderer from 'react-styleguidist/lib/client/rsg-components/Section/SectionRenderer';
import getInterpolatedContent from './getInterpolatedContent';

export default function SectionRenderer({ content, ...props }) {
  if (!content) {
    return <OrigSectionRenderer {...{ ...props, content }} />;
  }

  const interpolatedExamples = content.props?.examples?.map(example => ({
    ...example,
    content: getInterpolatedContent(example.content)
  }));
  const newContent = React.cloneElement(content, {
    examples: interpolatedExamples
  });
  return <OrigSectionRenderer {...props} content={newContent} />;
}
