import { useRef } from 'react';
import generateAlphaName from './generateAlphaName';

export default function useUniqueId(providedId) {
  const idRef = useRef(providedId || generateAlphaName());
  return idRef.current;
}
