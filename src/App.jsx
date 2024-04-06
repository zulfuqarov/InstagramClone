import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from "./pages/Register"
import Catalog from "./pages/Catalog"
import Message from "./pages/Catalog"

const App = () => {
  return (
    <BrowserRouter>
      <div className='flex '>
        <Catalog />
        <div className='border-l-[1px] border-gray-200 h-[100%] py-[100px] w-[70%] '>
          <Routes>
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/Message" element={<Message />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App