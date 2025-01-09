import React, { useEffect, useState } from 'react';
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
// import flyerImg1 from './../../assets/vendors/images/flyers/1.png';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const apiEndpoint = `${process.env.REACT_APP_API_URL}deals/flyers/`;
const VendorFlyers = () => {
    const [flyers, setFlyers] = useState([]);

    useEffect(() => {
        fetch(apiEndpoint)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setFlyers(data.data); // Set the flyers data from API
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
                            <div>Current Flyers</div>
                        </div>
                        <br />
                        <div class="flex_wrapper">

                            {flyers?.map((flyer) => (
                                <div class="flyers_wrap" key={flyer.id}>
                                    <img src={flyer.image} alt="Food App" />
                                    <h3>{flyer.name}</h3>
                                    <p>Start Date : {flyer.start_date} <br /> End Date  &nbsp;: {flyer.end_date}</p>
                                    <p>{flyer.descripton}</p>
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

                            </div> */}

                            {/* <div class="flyers_wrap">
                                <img src={flyerImg1} alt="Dealzup" />
                                <h3>Walmart</h3>
                                <p>Start Date : Aug 28, 2024 <br /> End Date &nbsp;: Aug 30, 2024</p>

                            </div> */}


                        </div>
                        <br />
                        <div className="content-box ">
                            <div><u><Link to="/VendorCreateFlyers" style={{ color: "White" }}>Add a new Flyer</Link></u></div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
            {/* <div>
                <h1>Flyers</h1>
                <div className="flyers-list">
                    {flyers.map((flyer) => (
                        <div key={flyer.id} className="flyer">
                            <img src={flyer.image} alt={flyer.name} />
                            <h2>{flyer.name}</h2>
                            <p>{flyer.descripton}</p>
                        </div>
                    ))}
                </div>
            </div> */}
        </>
    );
}

export default VendorFlyers;