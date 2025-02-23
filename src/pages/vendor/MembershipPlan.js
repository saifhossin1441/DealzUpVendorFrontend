import React, { useState } from 'react'
import './../../assets/css/membership.css'
import banner from '../../assets/images/banner.svg';
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
        <div className="plans-container" style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '120vh',
        }}>
            <h1>Choose the plan that's right for you</h1>
            <p className="subtitle" />


            <div className="plans-grid">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`plan-card ${plan.plan === "bronze" ? "most-popular" : ""
                            }`}
                    >
                        <h2>{plan.name}</h2>
                        <p className="price">{plan.price}</p>
                        <ul>
                            <li>Video and sound quality: {plan.quality}</li>
                            <li>Resolution: {plan.resolution}</li>
                            <li>Supported devices: {plan.devices}</li>
                            <li>
                                Devices your household can watch at the same time:{" "}
                                {plan.simultaneousDevices}
                            </li>
                            <li>Download devices: {plan.downloads}</li>
                        </ul>
                    </div>
                ))}
            </div>
            <ToastContainer />
            <button className="next-button" onClick={UpgradeSubsription}>Submit</button>
        </div>
    )
}

export default MembershipPlan