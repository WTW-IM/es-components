import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useMergedRefs } from './callRef';

const ESCAPE_KEY = 'Escape';

type RootCloseEvent = MouseEvent | KeyboardEvent;

type RootCloseWrapperProps = Override<
  JSXElementProps<'div'>,
  {
    children: React.ReactNode;
    onRootClose: (rootCloseEvent: RootCloseEvent) => void;
    disabled: boolean;
  }
>;

function isLeftClick(event: MouseEvent) {
  return event.button === 0;
}

function isModifiedClick(event: MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

// Keeps the latest onRootClose/disabled values available to the document
// listeners below without needing to re-attach them on every render.
// Updated in a layout effect (not during render) per the react-hooks/refs
// rule.
function useLatest<T>(value: T) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}

/**
 * Closes the wrapped content when the user clicks (or presses escape)
 * outside of it. Hand-rolled with native DOM listeners (no third-party
 * dependency) using the wrapper's own DOM node directly.
 */
function useRootClose(
  nodeRef: React.RefObject<HTMLElement | null>,
  onRootClose: (rootCloseEvent: RootCloseEvent) => void,
  disabled: boolean
) {
  const onRootCloseRef = useLatest(onRootClose);

  useEffect(() => {
    if (disabled) {
      return undefined;
    }

    // Ignore the click/keyup that's already in flight when the listeners
    // are attached (e.g. the same click that just opened the menu).
    const currentEvent: Event | undefined = window.event;

    const handlePointerDown = (event: MouseEvent) => {
      if ((event as Event) === currentEvent) {
        return;
      }
      const node = nodeRef.current;
      if (
        !node ||
        isModifiedClick(event) ||
        !isLeftClick(event) ||
        node.contains(event.target as Node)
      ) {
        return;
      }
      onRootCloseRef.current(event);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if ((event as Event) === currentEvent) {
        return;
      }
      if (event.key === ESCAPE_KEY) {
        onRootCloseRef.current(event);
      }
    };

    document.addEventListener('click', handlePointerDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('click', handlePointerDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [nodeRef, disabled, onRootCloseRef]);
}

const RootCloseWrapper = React.forwardRef<
  HTMLDivElement,
  RootCloseWrapperProps
>(function ForwardedRootCloseWrapper(
  { children, onRootClose, disabled, className },
  ref
) {
  const rootCloseRef = useRef<HTMLDivElement>(null);
  useRootClose(rootCloseRef, onRootClose, disabled);

  const handleRef = useMergedRefs(rootCloseRef, ref);

  return (
    <div ref={handleRef} className={`root-close-wrapper ${className || ''}`}>
      {children}
    </div>
  );
});

export default RootCloseWrapper;
