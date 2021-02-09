import { useRef, useEffect, useState } from 'react';

export function useMountedOnlyState(origState) {
  const isMountedRef = useRef(true);
  const isMounted = () => Boolean(isMountedRef && isMountedRef.current);
  const [state, setState] = useState(origState);
  const setStateOrNoOp = useRef(
    stateOrStateSetter => isMounted() && setState(stateOrStateSetter)
  );
  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    []
  );

  return [state, setStateOrNoOp.current];
}
