import React from 'react';
import { Link } from 'react-router-dom';
import './../../assets/vendors/css/styles.css';
import './../../components/vendors/Header';
import Header from './../../components/vendors/Header';
import RightSidebar from './../../components/vendors/RightSidebar';
import Sidebar from './../../components/vendors/Sidebar';
import profilePic from './../../assets/vendors/images/profile.png';



const VendorCreateBusinessPagination = () => {

    let vendorInfo = localStorage.getItem('vendorInfo');
    if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');
    vendorInfo = JSON.parse(vendorInfo);
    console.log(vendorInfo?.vendor?.full_name)

    return (
        <>

        <Header />
        <div className="container-fluid content-section align">
        <div className="row">
            
                <Sidebar />
            

            <div className="col-md-8 main_content" >
                {/* Profile Pic and Name */}
                <div className="col-md-12">
                    
                    <div className="profile-container">
                    <img className="profile-picture" src={profilePic} alt="Dealzup" />
                        <div className="profile-details">
                            <h2>John Doe</h2>
                            <p>Email: john.doe@example.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </div>
                        </div>
                </div>
                <div></div>

            <Header />
            <div className="container-fluid content-section align">
                <div className="row">

                    <Sidebar />



                    <div className="col-md-8 main_content" >
                        {/* Profile Pic and Name */}
                        <div className="col-md-12">

                            <div className="profile-container">
                                <img className="profile-picture" src={profilePic} alt="Dealzup" />
                                <div className="profile-details">
                                    <h2>{vendorInfo?.vendor?.full_name}</h2>
                                    <p>{vendorInfo?.vendor?.email}</p>
                                    <p>{vendorInfo?.vendor?.phone}</p>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-12"><br /></div>

                        {/* 2nd Div*/}
                        <div className="col-md-12">
                            <div className="row" style={{ justifyContent: 'center' }}>
                                <div className="content-box col-md-5">
                                    <div>Address</div>
                                    <br />
                                    <p className='profileFont' >{vendorInfo?.vendor?.address}<br />{vendorInfo?.vendor?.pin} <br />{vendorInfo?.vendor?.state} </p>
                                    <div className='editColor' >Edit</div>
                                </div>

                                <div className="content-box col-md-5">
                                    <div>Date of Birth</div>
                                    <br />
                                    <div className='profileFont'> Sept - 21 - 2000</div>
                                    <div className='editColor'>Edit</div>
                                </div>
                            </div>
                        </div>

                        {/* Third Div*/}
                        <div className="col-md-12">
                            <div className="row" style={{ justifyContent: 'center' }}>
                                <div className="content-box col-md-12">
                                    <div>Gender: <font className='profileFont'>Male</font></div>
                                </div>
                            </div>

                            <div className="row" style={{ justifyContent: 'center' }}>
                                <div className="content-box col-md-12">
                                    <div>ID Verification</div>
                                </div>
                            </div>

                            <div className="row" style={{ justifyContent: 'center' }}>
                                <div className="content-box col-md-12">
                                    <div><Link to="/VendorCreateBusiness">Create Business Page</Link></div>
                                </div>
                            </div>

                            <div className="row" style={{ justifyContent: 'center' }}>
                                <div className="content-box col-md-12">
                                    <div>Change Password</div>
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

export default VendorCreateBusinessPagination;