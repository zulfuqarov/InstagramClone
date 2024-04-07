import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from './page/Home';
import Login from './page/Login';
import Post from './components/Post';
import Profile from './page/Profile';
import Register from './page/Register';
import HomeIndex from './components/HomeIndex';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route index={true} element={<HomeIndex />} />
          <Route path="post" element={<Post />} />
        </Route >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App