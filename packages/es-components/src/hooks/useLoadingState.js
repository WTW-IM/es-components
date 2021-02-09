import { useMountedOnlyState } from './useMountedOnlyState';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const minLoadingTime = 500;

export function useLoadingState() {
  const [isLoading, setIsLoading] = useMountedOnlyState(false);
  async function start(theOperation) {
    setIsLoading(true);
    try {
      if (minLoadingTime) {
        await wait(minLoadingTime);
      }

      return await theOperation;
    } finally {
      setIsLoading(false);
    }
  }

  return [isLoading, start];
}
