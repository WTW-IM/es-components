import React from 'react';
import PropTypes from 'prop-types';
import ReactComponentRenderer from 'orig-sg-components/ReactComponent/ReactComponentRenderer';
import Examples from 'orig-sg-components/Examples';
import getInterpolatedExamples from './getInterpolatedExamples';

export type ExamplesComponent = typeof Examples;
export type ExamplesComponentProps =
  React.ComponentPropsWithoutRef<ExamplesComponent>;
export type ExamplesElement = React.ReactElement<ExamplesComponentProps>;

export type ComponentRendererProps = Override<
  React.ComponentPropsWithoutRef<typeof ReactComponentRenderer>,
  {
    examples: ExamplesElement;
  }
>;

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  examples,
  ...props
}) => {
  const newExamples = React.cloneElement(examples, {
    ...(examples.props || {}),
    examples: getInterpolatedExamples(examples.props.examples)
  });

  return <ReactComponentRenderer {...props} examples={newExamples} />;
};

ComponentRenderer.propTypes = {
  ...(ReactComponentRenderer?.propTypes || {}),
  examples: PropTypes.element.isRequired
};

export default ComponentRenderer;
