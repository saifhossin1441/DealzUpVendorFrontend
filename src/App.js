import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SliderComponent from './components/Slider';
import UserLogin from './pages/UserLogin';
import Footer from './components/Footer';
import SpinWinGame from './components/SpinWinGame';
import UserRegistration from './pages/UserRegistration';
import ForgotPassword from './pages/ForgotPassword';
import LandingPage from './pages/LandingPage';
import VendorDashboard from './pages/vendor/VendorDashboard'
import VendorProfile from './pages/vendor/VendorProfile'
import VendorWallets from './pages/vendor/VendorWallets'
import Header from './components/vendors/Header';
import VendorCreateBusiness from './pages/vendor/VendorCreateBusiness';

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
      <Routes>
        <Route path="/" element={<><Navbar mode={mode} toggleMode={toggleMode} /><LandingPage /><Footer /></>} />
        <Route path="/login" element={<><Navbar mode={mode} toggleMode={toggleMode} /><UserLogin /><Footer /></>} />
        <Route path="/registration" element={<><Navbar mode={mode} toggleMode={toggleMode} /><UserRegistration /><Footer /></>} />
        <Route path="/Forgotpassword" element={<><Navbar mode={mode} toggleMode={toggleMode} /><ForgotPassword /><Footer /></>} />
        <Route path="/Spin" element={<><Navbar mode={mode} toggleMode={toggleMode} /><SpinWinGame /><Footer /></>} />
        <Route path="/slider" element={<><Navbar mode={mode} toggleMode={toggleMode} /><SliderComponent /><Footer /></>} />
        <Route path="/VendorDashboard" element={<><Header mode={mode} toggleMode={toggleMode}/><VendorDashboard ><VendorDashboard /></VendorDashboard></>} />
        <Route path="/VendorWallets" element={<><Header mode={mode} toggleMode={toggleMode}/><VendorWallets><VendorWallets /></VendorWallets></>} />
        <Route path="/VendorProfile" element={<><Header mode={mode} toggleMode={toggleMode}/><VendorProfile><VendorProfile /></VendorProfile></>} />
        <Route path="/VendorCreateBusiness" element={<><Header mode={mode} toggleMode={toggleMode}/><VendorCreateBusiness><VendorCreateBusiness /></VendorCreateBusiness></>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
