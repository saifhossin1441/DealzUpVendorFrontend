import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/CustomNavbar';
import UserLogin from './pages/UserLogin';
import Footer from './components/Footer';
import UserRegistration from './pages/UserRegistration';
import ForgotPassword from './pages/ForgotPassword';
import LandingPage from './pages/LandingPage';
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorProfile from './pages/vendor/VendorProfile';
import VendorWallets from './pages/vendor/VendorWallets';
import VendorCreateBusiness from './pages/vendor/VendorCreateBusiness';
import VendorCreateBusinessPagination from './pages/vendor/VendorCreateBusinessPagination';
import VendorFlyers from './pages/vendor/VendorFlyers';
import VendorCreateFlyers from './pages/vendor/VendorCreateFlyers';
import VendorDeals from './pages/vendor/VendorDeals';
import VendorCreateDeals from './pages/vendor/VendorCreateDeals';
import VendorOffers from './pages/vendor/VendorOffers';
import VendorCreateOffers from './pages/vendor/VendorCreateOffers';
import VendorBanners from './pages/vendor/VendorBanner';
import VendorCreateBanners from './pages/vendor/VendorCreateBanners';
import VendorRegistration from './pages/vendor/VendorRegistration';
import VendorLogin from './pages/vendor/VendorLogin';
import VendorForgotPassword from './pages/vendor/VendorForgotPassword';
import VendorVerification from './pages/vendor/VendorVerification';
import VendorResetPassword from './pages/vendor/VendorResetPassword';
import VendorAddToWallet from './pages/vendor/VendorAddToWallet';
import { ToastContainer } from 'react-toastify'
import VendorWishes from './pages/vendor/VendorWishes';
import MembershipPlan from './pages/vendor/MembershipPlan';
import GoogleMaps from './pages/vendor/Maps';

function App() {
  const [mode, setMode] = useState('light'); // default appearance

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = "#0C0C0C";
      document.body.style.color = "white";
      document.body.style.border = "white";
    } else {
      setMode('light');
      document.body.style.backgroundColor = "#f9f9f9";
      document.body.style.color = "black";
      document.body.style.border = "black";
    }
  };

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<><CustomNavbar mode={mode} toggleMode={toggleMode} /><LandingPage /><Footer /></>} />
          <Route path="/login" element={<><CustomNavbar mode={mode} toggleMode={toggleMode} /><UserLogin /><Footer /></>} />
          <Route path="/registration" element={<><CustomNavbar mode={mode} toggleMode={toggleMode} /><UserRegistration /><Footer /></>} />
          <Route path="/ForgotPassword" element={<><CustomNavbar mode={mode} toggleMode={toggleMode} /><ForgotPassword /><Footer /></>} />
          <Route path="/VendorLogin" element={<><CustomNavbar mode={mode} toggleMode={toggleMode} /><VendorLogin /><Footer /></>} />
          <Route path="/VendorVerification" element={<><VendorVerification /></>} />
          <Route path="/VendorResetPassword" element={<><VendorResetPassword /></>} />
          <Route path="/VendorRegistration" element={<><CustomNavbar mode={mode} toggleMode={toggleMode} /><VendorRegistration /><Footer /></>} />
          {/* Vendors */}
          <Route path="/VendorForgotPassword" element={<><CustomNavbar mode={mode} toggleMode={toggleMode} /><VendorForgotPassword /><Footer /></>} />
          <Route path="/VendorDashboard" element={<VendorDashboard />} />
          <Route path="/VendorWallets" element={<VendorWallets />} />
          <Route path="/VendorAddToWallet" element={<VendorAddToWallet />} />
          <Route path="/VendorProfile" element={<VendorProfile />} />
          <Route path="/VendorCreateBusiness" element={<VendorCreateBusiness />} />
          <Route path="/VendorCreateBusinessPagination" element={<VendorCreateBusinessPagination />} />
          <Route path="/VendorFlyers" element={<VendorFlyers />} />
          <Route path="/VendorCreateFlyers" element={<VendorCreateFlyers />} />
          <Route path="/VendorDeals" element={<VendorDeals />} />
          <Route path="/VendorCreateDeals" element={<VendorCreateDeals />} />
          <Route path="/VendorOffers" element={<VendorOffers />} />
          <Route path="/VendorCreateOffers" element={<VendorCreateOffers />} />
          <Route path="/VendorBanners" element={<VendorBanners />} />
          <Route path="/VendorCreateBanners" element={<VendorCreateBanners />} />
          <Route path="/VendorWishes" element={<VendorWishes />} />
          <Route path="/VendorMembershipPlan" element={<MembershipPlan />} />
          <Route path="/GoogleMaps" element={<GoogleMaps />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
