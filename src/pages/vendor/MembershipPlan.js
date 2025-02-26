import React, { useState } from 'react'
import './../../assets/css/membership.css'
import './../../assets/css/login.css';
import banner from '../../assets/images/banner.svg';
import Header from './../../components/vendors/Header';
import Footer from './../../components/Footer';
import { useRefreshToken } from '../../hooks/useRefreshToken';
import { ToastContainer, toast } from 'react-toastify';

const MembershipPlan = () => {

    const { refreshAccessToken, refresherror } = useRefreshToken();
    const [selectedPlan, setSelectedPlan] = useState('bronze')
    const [plans, setPlans] = useState([
        {
            plan: "bronze",
            price: "₹149",
            quality: "Fair",
            resolution: "480p",
            devices: "Mobile phone, tablet",
            simultaneousDevices: 1,
            downloads: 1,
        },
        {
            plan: "gold",
            price: "₹199",
            quality: "Good",
            resolution: "720p (HD)",
            devices: "TV, computer, mobile phone, tablet",
            simultaneousDevices: 1,
            downloads: 1,
        },
        {
            plan: "silver",
            price: "₹499",
            quality: "Great",
            resolution: "1080p (Full HD)",
            devices: "TV, computer, mobile phone, tablet",
            simultaneousDevices: 2,
            downloads: 2,
        },
    ])



    const UpgradeSubsription = async () => {
        let apiEndPoint = `${process.env.REACT_APP_API_URL}wallet/upgrade-subscription/`
        const newAccessToken = await refreshAccessToken();
        console.log(newAccessToken, 'refresh token', refresherror)
        let formData = { plan: selectedPlan }
        try {
            const response = await fetch(apiEndPoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${newAccessToken}`,
                },
                body: formData,
            });
            console.log(response)
        } catch (error) {
            toast(error)
        }

    }
    return (
        <>
            <Header />
            <div className="plans-container" style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '120vh',
            }}>
                <p className="subtitle" />

                <h1>Choose the plan that's right for you</h1>

                <div className="plans-grid">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`plan-card ${plan.name === "bronze" ? "most-popular" : ""
                                }`}
                        >
                            <h2>{plan.name}</h2>
                            <p className="price">{plan.price}</p>
                            <ul>
                                <li>Upload Banners, Flyers, Deal</li>
                                <li>Resolution: {plan.resolution}</li>
                                <li>Update Option: {plan.devices}</li>
                                <li>
                                    Devices your household can watch at the same time:{" "}
                                    {plan.simultaneousDevices}
                                </li>
                                <li>Download devices: {plan.downloads}</li>
                            </ul>
                            <button className="next-button" onClick={UpgradeSubsription}>Subscribe</button>
                        </div>
                    ))}
                </div>
            </div>
            <div id="background-wrap" style={{ zIndex: '99' }}>
                <div className="bubble1 x1"></div>
                <div className="bubble2 x2"></div>
                <div className="bubble3 x3"></div>
                <div className="bubble4 x4"></div>
                <div className="bubble5 x5"></div>
                <div className="bubble1 x6"></div>
                <div className="bubble2 x7"></div>
                <div className="bubble3 x8"></div>
                <div className="bubble4 x9"></div>
                <div className="bubble5 x10"></div>
                <div className="bubble1 x11"></div>
                <div className="bubble2 x12"></div>
                <div className="bubble3 x13"></div>
                <div className="bubble4 x14"></div>
                <div className="bubble5 x15"></div>
                <div className="bubble1 x16"></div>
                <div className="bubble2 x17"></div>
                <div className="bubble3 x18"></div>
                <div className="bubble4 x19"></div>
                <div className="bubble5 x20"></div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default MembershipPlan