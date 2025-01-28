import React, {useState} from 'react';
import './../../assets/vendors/css/styles.css'; 
import Header from './../../components/vendors/Header';
import RightSidebar from './../../components/vendors/RightSidebar';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom'; 
import paymentMethod1 from './../../assets/images/paymentMethod1.png';
import paymentMethod2 from './../../assets/images/paymentMethod2.png';
import paymentMethod3 from './../../assets/images/paymentMethod3.png';

const VendorWallets = () => {
 
  const[isPopupOpen , setIsPopupOpen] = useState(false);

  const openPopup = () =>{
    setIsPopupOpen(true);
  }

  const closePopup = () =>{
    setIsPopupOpen(false);
  }


  const[isWithdrawPopupOpen, setWithdrawPopupOpen] = useState(false); 
  
  const openWithdrawPopup = () => {
    setWithdrawPopupOpen(true);
  }

  const closeWithdrawPopup = () => {
    setWithdrawPopupOpen(false);
  }

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
                  <div style={{ color: '#000' }}>Rewards</div>
                  <div className="circle" style={{ backgroundColor: '#000' }}>36</div>
                  <div style={{ color: '#000' }}>Redeem Points</div>
                  </div>

                  <div className="content-box col-md-5">
                  <div onClick={openWithdrawPopup} style={{cursor:'pointer'}} >Withdraw</div>
                  <div onClick={openWithdrawPopup} className="circle" style={{fontSize:'28px',cursor:'pointer'}} >-</div>
                  {/* <div>Redeem Points</div> */}
                  </div>
              </div>
              </div>
              <div className="col-md-12">
              <div className="row" style={{ justifyContent: 'center' }}>
                  <div className="content-box col-md-5">
                  <div><Link to="/VendorTransaction" style={{color:'#fff',textDecoration:'none'}} >Transaction</Link></div>
                  <div className="circle" style={{ backgroundColor: '#000' }}><Link to="/VendorTransaction" style={{color:'#fff',textDecoration:'none'}} >36</Link> </div>
                  {/* <div>Redeem Points</div> */}
                  </div>
                  <div className="content-box col-md-5">
                  <div onClick={openPopup} style={{cursor:'pointer'}}>Add</div>
                  <div className="circle" style={{fontSize:'28px',cursor:'pointer'}} onClick={openPopup} >+</div>
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

    {/* Add Popup Modal */}
    {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
                <h3>Enter Amount</h3>
                <input
                    type="text"
                    name="amount"
                    placeholder="$ "
                    required 
                    className="white-placeholder"
                />
                <div>
                    <p>From </p>
                    <select
                                        name="category"
                                        required
                                        
                                        >
                                        <option value="" disabled>
                                        Interac
                                        </option>
                                        

                                        <option value="saifhossain1441@gmail.com">saifhossain1441@gmail.com</option>
                                        <option value="saifhossain@gmail.com">saifhossain@gmail.com</option>
                                        
                                        {/* Add more options as needed */}
                    </select>
                </div>
                <div style={{justifyItems:'left'}} >
                   <p>Payment Method</p>
                   <img className="paymentMethod" src={paymentMethod1} alt="Dealzup Payment" /> 
                   <img className="paymentMethod"src={paymentMethod2} alt="Dealzup Payment"  /> 
                   <img className="paymentMethod" src={paymentMethod3} alt="Dealzup Payment" /> 
                    {/* <select
                    name="category"
                    required
                    >
                    <option value="" disabled>
                    Interac
                    </option>
                    

                    <option value="saifhossain1441@gmail.com">Spending.....0786</option>
                    <option value="saifhossain@gmail.com">Spending.....0986</option>
                    
                    </select> */}
                </div>
            <button  style={{ margin: '10px' }}>Fund Account</button>
            <button onClick={closePopup} style={{ margin: '10px', backgroundColor:'red'}}>Close</button>
          </div>
        </div>
    
      )}
      {/* Add Popup Modal */}
      
      {/* Withdraw Popup Modal */}


      {/* Withdraw Popup Modal */}
      
      {isWithdrawPopupOpen &&(
        <div className="popup-overlay">
        <div className="popup-content">
              <h3>Enter Amount</h3>
                <input
                  type="text"
                  name="amount"
                  placeholder="$ "
                  required 
                  className="white-placeholder"
              />
              <div>
                  <p>Send To</p>
                  <select
                                      name="category"
                                      required
                                      
                                      >
                                      <option value="" disabled>
                                      Interac
                                      </option>
                                      

                                      <option value="saifhossain1441@gmail.com">saifhossain1441@gmail.com</option>
                                      <option value="saifhossain@gmail.com">saifhossain@gmail.com</option>
                                      
                                      {/* Add more options as needed */}
                  </select>
              </div>
              <div  >
              <p>Deposit To</p>
                  <select
                  name="category"
                  required
                  >
                  <option value="" disabled>
                  Account
                  </option>
                  <option value="saifhossain1441@gmail.com">Spending.....0786</option>
                  <option value="saifhossain@gmail.com">Spending.....0986</option>
                  
                  </select>
              </div>
          <button  style={{ margin: '10px' }}>Withdraw</button>
          <button onClick={closeWithdrawPopup} style={{ margin: '10px', backgroundColor:'red'}}>Close</button>
        </div>
      </div>

      )}


  </>
    
  );
}

export default VendorWallets;
