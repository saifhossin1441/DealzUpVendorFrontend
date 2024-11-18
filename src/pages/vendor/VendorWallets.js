import React from 'react';
import './../../assets/vendors/css/styles.css'; 
// import './../../components/vendors/Header'; 
// import './../../components/vendors/Sidebar'; 
// import './../../components/vendors/RightSidebar'; 
import Header from './../../components/vendors/Header';
import RightSidebar from './../../components/vendors/RightSidebar';
import Sidebar from './../../components/vendors/Sidebar';



const VendorWallets = () => {
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
              <h6  style={{ textAlign: 'center' }}>Wallets</h6>
              </div>
              <div className="col-md-12"><br/></div>
              <div className="col-md-12">
              <div className="row" style={{ justifyContent: 'center' }}>
                  <div className="content-box col-md-5" style={{ backgroundColor: '#FAD6AD' }}>
                  <div style={{ color: '#000' }}>Rewardss</div>
                  <div className="circle" style={{ backgroundColor: '#000' }}>36</div>
                  <div style={{ color: '#000' }}>Redeem Points</div>
                  </div>
                  <div className="content-box col-md-5">
                  <div>Withdraw</div>
                  <div className="circle">36</div>
                  {/* <div>Redeem Points</div> */}
                  </div>
              </div>
              </div>
              <div className="col-md-12">
              <div className="row" style={{ justifyContent: 'center' }}>
                  <div className="content-box col-md-5">
                  <div>Transaction</div>
                  <div className="circle" style={{ backgroundColor: '#000' }}>36</div>
                  {/* <div>Redeem Points</div> */}
                  </div>
                  <div className="content-box col-md-5">
                  <div>Add</div>
                  <div className="circle">36</div>
                  {/* <div>Redeem Points</div> */}
                  </div>
              </div>
              </div>
              <div className="col-md-12">
              <div className="row" style={{ justifyContent: 'center' }}>
                  <div className="content-box col-md-12">
                  <div>Request a Video</div>
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

export default VendorWallets;
