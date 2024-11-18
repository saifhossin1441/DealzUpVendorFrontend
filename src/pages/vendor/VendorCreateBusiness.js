import React from 'react';
import './../../assets/vendors/css/styles.css'; 
import './../../components/vendors/Header'; 
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom';



const VendorCreateBusiness = () => {
  
  return (
    <>
        <Header />
        <div className="container-fluid content-section align">
          <div className="row">
              <Sidebar />
              <div className="col-md-8 main_content" >
                <div className='container' >
                  <h1 style={{textAlign: "center"}}>No Business to Show</h1>
                  <h2 style={{textAlign: "center"}}> <Link to="/VendorCreateBusinessPagination" >+ Create Business</Link></h2>
                </div> 
              </div>
          </div>
       </div>
       
    </>
  );
};


export default VendorCreateBusiness;
