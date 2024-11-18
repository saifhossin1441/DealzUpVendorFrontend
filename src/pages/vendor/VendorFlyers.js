import React, { useEffect, useState } from 'react';
import './../../assets/vendors/css/styles.css'; 
import Header from './../../components/vendors/Header';
import flyerImg1 from './../../assets/vendors/images/flyers/1.png';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom';


const VendorFlyers = ()=>{
    const [flyers, setFlyers] = useState([]);

    useEffect(() => {
        fetch('http://35.183.28.28:8080/deals/flyers/')
            .then((response) => response.json())
            .then((data) => {
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
                        <br/>
                        <div class="flex_wrapper">
                            <div class="flyers_wrap">
                                <img src={flyerImg1} alt="Food App" /> 
                                <h3>Walmart</h3>
                                <p>Start Date : Aug 15, 2024 <br /> End Date  &nbsp;: Aug 20, 2024</p>
                                <p></p>
                            </div>

                            <div class="flyers_wrap">
                                <img src={flyerImg1} alt="Best Grocery App" /> 
                                <h3>Walmart</h3>
                                <p>Start Date : Aug 21, 2024 <br /> End Date  &nbsp;: Aug 24, 2024</p>
                               
                            </div>

                            <div class="flyers_wrap">
                                <img src={flyerImg1}  alt="Dealzup" /> 
                                <h3>Walmart</h3>
                                <p>Start Date : Aug 25, 2024 <br/> End Date  &nbsp;: Aug 28, 2024 </p>
                               
                            </div>

                            <div class="flyers_wrap">
                                <img src={flyerImg1}  alt="Dealzup" /> 
                                <h3>Walmart</h3>
                                <p>Start Date : Aug 28, 2024 <br /> End Date &nbsp;: Aug 30, 2024</p>
                                
                            </div>

                            
                        </div>
                        <br />
                        <div className="content-box ">
                          <div><u><Link to="/VendorCreateFlyers" style={{color:"White"}}>Add a new Flyer</Link></u></div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div>
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
        </div>
        </>
    );
}

export default VendorFlyers;