import lodash from 'lodash';
import { useCallback } from 'react';

export const useDebounce = (
  effect: () => any,
  // effect: Promise<() => any>,
  dependencies: React.DependencyList,
  delay: number
) => {
  return useCallback(lodash.debounce(effect, delay), [dependencies]);

  // useEffect(() => {
  //   const timeout = setTimeout(callback, delay);
  //   return () => clearTimeout(timeout);
  // }, [callback, delay]);
};

export default useDebounce;
