import { useMountedOnlyState } from './useMountedOnlyState';

export function useLoadingState() {
  const [isLoading, setIsLoading] = useMountedOnlyState(false);
  async function start(theOperation) {
    setIsLoading(true);
    try {
      return await theOperation;
    } finally {
      setIsLoading(false);
    }
  }

  return [isLoading, start];
}
