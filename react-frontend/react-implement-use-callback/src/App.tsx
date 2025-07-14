import React, { useState } from 'react'
import ChildComponent from './components/ChildComponent'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    //some logic
    console.log('button clicked')
  }

  return (
    <div>
      <h2>I'm the parent Component</h2>
      <p>Count: {count}</p>
      <button onClick={()=>setCount(count+1)}>Increment Count</button>
      <ChildComponent onClick={handleClick} />
    </div>
  )
}

export default App
