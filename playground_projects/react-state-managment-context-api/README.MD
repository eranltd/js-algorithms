### 4. State Management with Context API & Custom Hooks

#### Challenge
Build a simple e-commerce product display with a shopping cart. Use the Context API for global state management to handle:
- Adding/removing items
- Total count
- Total price

Additionally, create custom hooks for interacting with the cart context.

---

#### Discussion Topics

1. **When to Use Context API**
    - When is the Context API a good choice for state management?
    - When might you consider a more robust solution like Redux or Zustand?

2. **Implementation**
    - How to create a `CartProvider` and a `useCart` custom hook.

3. **Optimization**
    - How to optimize re-renders if your context contains frequently changing data that not all consumers need (e.g., memoization techniques).

4. **Trade-offs**
    - What are the trade-offs between prop drilling and using Context?

5. **State Persistence**
    - How to persist the cart state to `localStorage` so it remains after a page refresh.