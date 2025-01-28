import React, { useEffect, useState } from "react";
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
// import flyerImg1 from './../../assets/vendors/images/flyers/1.png';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom';

const apiEndpoint = `${process.env.REACT_APP_API_URL}deals/banners/`;
const VendorBanners = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        fetch(apiEndpoint)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setBanners(data.data); // Set the flyers data from API
            })
            .catch((error) => {
                console.error('Error fetching the banners:', error);
            });
    }, []);

    return (
        <>
            <Header />
            <div class="container-fluid content-section align">
                <div class="row">
                    <Sidebar />
                    <div className="col-md-8" >
                        <div className="content-box ">
                            <div>Current Banners</div>
                        </div>
                        <br />
                        <div class="flex_wrapper">
                            {banners?.map((banner) => (
                                <div class="flyers_wrap" key={banner.id}>
                                    <img src={banner.image} alt="Food App" />
                                    <h3>{banner.name}</h3>
                                    <p>Start Date : {banner.start_date} <br /> End Date  &nbsp;: {banner.end_date}</p>
                                    <p>{banner.descripton}</p>
                                    {/* <button className="heart-button" >
                                        ❤️
                                    </button> */}
                                </div>
                            ))}

                            {/* <div class="flyers_wrap">
                                <img src={flyerImg1} alt="Best Grocery App" />
                                <h3>Walmart</h3>
                                <p>Start Date : Aug 21, 2024 <br /> End Date  &nbsp;: Aug 24, 2024</p>

                            </div> */}

                            {/* <div class="flyers_wrap">
                                <img src={flyerImg1} alt="Dealzup" />
                                <h3>Walmart</h3>
                                <p>Start Date : Aug 25, 2024 <br /> End Date  &nbsp;: Aug 28, 2024 </p>

                            </div>

                            <div class="flyers_wrap">
                                <img src={flyerImg1} alt="Dealzup" />
                                <h3>Walmart</h3>
                                <p>Start Date : Aug 28, 2024 <br /> End Date &nbsp;: Aug 30, 2024</p>

                            </div> */}


                        </div>
                        <br />
                        <div className="content-box ">
                            <div><u><Link to="/VendorCreateBanners" style={{ color: "White" }}>Add a new Banner</Link></u></div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default VendorBanners;