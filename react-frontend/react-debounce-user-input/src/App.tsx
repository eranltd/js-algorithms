import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DEBOUNCE_DELAY = 500 // milliseconds
const GET_SEARCH_URL = (search_term:string) => `https://api.duckduckgo.com/?q=${search_term}&format=json&no_redirect=1&no_html=1&skip_disambig=1`



function App() {

  const [searchResults, setSearchResults] = useState<string>( 'Search results will appear here')
  const [, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchResults('Searching...') // Reset search results to indicate loading
    const value = e.target.value
    
    setIsLoading(true) // Set loading state to true

    fetch(GET_SEARCH_URL(value))
      .then((response) => response.json())
      .then((data) => {
        const result = data?.AbstractText || data?.Abstract || 'No results found'
          setSearchResults(JSON.stringify(result)) //ADD debounce here
        setIsLoading(false) // Set loading state to false after fetching results
        // Use debounce to limit the frequency of updates
      })
      .catch((error) => {
        console.error('Error fetching search results:', error)
        setSearchResults('Error fetching search results')
      })
    setSearchTerm(value)
  }

  /**
 * Creates a debounced version of a function that delays its execution until after
 * a specified delay has elapsed since the last time it was invoked.
 *
 * @param func - The function to debounce.
 * @param delay - The number of milliseconds to delay.
 * @returns A debounced version of the input function.
 *
 * How it works:
 * - Each time the returned function is called, it clears the previous timer (if any).
 * - It then sets a new timer to execute the original function after the specified delay.
 * - If the returned function is called again before the delay ends, the timer is reset.
 *
 * Example:
 * ```tsx
 * const log = debounce(() => console.log('Hello!'), 300);
 * log(); // Call 1
 * log(); // Call 2 (resets timer)
 * // "Hello!" is logged only once, 300ms after the last call.
 * ```
 */
  const debounce = (func: (...args: unknown[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return (...args: unknown[]) => {
      // console.log('debounce called with args:', args)
      // console.log('clearing previous timer', timeoutId)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
      }, delay)
    } 
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Debounce User Input assignment</h1>
      <div className="card">
        <span style={{marginLeft:'5px'}}>Searching For: </span>

        <input onChange={debounce(onInputChange,DEBOUNCE_DELAY )} />
      </div>
      <div className="card">
      {isLoading?<Skeleton count={5} /> // Five-line loading skeleton
:
        <textarea rows={10} cols={50} value={searchResults} readOnly />
  }</div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
