// This simulates a "module scope" where state would persist between "renders"
let lastArgs = null;
let lastCallback = null;

function myUseCallback(callback, dependencies) {
  // Check if dependencies have changed
  let dependenciesChanged = false;
  if (lastArgs === null || lastArgs.length !== dependencies.length) {
    dependenciesChanged = true;
  } else {
    for (let i = 0; i < dependencies.length; i++) {
      if (lastArgs[i] !== dependencies[i]) {
        dependenciesChanged = true;
        break;
      }
    }
  }

  // If dependencies changed, create a new callback and store it
  if (dependenciesChanged) {
    lastArgs = dependencies;
    lastCallback = callback;
  }

  // Always return the stored callback
  return lastCallback;
}

/*
How It Works 💡

lastArgs and lastCallback: These variables act as our "memory." They store the dependencies and the memoized callback function from the previous "render." In a real React hook, this state is managed internally by React for each component.

Dependency Check: The code first checks if this is the first render (lastArgs === null) or if the number of dependencies has changed. If not, it loops through the dependencies to see if any of them have a different value than what's stored in lastArgs.

Memoization:

If the dependencies have changed, it updates lastArgs and lastCallback with the new values.

If the dependencies are the same, it does nothing and simply returns the lastCallback that was already stored.

This simplified version illustrates the fundamental principle of useCallback without the complexity of the actual React hook lifecycle.
*/