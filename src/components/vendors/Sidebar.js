import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="col-md-2">
      <div className="sidenav ">
        <Link to="/VendorDashboard">Dashboard</Link>
        <a href="/VendorFlyers">Flyers</a>
        <a href="/VendorDeals">Deals</a>
        <a href="/VendorOffers">Offers</a>
        <a href="/VendorBanners">Banners</a>
        {/* <a href="/VendorWishes">WishList</a> */}
        {/* <Link to="/VendorBanners">Wallets</Link> */}
        <a href="/VendorCreateBusiness">Business</a>
        <div className="upgrade-box">
          Upgrade Dealzup<br />
          Enjoy 2 month <br /> free Trial!
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
