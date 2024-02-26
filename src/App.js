import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserLogin from './components/UserLogin';
import UserRegistration from './components/UserRegistration';
import Footer from './components/Footer';
import ForgotPassword from './components/ForgotPassword';
import SpinWinGame from './components/SpinWinGame';
import LandingPage from './components/LandingPage';
import { useState } from 'react';


function App() {
  const [mode, setMode]  = useState('light'); //default appearance
  // whether dark mode is enabled or not.
  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark')
      // document.body.style.backgroundColor="#212529";
      document.body.style.backgroundColor="#0C0C0C";
      document.body.style.color="white";
      document.body.style.border="white";
   
    }else{
      setMode('light')
      document.body.style.backgroundColor="#f9f9f9";
      document.body.style.color="black";
      document.body.style.border="black";
      
    }
  }
  return (
    <>
    <Router>
        <Navbar mode={mode} toggleMode={toggleMode} /> 
        <Routes>
          <Route path="/" element={<LandingPage  />} />
          <Route path="/login" element={<UserLogin  />} />
          <Route path="/registration" element={<UserRegistration  />} /> 
          <Route path="/forgotpassword" element={<ForgotPassword  />} />
          <Route path="/Spin" element={<SpinWinGame  />} />
        </Routes>
        <Footer  />
    </Router>
    </>
  );
}

export default App;
