import { useRef, useEffect, DependencyList } from 'react';

/**
 * A custom implementation of the useCallback hook.
 *
 * @template T The type of the callback function.
 * @param {T} callback The callback function to memoize.
 * @param {DependencyList} dependencies An array of dependencies.
 * @returns {T} The memoized callback function.
 */
export const useCustomCallback = <T extends (...args: any[]) => any>(
  callback: T,
  dependencies: DependencyList
): T => {
  // Use a ref to store the callback function.
  const callbackRef = useRef<T>(callback);

  // Update the stored callback whenever the original callback changes.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Use a ref to store the memoized callback.
  const memoizedCallbackRef = useRef<T>(((...args: any[]) => {
    return callbackRef.current(...args);
  }) as T);

  // Use a ref to store the previous dependencies.
  const prevDependenciesRef = useRef<DependencyList>(dependencies);

  // Compare current dependencies with previous dependencies.
  const haveDependenciesChanged = dependencies.some(
    (dep, i) => dep !== prevDependenciesRef.current[i]
  );

  // If dependencies have changed, create a new memoized callback.
  if (haveDependenciesChanged) {
    memoizedCallbackRef.current = ((...args: any[]) => {
      return callbackRef.current(...args);
    }) as T;
    prevDependenciesRef.current = dependencies;
  }

  return memoizedCallbackRef.current;
};


/*

How It Works 🤔

callbackRef: A useRef hook holds the most recent version of the callback function. This is important because we need to be able to call the latest callback from within our memoized function, without causing the memoized function itself to be recreated.

useEffect to Update callbackRef: This useEffect hook runs whenever the callback prop changes. It updates callbackRef.current to the new callback. This ensures that our memoized function will always call the latest version of the callback passed to the hook.

memoizedCallbackRef: This ref holds the function that we will return. By storing it in a ref, we ensure that the same function reference is returned on every render unless the dependencies change.

Dependency Comparison:

prevDependenciesRef stores the dependencies from the previous render.

The haveDependenciesChanged variable checks if any of the current dependencies are different from the prevDependenciesRef.

If a dependency has changed, we create a new function and update memoizedCallbackRef.current and prevDependenciesRef.current.

Return Value: The hook returns the function stored in memoizedCallbackRef.current. This will be the same function reference across re-renders until a dependency changes.
*/