import React from 'react'

function App() {
  const [count, setCount] = React.useState(0)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Hello, React + TypeScript!</h1>
      <p>Current count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  )
}

export default App
