import React, { useState } from 'react'

const Counter = () => {
  const [ counter, setcounter] = useState(0)
  return (
    <div className="counter">
    <button 
    onClick={()=>setcounter((prev) => prev + 1)}
    type="button">+</button>

    <h3>{counter}</h3>

      <button 
      onClick={()=>setcounter((prev) => prev - 1)}
      type="button">-</button>
      <button 
      onClick={()=>setcounter(0)}
    type="button">reset to 0</button>
    </div>
  )
}
export default Counter
