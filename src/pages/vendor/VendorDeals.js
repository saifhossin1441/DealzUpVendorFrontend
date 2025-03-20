import React, { useEffect, useState } from "react";
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
// import DealsImg1 from './../../assets/vendors/images/deals/1.jpg';
// import DealsImg2 from './../../assets/vendors/images/deals/2.jpg';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom';
import { GetDeals } from "../../apis/vendor/Deals/Deals";
import { useQuery } from "@tanstack/react-query";

const apiEndpoint = `${process.env.REACT_APP_API_URL}vendor/deals/`;
const VendorDeals = () => {
    const [deals, setDeals] = useState([]);


    const query = useQuery({ queryKey: ['dealsData'], queryFn: GetDeals })

    useEffect(() => {
        console.log(query?.data?.data)
        if (query) {
            setDeals(query?.data?.data?.data)
        }

    }, [query?.data])


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
                                <div class="flyers_wrap" key={deals?.id}>
                                    <img src={deals?.image} alt="Food App" />
                                    <h3>{deals?.name}</h3>
                                    <p>Start Date : {deals?.start_date} <br /> End Date  &nbsp;: {deals.end_date}</p>
                                    <p>{deals?.descripton}</p>
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
                            <div><u><Link to="/VendorCreateDeals" style={{ color: "White" }}>Add a new Deal</Link></u></div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default VendorDeals;