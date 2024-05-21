import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from 'axios'

import Home from './page/Home';
import Login from './page/Login';
import Post from './components/Post';
import Profile from './page/Profile';
import Register from './page/Register';
import HomeIndex from './components/HomeIndex';
import AddPost from './page/AddPost';
import Context from './Context/Context';

import Message from './page/Message';
import Search from './page/Search';



axios.defaults.withCredentials = true;

const App = () => {
  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route index={true} element={<HomeIndex />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/Message" element={<Message />} />
            <Route path='Search' element={<Search />} />
            <Route path='Add-Post' element={<AddPost />} />
          </Route >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Context>
    </BrowserRouter>

  )
}

export default App