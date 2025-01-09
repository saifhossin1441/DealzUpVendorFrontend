import React, { useEffect, useState } from "react";
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
// import DealsImg1 from './../../assets/vendors/images/deals/1.jpg';
// import DealsImg2 from './../../assets/vendors/images/deals/2.jpg';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom';

const apiEndpoint = `${process.env.REACT_APP_API_URL}deals/deals/`;
const VendorDeals = () => {
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        fetch(apiEndpoint)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setDeals(data.data); // Set the flyers data from API
            })
            .catch((error) => {
                console.error('Error fetching the flyers:', error);
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
                            <div>Current Deals</div>
                        </div>
                        <br />
                        <div class="flex_wrapper">
                            {deals?.map((deals) => (
                                <div class="flyers_wrap" key={deals.id}>
                                    <img src={deals.image} alt="Food App" />
                                    <h3>{deals.name}</h3>
                                    <p>Start Date : {deals.start_date} <br /> End Date  &nbsp;: {deals.end_date}</p>
                                    <p>{deals.descripton}</p>
                                </div>
                            ))}

                            {/* <div class="flyers_wrap">
                                <img src={DealsImg2} alt="Best Grocery App" />
                                <h3>Walmart</h3>
                                <p>Start Date : Aug 21, 2024 <br /> End Date  &nbsp;: Aug 24, 2024</p>

                            </div> */}

                        </div>
                        <br />
                        <div className="content-box ">
                            <div><u><Link to="/VendorCreateDeals" style={{ color: "White" }}>Add a new Deal</Link></u></div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default VendorDeals;