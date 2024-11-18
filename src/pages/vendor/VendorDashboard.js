import React from 'react';
import './../../assets/vendors/css/styles.css'; 
import Header from './../../components/vendors/Header';
import RightSidebar from './../../components/vendors/RightSidebar';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom';




const VendorDashboard = () => {
  return (
    <>
    <Header />
    <div class="container-fluid content-section align">
      <div class="row">
          <Sidebar />

          <div className="col-md-8" style={{ marginTop:10}}>
              <div className="col-md-12" style={{ textAlign: 'center' }}>
              <br />
              <h1  style={{ textAlign: 'center' }}> Welcome Saif</h1>
              <h6  style={{ textAlign: 'center' }}>Vendor</h6>
              </div>
              <div className="col-md-12"><br/></div>
              <div className="col-md-12">
                <div className="row" style={{ justifyContent: 'center' }}>
                    <div className="content-box col-md-5" style={{ backgroundColor: '#FAD6AD' }}>
                    <div style={{ color: '#000' }}><Link style={{color:"black"}} to="/VendorFlyers"> Flyers</Link></div>
                    <div className="circle" style={{ backgroundColor: '#000' }}>4</div>
                    <div style={{ color: '#000' }}><Link style={{color:"black"}} to="/VendorFlyers"> View More</Link></div>
                    </div>
                    <div className="content-box col-md-5">
                    <div><Link style={{color:"White"}} to="/VendorBanners">Banners</Link></div>
                    <div className="circle">3</div>
                    <div><Link style={{color:"White"}} to="/VendorBanners">View More</Link></div>
                    </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="row" style={{ justifyContent: 'center' }}>
                    <div className="content-box col-md-5">
                    <div><Link style={{color:"White"}} to="/VendorDeals">Deals</Link></div>
                    <div className="circle" style={{ backgroundColor: '#000' }}>2</div>
                    <div> <Link style={{color:"White"}} to="/VendorDeals">View More</Link></div>
                    </div>
                    <div className="content-box col-md-5">
                    <div><Link style={{color:"White"}} to="/VendorOffers">Offer</Link></div>
                    <div className="circle">0</div>
                    <div><Link style={{color:"White"}} to="/VendorOffers">View More</Link></div>
                    </div>
                </div>
              </div>
              <div className="col-md-12">
              <div className="row" style={{ justifyContent: 'center' }}>
                  <div className="content-box col-md-12">
                  {/* <div>Request a Video</div> */}
                  </div>
              </div>
              </div>
          </div>
          {/* <RightSidebar /> */}
          <RightSidebar />
      </div>
    </div>
  </>
    
  );
}

export default VendorDashboard;
