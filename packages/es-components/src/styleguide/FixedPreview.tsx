import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import OrigPreview from 'orig-sg-components/Preview/Preview';
import PlaygroundError from 'orig-sg-components/PlaygroundError';
import ReactExample from 'orig-sg-components/ReactExample';
import RSGContext from 'orig-sg-components/Context';
import { ProcessedStyleguidistConfig } from 'orig-sg-typings';

type PreviewComponent = typeof OrigPreview;
type PreviewProps = React.ComponentProps<PreviewComponent>;

export default function FixedPreview({ code, evalInContext }: PreviewProps) {
  const [error, setError] = useState('');
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const { config, codeRevision } = useContext(RSGContext);
  const [root, setRoot] = useState<Root>();

  const updateError = useCallback((err: Error) => {
    const errMessage = err
      .toString()
      .replace(
        'Check the render method of `StateHolder`.',
        'Check the code of your example in a Markdown file or in the editor below.'
      );
    setError(errMessage);
  }, []);

  const handleError = useCallback(
    (err: Error) => {
      updateError(err);
      console.error(err); // eslint-disable-line no-console
    },
    [updateError]
  );

  useEffect(
    function clearConsoleWithNewCodeRevision() {
      if (codeRevision > 0) {
        console.clear();
      }
    },
    [codeRevision]
  );

  useEffect(
    function clearErrorWithNewCode() {
      setError('');
    },
    [code]
  );

  useEffect(
    function renderExample() {
      if (!root) return;

      root.render(
        <ReactExample
          {...{
            code,
            evalInContext,
            onError: handleError,
            compilerConfig: config.compilerConfig as ProcessedStyleguidistConfig
          }}
        />
      );
    },
    [evalInContext, config, handleError, code, root]
  );

  useEffect(
    function createRootWithMountNode() {
      if (!mountNode) return;

      const newRoot = createRoot(mountNode);
      setRoot(newRoot);

      return () => {
        setTimeout(() => {
          newRoot.unmount();
        });
        setRoot(undefined);
      };
    },
    [mountNode]
  );

  return (
    <>
      <div ref={setMountNode} />
      {error ? <PlaygroundError message={error} /> : <></>}
    </>
  );
}

FixedPreview.propTypes = { ...OrigPreview.propTypes };
