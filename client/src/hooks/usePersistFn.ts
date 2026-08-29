import { useCallback, useRef } from "react";

/**
 * Returns a stable function identity whose body always sees the latest props
 * and state. Useful for callbacks passed into imperative APIs (map handlers,
 * event listeners) that should not be re-bound on every render.
 */
export function usePersistFn<T extends (...args: never[]) => unknown>(fn: T): T {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const persisted = useCallback((...args: Parameters<T>) => {
    return fnRef.current(...(args as never[]));
  }, []);

  return persisted as unknown as T;
}

export default usePersistFn;
