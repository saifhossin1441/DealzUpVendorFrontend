import React from 'react';
import './../../assets/vendors/css/styles.css'; 
import Header from './../../components/vendors/Header';
import RightSidebar from './../../components/vendors/RightSidebar';
import Sidebar from './../../components/vendors/Sidebar';

const VendorTransaction = () =>{
  return(
    <>
     <Header />
        <div class="container-fluid content-section align">
          <div class="row">
            <Sidebar />
            <div className="col-md-8 ViewTransaction" style={{ marginTop:10}}>
                <h1  style={{ textAlign: 'center' }}> View Transaction</h1>
                <p style={{backgroundColor:'#141414', color:'#fff'}} >
                <strong>KFC -2</strong> <br />
                50% 0ff on first 100 users.
                </p>

                <p style={{backgroundColor:'#000', color:'#fff'}} >
                <strong>Redeemed Point</strong> <br />
                Points Redeemed Date: 25th December, 2023 15:00
                </p>

                <p style={{backgroundColor:'#141414', color:'#fff'}} >
                <strong>KFC -2</strong> <br />
                50% 0ff on first 100 users.
                </p>

                <p style={{backgroundColor:'#000', color:'#fff'}} >
                <strong>Redeemed Point</strong> <br />
                Points Redeemed Date: 25th December, 2023 15:00
                </p>

                <p style={{backgroundColor:'#141414', color:'#fff'}} >
                <strong>KFC -2</strong> <br />
                50% 0ff on first 100 users.
                </p>

                <p style={{backgroundColor:'#000', color:'#fff'}} >
                <strong>Redeemed Point</strong> <br />
                Points Redeemed Date: 25th December, 2023 15:00
                </p>

                <p style={{backgroundColor:'#141414', color:'#fff'}} >
                <strong>KFC -2</strong> <br />
                50% 0ff on first 100 users.
                </p>

                <p style={{backgroundColor:'#000', color:'#fff'}} >
                <strong>Redeemed Point</strong> <br />
                Points Redeemed Date: 25th December, 2023 15:00
                </p>

                <p style={{backgroundColor:'#141414', color:'#fff'}} >
                <strong>KFC -2</strong> <br />
                50% 0ff on first 100 users.
                </p>

                <p style={{backgroundColor:'#000', color:'#fff'}} >
                <strong>Redeemed Point</strong> <br />
                Points Redeemed Date: 25th December, 2023 15:00
                </p>
            </div>
            <RightSidebar />
          </div>
        </div>

          
    </>
  )
}

export default VendorTransaction;