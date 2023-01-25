/* eslint-disable react/prop-types */

import React from 'react';
import ReactComponentRenderer from 'react-styleguidist/lib/client/rsg-components/ReactComponent/ReactComponentRenderer';
import getInterpolatedContent from './getInterpolatedContent';

export default function ComponentRenderer({ examples, ...props }) {
  const interpolatedExamples = examples.props.examples.map(example => ({
    ...example,
    content: getInterpolatedContent(example.content)
  }));
  const newExamples = React.cloneElement(examples, {
    examples: interpolatedExamples
  });
  return <ReactComponentRenderer {...props} examples={newExamples} />;
}
