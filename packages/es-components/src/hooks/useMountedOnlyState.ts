import { useRef, useEffect, useState, useCallback } from 'react';

export type OriginalState<T> = T | (() => T);
export type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export function useMountedOnlyState<T = undefined>(
  origState: OriginalState<T | undefined>
): [T | undefined, SetStateFunction<T | undefined>];
export function useMountedOnlyState<T>(
  origState: OriginalState<T>
): [T, SetStateFunction<T>];
export function useMountedOnlyState<T>(origState?: OriginalState<T>) {
  const isMountedRef = useRef(true);
  const [state, setState] = useState(origState);
  const setStateOrNoOp = useCallback<SetStateFunction<T | undefined>>(
    (stateOrStateSetter: React.SetStateAction<T | undefined>) => {
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
