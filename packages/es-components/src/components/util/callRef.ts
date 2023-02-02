import React from 'react';

const callRef = <T, R extends React.ForwardedRef<T>>(ref: Maybe<R>, value: T) =>
  typeof ref === 'function' ? ref(value) : ref && (ref.current = value);

export default callRef;

export function callRefs<T, R extends React.ForwardedRef<T>>(
  value: T,
  ...refs: Array<R>
) {
  refs.forEach(r => callRef(r, value));
}
