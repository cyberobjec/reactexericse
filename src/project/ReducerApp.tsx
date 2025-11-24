import { useReducer } from 'react'

function counterReducer(
  state: number,
  action: { type: 'inc' | 'dec' | 'reset' }
) {
  switch (action.type) {
    case 'inc':
      return state + 1
    case 'dec':
      return state - 1
    case 'reset':
      return 0
    default:
      return state // 必写，防止未来加新 action
  }
}

export const ReducerApp = () => {
  const [count, dispatch] = useReducer(counterReducer, 0)
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch({ type: 'inc' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'dec' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}
