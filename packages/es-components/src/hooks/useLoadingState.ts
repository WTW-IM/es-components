import { useCallback } from 'react';
import { useMountedOnlyState } from './useMountedOnlyState';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const minLoadingTime = 500;

export function useLoadingState() {
  const [isLoading, setIsLoading] = useMountedOnlyState(false);
  const start = useCallback(
    async (theOperation: Promise<void>) => {
      setIsLoading(true);
      try {
        if (minLoadingTime) {
          await wait(minLoadingTime);
        }

        return await theOperation;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  return [isLoading, start] as const;
}
