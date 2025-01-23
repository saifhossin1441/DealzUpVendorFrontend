import React, { useEffect, useState } from "react";
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
// import DealsImg1 from './../../assets/vendors/images/deals/1.jpg';
// import DealsImg2 from './../../assets/vendors/images/deals/2.jpg';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom';


const apiEndpoint = `${process.env.REACT_APP_API_URL}deals/offers/`;
const VendorOffers = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetch(apiEndpoint)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setOffers(data.data); // Set the flyers data from API
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
                            <div>Current Offers</div>
                        </div>
                        <br />
                        <div class="flex_wrapper">
                            {offers?.map((offer) => (
                                <div class="flyers_wrap" key={offer.id}>
                                    <img src={offer.image} alt="Food App" />
                                    <h3>{offer.name}</h3>
                                    <p>Start Date : {offer.start_date} <br /> End Date  &nbsp;: {offer.end_date}</p>
                                    <p>{offer.descripton}</p>
                                    {/* <button className="heart-button" >
                                        ❤️
                                    </button> */}
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
                            <div><u><Link to="/VendorCreateOffers" style={{ color: "White" }}>Add a new Offer</Link></u></div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default VendorOffers;