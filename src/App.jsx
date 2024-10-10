import { useState } from 'react'
import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Home from './pages/home/Home';


function App() {
  
   const {authUser} = useAuthContext();
   console.log("authuser", authUser)
  return (
    <>
     <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />} />
          <Route path="/signup" element={ authUser ?<Navigate to={'/'} /> :<SignUp />} />
          <Route path='/login' element={ authUser ? <Navigate to={'/'} /> : <Login />} />
        </Routes>
        <Toaster />
     </div>
    </>
  )
}

export default App
