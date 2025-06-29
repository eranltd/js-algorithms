## Interview Question: Listening to Changes on `<textarea>` in React Using `MutationObserver`

### Goals
- Understand how to use the `MutationObserver` API to listen to DOM changes.
- Implement a React component that listens to changes on a `<textarea>` element.
- Use React hooks (`useEffect` and `useRef`) to manage the observer lifecycle.

### Assignment
Create a React component that:
1. Renders a `<textarea>` element.
2. Listens to changes in the `<textarea>` content using the `MutationObserver` API.
3. Logs the changes to the console in real-time.
4. Cleans up the observer when the component unmounts.

### Implementation

Here’s an example of how you can achieve this:

```tsx
import React, { useEffect, useRef } from 'react';

const TextareaWithObserver: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
   
    });

    
  }, []);

  return (
    <textarea
      ref={textareaRef}
      defaultValue="Type something here..."
      style={{ width: '100%', height: '100px' }}
    />
  );
};

export default TextareaWithObserver;
```

### Explanation
1. **`useRef`**: Used to get a reference to the `<textarea>` DOM element.
2. **`useEffect`**: Sets up the `MutationObserver` when the component mounts and cleans it up when the component unmounts.
3. **`MutationObserver`**: Observes changes to the DOM, specifically the content of the `<textarea>`.

### Notes
- The `MutationObserver` API is powerful but may not detect all changes (e.g., changes made via JavaScript that don't trigger DOM mutations). For such cases, consider combining it with other event listeners like `onInput` or `onChange`.
- This implementation is for educational purposes and may need adjustments for production use.
- Ensure browser compatibility for the `MutationObserver` API if targeting older browsers.
- For performance, avoid observing unnecessary mutations or large DOM trees.

Good luck!
