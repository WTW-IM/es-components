import { useRef } from 'react';
import generateAlphaName from './generateAlphaName';

export default function useUniqueId() {
  const idRef = useRef(generateAlphaName());
  return idRef.current;
}
