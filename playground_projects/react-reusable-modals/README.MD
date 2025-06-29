### 3. Reusable Modals/Dialogs with Accessibility & Portals

**Challenge:**  
Design and implement a reusable Modal component in React with the following features:

- **Controllable Behavior:** The modal should open and close via props.
- **React Portal:** Render the modal content to a specific DOM node outside the main React root (e.g., directly under `<body>`).
- **Accessibility Features:**
    - Trap focus inside the modal when it is open.
    - Close the modal when the Escape key is pressed.
    - Announce its presence to screen readers using attributes like `aria-modal` and `aria-labelledby`.
    - Prevent background scrolling when the modal is open.

**Discussion Questions:**

1. **React Portals:**  
     - Why are React Portals essential for components like modals?  
     - What problems do they solve?

2. **Focus Trapping:**  
     - What are the steps to implement focus trapping?  
     - Why is it important for accessibility?

3. **Keyboard Events:**  
     - How do you handle global keyboard events (e.g., Escape key) in a React application, specifically for modals?

4. **Background Scrolling:**  
     - What challenges arise when preventing background scrolling?  
     - How would you implement this effectively?

5. **Managing Multiple Modals:**  
     - How would you handle multiple modals being open simultaneously?  
     - How would you manage their `z-index`?
