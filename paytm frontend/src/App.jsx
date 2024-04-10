import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className = "grid grid-cols-3">
      <div className = "colspan-3 bg-red-500"> 
        red 
      </div>
      <div className = "colspan-3 bg-blue-500"> 
        gray 
      </div>
      <div className = "colspan-3 bg-yellow-500"> 
        yellow 
      </div>
    </div>
  )
}

export default App
