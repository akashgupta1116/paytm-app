import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashborad'
import SendMoney from './pages/SendMoney'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/signin" element = {<Signin/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
        <Route path = "/sendmoney" element = {<SendMoney/>}/>
      </Routes>
    </BrowserRouter>    
  )
}

export default App
