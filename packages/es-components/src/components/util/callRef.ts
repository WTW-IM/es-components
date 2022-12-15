import React from 'react';

const callRef = <T, R extends React.ForwardedRef<T>>(ref: R, value: T) =>
  typeof ref === 'function' ? ref(value) : ref && (ref.current = value);

export default callRef;
