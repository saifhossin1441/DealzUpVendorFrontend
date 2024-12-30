import React, { useState } from 'react';
import './../../assets/vendors/css/styles.css';
import './../../components/vendors/Header';
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';
import * as yup from 'yup'


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
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        country: '',
        address: '',
        city: 'Not To Be Blank',
        state: 'Not To Be Blank',
        postal_code: '',
        business_registration_number: '',
        business_verification_document: null,
        business_logo: null
    });
    const [error, setError] = useState({})

    const steps = [
        { number: 1, label: 'Basic' },
        { number: 2, label: 'Location' },
        { number: 3, label: 'Verification' },
        { number: 4, label: 'Submission' },
        { number: 5, label: 'Status' },
    ];

    const schema = yup.object().shape({
        country: yup.string().required("Country is required"),
        email: yup.string().required("Email is required").email("Invalid email address"),
        phone: yup
            .string()
            .required("Phone number is required")
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
        ,
        name: yup.string().required("Business name is required"),
    });

    const schema2 = yup.object().shape({
        // city: yup.string().required("City is required"),
        // state: yup.string().required("Province is required"),
        postal_code: yup
            .string()
            .required("Postal Code is required")
            .matches(/^\d{6}$/, "Postal Code must be 6 digits")
        ,
        address: yup.string().required("Address is required"),
    });

    const schema3 = yup.object().shape({
        business_logo: yup.mixed().required("Business Logo is required"),
        business_verification_document: yup.mixed().required("Business Verification Document is required."), // Optional field; allow null or empty
        business_registration_number: yup.number().required("Business Registration Number is required")
    });

    const handleNext = () => {
        if (currentStep === 1) {
            schema.validate(formData)
                .then(valid => {
                    console.log(valid, error)
                    setError({});
                    setCurrentStep(currentStep + 1);
                })
                .catch(error => {

                    const newErrors = {};
                    console.log(error)
                    Object.keys(error.value).forEach(field => {
                        if (error.params.path) {
                            console.log("first")
                            newErrors[error.params.path] = error.errors
                        }
                    });
                    setError(newErrors);
                });
        }

        if (currentStep === 2) {
            schema2.validate(formData)
                .then(valid => {
                    console.log(valid, error)
                    setError({});
                    setCurrentStep(currentStep + 1);
                })
                .catch(error => {

                    const newErrors = {};
                    console.log(error)
                    Object.keys(error.value).forEach(field => {
                        if (error.params.path) {
                            console.log("first")
                            newErrors[error.params.path] = error.errors
                        }
                    });
                    setError(newErrors);
                });

        }

        if (currentStep === 3) {
            schema3.validate(formData)
                .then(valid => {
                    console.log(valid, error)
                    setError({});
                    setCurrentStep(currentStep + 1);
                })
                .catch(error => {

                    const newErrors = {};
                    console.log(error)
                    Object.keys(error.value).forEach(field => {
                        if (error.params.path) {
                            console.log("first")
                            newErrors[error.params.path] = error.errors
                        }
                    });
                    setError(newErrors);
                });
        }

        // if (currentStep < steps.length) {

        // }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };


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
        if (name === 'business_verification_document' || name === 'business_logo') {
            setFormData({
                ...formData,
                [name]: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        SendDataToDatabase(formData)


    };

    const SendDataToDatabase = async (data) => {
        // console.log(data)
        const apiEndpoint = 'http://127.0.0.1:8000/deals/businesses/';
        let formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) { // Only append non-null values
                formData.append(key, value);
            }
        });
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }


        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const result = await response.json()
                setError(result)
            } else {
                const result = await response.json();
                console.log('Business Registration successful:', result);
                // Redirect to another page on successful login
                // navigate('/VendorLogin'); 
            }
            console.log(error, "Business Errror")

        }
        catch (error) {

            console.error('Error:', error);
            setError('Server Down. Please contact Administrator');
        }
    }

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
                                        <form style={styles.form}>

                                            {/* <div style={styles.uploadContainer}>
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
                                            </div> */}

                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Business Name"
                                                required
                                                style={styles.input}
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="white-placeholder"
                                            />
                                            {error.name && <div id="Bname" className="form-text2">{error.name}</div>}

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
                                            {error.phone && <div id="Phone" className="form-text2">{error.phone}</div>}

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
                                            {error.email && <div id="Email" className="form-text2">{error.email}</div>}

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
                                            {error.country && <div id="Country" className="form-text2">{error.country}</div>}

                                            {/* <button type="submit" style={styles.submitButton}>
                                                Submit
                                            </button> */}
                                        </form>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div style={{ paddingTop: '0% !important', width: "100%" }}>
                                        <h2>Location</h2>
                                        <div className="container">

                                            <input type="text" style={styles.input}
                                                placeholder='GPS Location'
                                                className="white-placeholder" />
                                            <p>OR</p>

                                            <input type="text" style={styles.input}
                                                placeholder='Address'
                                                name='address'
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="white-placeholder" />
                                            {error.address && <div id="Country" className="form-text2">{error.address}</div>}

                                            <label></label>
                                            <input type="text" style={styles.input}
                                                placeholder='Postal Code'
                                                name='postal_code'
                                                value={formData.postal_code}
                                                onChange={handleChange}
                                                className="white-placeholder" />
                                            {error.postal_code && <div id="Country" className="form-text2">{error.postal_code}</div>}

                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div style={{ paddingTop: '0% !important', width: "100%" }}>
                                        <h2>Verification</h2>
                                        <div className="container">
                                            <label></label>
                                            <input type="number" placeholder='Business Registration Number' style={styles.input} className="white-placeholder"
                                                name='business_registration_number'
                                                value={formData.business_registration_number}
                                                onChange={handleChange} />
                                            {error.business_registration_number && <div id="Country" className="form-text2">{error.business_registration_number}</div>}

                                            <label>Upload Business Verification Document</label>
                                            <input type="file" encType="multipart/form-data" style={styles.input} className="white-placeholder"
                                                name='business_verification_document'

                                                onChange={handleChange}
                                            />
                                            {error.business_verification_document && <div id="Country" className="form-text2">{error.business_verification_document}</div>}

                                            <label>Upload your Store Picture (only image file)</label>
                                            <input type="file" accept="image/*" encType="multipart/form-data" style={styles.input} className="white-placeholder"
                                                name='business_logo'

                                                onChange={handleChange}
                                            />
                                            {error.business_logo && <div id="Country" className="form-text2">{error.business_logo}</div>}

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div style={{ paddingTop: '0% !important', width: "100%" }}>
                                        <h2>Confirm</h2>
                                        <p>Review and confirm your business details and documents before submitting.</p>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button onClick={handleSubmit} style={styles.button}>Submit</button>
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
