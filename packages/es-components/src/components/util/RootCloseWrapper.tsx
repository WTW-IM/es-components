import React, { useRef } from 'react';
import { useRootClose } from 'react-overlays';
import { useMergedRefs } from './callRef';

type RootCloseWrapperProps = Override<
  JSXElementProps<'div'>,
  {
    children: React.ReactNode;
    onRootClose: (
      ...rootCloseArgs: Parameters<Parameters<typeof useRootClose>[1]>
    ) => void;
    disabled: boolean;
  }
>;

const RootCloseWrapper = React.forwardRef<
  HTMLDivElement,
  RootCloseWrapperProps
>(function ForwardedRootCloseWrapper(
  { children, onRootClose, disabled, className },
  ref
) {
  const rootCloseRef = useRef<HTMLDivElement>(null);
  useRootClose(rootCloseRef.current, onRootClose, {
    disabled
  });

  const handleRef = useMergedRefs(rootCloseRef, ref);

  return (
    <div ref={handleRef} className={`root-close-wrapper ${className || ''}`}>
      {children}
    </div>
  );
});

export default RootCloseWrapper;
