import React from 'react';

export default function onNonNumericHandler<T>(event: React.KeyboardEvent<T>) {
  // prevent other normally allowed numeric keys: e, +, -, .
  if (
    event.key === 'e' ||
    event.key === '+' ||
    event.key === '-' ||
    event.key === '.'
  ) {
    event.preventDefault();
  }
}
