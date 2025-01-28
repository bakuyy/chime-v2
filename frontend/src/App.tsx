import { useState } from 'react'
import {Routes,Route, Navigate} from "react-router-dom"
import Login from "../src/pages/public/Login"
import Register from './pages/public/Register'
import NotFound from './pages/NotFound'
import Home from './pages/public/Home'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      
    </>
  )
}

export default App
