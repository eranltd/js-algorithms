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

6. **How to handle errors in API calls?**
    - What is the best way to inform the user if an error occurs during the API call?

7. **Show nice spinner | animations**
    - while fetching the data, show a spinner or some animation to indicate loading. (your choice)

## Notes
- use fake API like [JSONPlaceholder](https://jsonplaceholder.typicode.com/) or [Mocky](https://www.mocky.io/) for the actual API call.

- you can also use DuckDuckGo Instant Answer API:
  - search_term is the query string parameter (input value)
  - https://api.duckduckgo.com/?q={search_term}&format=json&no_redirect=1&no_html=1&skip_disambig=1