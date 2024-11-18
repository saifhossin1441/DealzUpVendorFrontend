import React, { useState } from 'react';
import './../../assets/vendors/css/styles.css'; 
import './../../components/vendors/Header'; 
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';

const styles = {
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        color: 'white',
    },
    uploadContainer: {
        width: '200px',
        height: '200px',
        border: '4px dashed #EE5635',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '20px',
        marginBottom: '20px',
    },
    uploadLabel: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadIcon: {
        fontSize: '50px',
        color: '#EE5635',
    },
    fileInput: {
        display: 'none',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    input: {
        marginTop: '10px',
        width: '80%',
        padding: '20px',
        border: '1px solid #F9F9F9',
        background: 'transparent',
        color: 'white !important',
        borderRadius: '8px',
    },
    select: {
        width: '80%',
        padding: '20px',
        border: '1px solid #F9F9F9',
        background: 'transparent',
        color: 'white',
        borderRadius: '8px',
    },
    submitButton: {
        border: 'none',
        background: '#F9F9F9',
        color: 'black',
        cursor: 'pointer',
        width: '80%',
        padding: '20px',
        borderRadius: '8px',
    },
};

const mobileStyles = `
    @media (max-width: 768px) {
        .pagination-container {
            padding: 0 10px;
        }
        .steps {
            flex-direction: column;
        }
        .step {
            margin-bottom: 15px;
        }
        .line {
            width: 2px;
            height: 30px;
            margin: 10px 0;
        }
        .content {
            width: 100%;
        }
        .container {
            width: 100%;
            padding: 0 15px;
        }
    }
`;

const VendorCreateBusinessPagination = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { number: 1, label: 'Basic' },
        { number: 2, label: 'Location' },
        { number: 3, label: 'Verification' },
        { number: 4, label: 'Submission' },
        { number: 5, label: 'Status' },
    ];

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        businessName: '',
        phone: '',
        email: '',
        country: ''
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 100 * 1024) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('File size should be less than 100KB');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <>
            <Header />
            <style>{mobileStyles}</style>
            <div className="container-fluid content-section align">
                <div className="row">
                    <Sidebar />
                    <div className="col-md-8 main_content">
                        <div className="pagination-container" style={{ width: '100%' }}>
                            <style>
                                {`
                                    .pagination-container {
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        overflow-x: hidden; /* Prevent horizontal scrolling */
                                    }
                                    .steps {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        margin-bottom: 20px;
                                    }
                                    .step {
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        position: relative;
                                    }
                                    .circle {
                                        width: 40px;
                                        height: 40px;
                                        border-radius: 50%;
                                        border: 2px solid #EE5635;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        background-color: transparent;
                                        color: #EE5635;
                                        font-size: 18px;
                                        font-weight: bold;
                                    }
                                    .completed .circle {
                                        background-color: #EE5635;
                                        color: white;
                                    }
                                    .label {
                                        margin-top: 8px;
                                        font-size: 14px;
                                        color: #EE5635;
                                    }
                                    .line {
                                        width: 50px;
                                        height: 2px;
                                        background-color: #EE5635;
                                        margin: 0 10px;
                                    }
                                    .content {
                                        margin-top: 20px;
                                        width: 80%;
                                        text-align: center;
                                    }
                                    .container {
                                        margin-top: 20px;
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                    }
                                    label {
                                        margin: 10px 0 5px;
                                        color: #EE5635;
                                    }
                                    input[type="text"],
                                    input[type="file"] {
                                        padding: 8px;
                                        border: 1px solid #EE5635;
                                        border-radius: 5px;
                                        margin-bottom: 10px;
                                        width: 100%;
                                    }
                                    button {
                                        margin: 10px 5px;
                                        padding: 10px 20px;
                                        background-color: #EE5635;
                                        color: white;
                                        border: none;
                                        border-radius: 5px;
                                        cursor: pointer;
                                    }
                                `}
                            </style>
                            <div className="steps">
                                {steps.map((step, index) => (
                                    <React.Fragment key={step.number}>
                                        <div className={`step ${currentStep > step.number ? 'completed' : ''}`}>
                                            <div className="circle">{currentStep > step.number ? '✓' : step.number}</div>
                                            <div className="label">{step.label}</div>
                                        </div>
                                        {index < steps.length - 1 && <div className="line"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div style={{ paddingTop: '0% !important', width: "100%" }}>
                                {currentStep === 1 && (
                                    <div className="container">
                                        <h1>Basic</h1>
                                        <form onSubmit={handleSubmit} style={styles.form}>

                                            <div style={styles.uploadContainer}>
                                                {image ? (
                                                    <img src={image} alt="Business Logo" style={styles.imagePreview} />
                                                ) : (
                                                    <>
                                                        <label htmlFor="fileUpload" style={styles.uploadLabel}>
                                                            <span style={styles.uploadIcon}>📷</span>
                                                        </label>
                                                    </>
                                                )}
                                                <input
                                                    id="fileUpload"
                                                    type="file"
                                                    accept="image/*"
                                                    style={styles.fileInput}
                                                    onChange={handleImageUpload}
                                                    className="white-placeholder"
                                                />
                                            </div>

                                            <input
                                                type="text"
                                                name="businessName"
                                                placeholder="Business Name"
                                                required
                                                style={styles.input}
                                                value={formData.businessName}
                                                onChange={handleChange}
                                                className="white-placeholder"
                                            />

                                            <input
                                                type="number"
                                                name="phone"
                                                placeholder="Phone"
                                                required
                                                style={styles.input}
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="white-placeholder"
                                            />

                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                required
                                                style={styles.input}
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="white-placeholder"
                                            />

                                            <select
                                                name="country"
                                                required
                                                style={styles.select}
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="white-placeholder"
                                            >
                                                <option value="" disabled>
                                                    Select Country
                                                </option>
                                                <option value="Canada">Canada</option>
                                                <option value="USA">USA</option>
                                                <option value="UK">UK</option>
                                            </select>

                                            <button type="submit" style={styles.submitButton}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                <div  style={{ paddingTop: '0% !important', width: "100%" }}>
                                    <h2>Location</h2>
                                    <div className="container">
                                       
                                        <input type="text" style={styles.input}
                                        placeholder='GPS Location'
                                        className="white-placeholder" />
                                        <p>OR</p>
                                       
                                        <input type="text"  style={styles.input}
                                        placeholder='Address'
                                        className="white-placeholder"/>

                                        <label></label>
                                        <input type="text"  style={styles.input}
                                        placeholder='Postal Code'
                                        className="white-placeholder"/>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button onClick={handlePrev} style={styles.button}>Previous</button>
                                            <button onClick={handleNext} style={styles.button}>Next</button>
                                        </div>
                                    </div>
                                </div>
                                )}

                                {currentStep === 3 && (
                                    <div style={{ paddingTop: '0% !important', width: "100%" }}>
                                        <h2>Verification</h2>
                                    <div className="container">
                                        <label></label>
                                        <input type="text"  placeholder='Business Registration Number' style={styles.input} className="white-placeholder"/>
                                        <label>Upload Business Verification Document</label>
                                        <input type="file" style={styles.input} className="white-placeholder"/>
                                        
                                            <label>Upload your Store Picture (only image file)</label>
                                            <input type="file" accept="image/*" style={styles.input} className="white-placeholder"/>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button onClick={handlePrev} style={styles.button}>Previous</button>
                                            <button onClick={handleNext} style={styles.button}>Next</button>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                     <div style={{ paddingTop: '0% !important', width: "100%" }}>
                                     <h2>Confirm</h2>
                                     <p>Review and confirm your business details and documents before submitting.</p>
                                     <div style={{ display: 'flex', justifyContent: 'center' }}>
                                         <button onClick={handlePrev} style={styles.button}>Previous</button>
                                         <button onClick={handleNext} style={styles.button}>Submit</button>
                                     </div>
                                 </div>
                                )}

                                {currentStep === 5 && (
                                    <div style={{ paddingTop: '0% !important', width: "100%" }}>
                                    <h2>Status</h2>
                                    <p>Business details and documents submitted. Pending approval.</p>
                                    <div className="steps">
                                        {steps.map((step) => (
                                            <div key={step.number} className="step completed">
                                                <div className="circle">✓</div>
                                                <div className="label">{step.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                )}

                                <div style={{ marginTop: '20px' }}>
                                    <button onClick={handlePrev} disabled={currentStep === 1}>
                                        Previous
                                    </button>
                                    <button onClick={handleNext} disabled={currentStep === steps.length}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VendorCreateBusinessPagination;
