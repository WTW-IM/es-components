import React, { useCallback } from 'react';

const callRef = <T, R extends React.ForwardedRef<T>>(ref: Maybe<R>, value: T) =>
  typeof ref === 'function'
    ? ref(value)
    : ref && Object.hasOwn(ref, 'current') && (ref.current = value);

export default callRef;

export function callRefs<T, R extends Maybe<React.ForwardedRef<T>>>(
  value: T,
  ...refs: R[]
) {
  refs.forEach(r => callRef(r, value));
}

export function useMergedRefs<T>(...refs: React.Ref<T>[]) {
  const mergedRefs = useCallback<React.RefCallback<T>>(
    el => {
      callRefs(el, ...refs);
    },
    [...refs] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return mergedRefs;
}
