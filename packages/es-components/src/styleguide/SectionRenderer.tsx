import React from 'react';
import PropTypes from 'prop-types';
import OrigSectionRenderer from 'orig-sg-components/Section/SectionRenderer';
import getInterpolatedExamples from './getInterpolatedExamples';
import type { ExamplesComponentProps } from './ComponentRenderer';

type PossibleExamplesElement = React.ReactElement<
  Partial<ExamplesComponentProps>
>;

type SectionRendererPropTypes = React.ComponentPropsWithoutRef<
  typeof OrigSectionRenderer
> & {
  content?: PossibleExamplesElement;
};

function interpolateExamples(content: Maybe<PossibleExamplesElement>) {
  if (!React.isValidElement(content)) {
    return content;
  }

  return React.cloneElement(content, {
    ...(content.props || {}),
    examples: getInterpolatedExamples(content.props?.examples || [])
  });
}

const SectionRenderer: typeof OrigSectionRenderer = ({
  content,
  ...props
}: SectionRendererPropTypes) => {
  const newContent = interpolateExamples(content);
  return <OrigSectionRenderer {...props} content={newContent} />;
};

SectionRenderer.propTypes = {
  ...(OrigSectionRenderer?.propTypes || {}),
  content: PropTypes.node
};

export default SectionRenderer;
