import { useRef } from 'react';
import generateAlphaName from './generateAlphaName';

export default function useUniqueId(providedId?: Maybe<string>) {
  const idRef = useRef(providedId || generateAlphaName());
  return idRef.current;
}
