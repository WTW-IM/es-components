import { useRef, useEffect, useState, useCallback } from 'react';

export type OriginalState<T> = T | (() => T);
export type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export function useMountedOnlyState<T>(origState: OriginalState<T>) {
  const isMountedRef = useRef(true);
  const [state, setState] = useState(origState);
  const setStateOrNoOp = useCallback<SetStateFunction<T>>(
    (stateOrStateSetter: React.SetStateAction<T>) => {
      return (
        Boolean(isMountedRef && isMountedRef.current) &&
        setState(stateOrStateSetter)
      );
    },
    []
  );
  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    []
  );

  return [state, setStateOrNoOp] as const;
}
