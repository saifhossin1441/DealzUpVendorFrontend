import React from 'react'
import './../../assets/css/membership.css'
import banner from '../../assets/images/banner.svg';

const MembershipPlan = () => {
    const plans = [
        {
            name: "Mobile",
            price: "₹149",
            quality: "Fair",
            resolution: "480p",
            devices: "Mobile phone, tablet",
            simultaneousDevices: 1,
            downloads: 1,
        },
        {
            name: "Basic",
            price: "₹199",
            quality: "Good",
            resolution: "720p (HD)",
            devices: "TV, computer, mobile phone, tablet",
            simultaneousDevices: 1,
            downloads: 1,
        },
        {
            name: "Standard",
            price: "₹499",
            quality: "Great",
            resolution: "1080p (Full HD)",
            devices: "TV, computer, mobile phone, tablet",
            simultaneousDevices: 2,
            downloads: 2,
        },
        {
            name: "Premium",
            price: "₹649",
            quality: "Best",
            resolution: "4K + HDR",
            devices: "TV, computer, mobile phone, tablet",
            simultaneousDevices: 4,
            downloads: 6,
        },
    ];

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
                        className={`plan-card ${plan.name === "Basic" ? "most-popular" : ""
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
            <button className="next-button">Next</button>
        </div>
    )
}

export default MembershipPlan