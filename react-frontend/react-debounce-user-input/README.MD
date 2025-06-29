# Performance Monitoring & Debouncing/Throttling User Input

## Challenge

Create a search input field that fetches search results from an API as the user types. Use debouncing to ensure the API call is only triggered after the user has stopped typing for a short period (e.g., 300ms). Display the search query and the number of results found.

## Key Questions

1. **Why is debouncing important?**
    - What problems could arise if debouncing is not implemented?

2. **How to implement debouncing in React?**
    - What hooks or techniques can be used in a functional component?

3. **When to use throttling instead of debouncing?**
    - For example, in scenarios like scroll or drag events.

4. **How to show a loading indicator?**
    - What strategies can be used to indicate that an API call is in progress?

5. **How to handle ongoing API requests?**
    - What approaches can cancel previous API requests if a new search query is entered before the previous one completes?