import React, { useRef, useState } from 'react';
import './../../assets/vendors/css/styles.css';
import './../../components/vendors/Header';
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';
import { Modal, Button, Form } from "react-bootstrap";
import uploadGallery from './../../assets/images/uploadGallery.png';
import { useNavigate } from "react-router-dom";
import { useRefreshToken } from '../../hooks/useRefreshToken';
import * as yup from 'yup'
import { Autocomplete } from "@react-google-maps/api";
import { geocode, RequestType } from "react-geocode";
import { useGeolocated } from "react-geolocated";
import Maps from './Maps';


const styles = {
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
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
    imagePrevieww: {
        width: '40%',
        height: '50%',
        objectFit: 'cover'
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
    const [searchQuery, setSearchQuery] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [verified, setVerified] = useState(true);
    const [image, setImage] = useState(null);
    const [autoComplete, setAutoComplete] = useState("");
    const autocompleteRef = useRef(null);
    const [OpenMaps, setOpenMaps] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        country: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        location: "",
        business_registration_number: '',
        business_verification_document: null,
        business_logo: null,
        vendor: null
    });
    const [error, setError] = useState({})
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
        });

    const steps = [
        { number: 1, label: 'Basic' },
        { number: 2, label: 'Location' },
        { number: 3, label: 'Verification' },
        { number: 4, label: 'Submission' },
        { number: 5, label: 'Status' },
    ];
    const navigate = useNavigate()
    const { refreshAccessToken, refresherror } = useRefreshToken();

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
            .matches(/^[a-zA-Z0-9]{6}$/, "Postal Code must be 6 alphanumeric characters")
        ,
        address: yup.string().required("Address is required"),
    });

    const schema3 = yup.object().shape({
        business_logo: yup.mixed().required("Business Logo is required"),
        business_verification_document: yup.mixed().required("Business Verification Document is required."), // Optional field; allow null or empty
        business_registration_number: yup.number().required("Business Registration Number is required")
    });
    const onAutoCompleteIsLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    // Handle onPlaceChanged (Extract selected location)
    const onAutoCompletePlaceIsChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            console.log(place, "Selected Place");

            if (place?.geometry && place?.geometry?.location) {
                const location = {
                    lat: place?.geometry?.location.lat(),
                    lng: place?.geometry?.location.lng(),
                };
                setSearchQuery(location); // Pass to parent component
            }
        }
    };
    const GeoLocate = () => {
        geocode(RequestType.LATLNG, `${coords.latitude},${coords.longitude}`, {
            key: "AIzaSyDsc0jaxFvFYsc1b3Tblah0n1LV3RfZZDQ",
            location_type: "ROOFTOP", // Override location type filter for this request.
            // enable_address_descriptor: true, // Include address descriptor in response.
            language: "en",
            region: "us",
        })
            .then(({ results }) => {
                console.log(results)
                const address = results[0].formatted_address;
                const { city, state, country, postal_code } = results[0].address_components.reduce(
                    (acc, component) => {
                        if (component.types.includes("locality"))
                            acc.city = component.long_name;
                        else if (component.types.includes("administrative_area_level_1"))
                            acc.state = component.long_name;
                        else if (component.types.includes("country"))
                            acc.country = component.long_name;
                        else if (component.types.includes("postal_code"))
                            acc.postal_code = component.long_name;
                        return acc;
                    },
                    {}
                );
                console.log(city, state, country, postal_code);
                console.log(address);
                setFormData((prevData) => ({
                    ...prevData,
                    city: city || prevData.city,
                    state: state || prevData.state,
                    country: country || prevData.country,
                    postal_code: postal_code || prevData.postal_code,
                    address: address || prevData.address
                }));
            })
            .catch(console.error);

    }
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
        let vendorInfo = localStorage.getItem('vendorInfo');
        if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');

        vendorInfo = JSON.parse(vendorInfo); // Correct parsing

        if (!vendorInfo?.vendor?.id) throw new Error('Vendor ID not found in vendorInfo');

        // Set vendor ID in formData
        const updatedFormData = { ...formData, vendor: vendorInfo.vendor.id };
        console.log('Form Data:', updatedFormData);

        SendDataToDatabase(updatedFormData)

        if (!verified) {
            setVerified(true)
        }
    };

    const SendDataToDatabase = async (data) => {
        // console.log(data)
        const apiEndpoint = `${process.env.REACT_APP_API_URL}deals/businesses/create/`;
        let formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) { // Only append non-null values
                formData.append(key, value);
            }
        });
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        const newAccessToken = await refreshAccessToken();
        console.log(newAccessToken, 'refresh token', refresherror)
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${newAccessToken}`, // Replace authToken with your actual token
                },
                body: formData,
            });

            if (!response.ok) {
                const result = await response.json()
                console.log(result.error.fields)
                if (result.error.fields) {
                    setError({ api: "Email or Phone is already Registered. " })
                } else {
                    setError(result)
                }

            } else {
                const result = await response.json();
                console.log('Business Registration successful:', result);
                // Redirect to another page on successful login
                setCurrentStep(currentStep + 1);
            }
            console.log(error, "Business Errror")

        }
        catch (error) {

            console.error('Error:', error);
            setError('Server Down. Please contact Administrator');
        }
    }
    // console.log(searchQuery)
    const handleLocationSelect = (location) => {
        console.log("Selected Location:", location);

        setSearchQuery({ formatted_address: location?.address, pincode: location?.pincode }); // Update search input with place name
        setFormData((prevData) => ({
            ...prevData,
            country: location?.country,
            city: location?.city,
            state: location?.city,
            location: `POINT(${location?.lat} ${location?.lng})`,
            postal_code: (location?.pincode || prevData.postal_code)?.replace(/\s+/g, ''),
            address: location?.address || prevData.address
        }));
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
                                        <div className={`step ${currentStep > step.number || currentStep >= 5 ? 'completed' : ''}`}>
                                            {/* <div className="circle">{currentStep > step.number ? '✓' : step.number}</div> */}
                                            <div className="circle">   {currentStep > step.number || currentStep >= 5 ? '✓' : step.number}</div>
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

                                            <div className="uploadGallerySection2">

                                                {image ? (
                                                    <img src={image} alt="Business Logo" style={styles.imagePrevieww} />
                                                ) : (
                                                    <>
                                                        <label htmlFor="fileUpload">
                                                            <img className="uploadGallery" src={uploadGallery} alt="DealzupUploadGallery" />
                                                        </label>  <p>Maximum Size: 100KB</p>
                                                        <p>Size Dimension: 1920 x 1080</p>
                                                    </>)}
                                                <input
                                                    id="fileUpload"
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    name="fileUpload"
                                                    onChange={handleImageUpload}
                                                />
                                                {error.image && <div id="Error" className="form-text2">{error.image}</div>}
                                            </div>


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

                                            <button style={styles.input} onClick={() => setOpenMaps(!OpenMaps)}>GPS Location</button>

                                            <Modal show={OpenMaps} onHide={() => setOpenMaps(false)} size="xl">
                                                <Modal.Header closeButton>

                                                    <Autocomplete
                                                        onLoad={onAutoCompleteIsLoad}
                                                        onPlaceChanged={onAutoCompletePlaceIsChanged}


                                                    >
                                                        <input
                                                            type="text"
                                                            placeholder="Search location..."
                                                            value={searchQuery?.formatted_address}

                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            style={{
                                                                width: "300px",
                                                                padding: "5px",
                                                                borderRadius: "5px",
                                                                border: "1px solid #ccc",
                                                            }}
                                                        />
                                                    </Autocomplete>

                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div style={{ width: "100%", height: "700px", overflow: "hidden" }}>
                                                        <Maps searchQuery={searchQuery} onLocationSelect={handleLocationSelect} /> {/* Pass search query to Maps */}
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <button
                                                        onClick={() => {
                                                            // handleLocationSelect; 
                                                            setOpenMaps(false); // Close the modal
                                                        }}
                                                        style={{
                                                            backgroundColor: "red",
                                                            color: "white",
                                                            padding: "10px 15px",
                                                            border: "none",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Set Location
                                                    </button>
                                                </Modal.Footer>
                                            </Modal>
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
                                            <input id="fileUpload" type="file" accept="image/*" style={styles.input} className="white-placeholder"
                                                name='business_logo'

                                                onChange={handleChange}
                                            />
                                            {error.business_logo && <div id="Country" className="form-text2">{error.business_logo}</div>}

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        </div>
                                    </div>
                                )}
                                {/* <div style={{ paddingTop: '0% !important', width: "100%" }}>
                                        <h2>Confirm</h2>
                                        <p>Review and confirm your business details and documents before submitting.</p>

                                        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#0000", }}>
                                            <ul style={{ listStyleType: "none", paddingLeft: "0", alignItems: 'center' }}>
                                                {formData.business_logo ? (
                                                    <div>
                                                        <img
                                                            src={URL.createObjectURL(formData.business_logo)}
                                                            alt="Business Logo Preview"
                                                            style={{ width: "10%", height: "10%", marginTop: "10px" }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <p><strong>Not Uploaded</strong></p>
                                                )}
                                                <li><strong>Business Name:</strong> {formData.name || "N/A"}</li>
                                                <li><strong>Phone:</strong> {formData.phone || "N/A"}</li>
                                                <li><strong>Email:</strong> {formData.email || "N/A"}</li>
                                                <li><strong>Country:</strong> {formData.country || "N/A"}</li>
                                                <li><strong>Address:</strong> {formData.address || "N/A"}</li>
                                                <li><strong>Postal Code:</strong> {formData.postal_code || "N/A"}</li>
                                                <li><strong>Business Registration Number:</strong> {formData.business_registration_number || "N/A"}</li>
                                                {formData.business_verification_document && (
                                                    <p>
                                                        <strong>Business Verification Document:</strong> Uploaded
                                                    </p>
                                                )}
                                            </ul>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button onClick={handleSubmit} style={styles.button}>Submit</button>
                                        </div>
                                    </div> */}
                                {currentStep === 4 && (
                                    <div style={{ paddingTop: '0% !important', width: "100%" }}>
                                        <h2>Confirm</h2>
                                        <p>Review and confirm your business details and documents before submitting.</p>

                                        <div
                                            style={{
                                                marginTop: "20px",
                                                padding: "20px",
                                                border: "1px solid #ccc",
                                                borderRadius: "8px",
                                                backgroundColor: "#0000",
                                                textAlign: "center",
                                            }}
                                        >
                                            {formData.business_logo ? (
                                                <div style={{ marginBottom: "20px" }}>
                                                    <img
                                                        src={URL.createObjectURL(formData?.business_logo)}
                                                        alt="Business Logo Preview"
                                                        style={{
                                                            width: "160px",
                                                            height: "160px",
                                                            borderRadius: "5px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <p><strong>Business Logo:</strong> Not Uploaded</p>
                                            )}

                                            <table
                                                style={{
                                                    width: "100%",
                                                    borderCollapse: "collapse",
                                                    margin: "0 auto",
                                                }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>Business Name</td>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{formData.name || "N/A"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>Phone</td>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{formData.phone || "N/A"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>Email</td>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{formData.email || "N/A"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>Country</td>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{formData.country || "N/A"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>Address</td>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{formData.address || "N/A"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>City</td>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{formData.city || "N/A"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>State</td>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{formData.state || "N/A"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>Postal Code</td>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{formData.postal_code || "N/A"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>Business Registration Number</td>
                                                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{formData.business_registration_number || "N/A"}</td>
                                                    </tr>
                                                    {formData.business_verification_document && (
                                                        <tr>
                                                            <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>Business Verification Document</td>
                                                            <td style={{ padding: "10px", border: "1px solid #ccc" }}>Uploaded</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        {error.api && <div id="Api Error" style={{
                                            margin: "20px auto",
                                            padding: "10px",
                                            color: "red",
                                            fontWeight: "bold",
                                            border: "1px solid red",
                                            borderRadius: "8px",
                                            backgroundColor: "#ffe6e6",
                                            textAlign: "center",
                                            width: "60%",
                                        }} className="form-text2">{error.api}</div>}

                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                            <button onClick={handleSubmit} style={styles.button}>Submit</button>
                                        </div>
                                    </div>

                                )}

                                {/* <div style={{ paddingTop: '0% !important', width: "100%" }}>
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
                                    </div> */}

                                {currentStep === 5 && (verified ? (
                                    <div
                                        style={{
                                            padding: '30px',
                                            backgroundColor: '#000',
                                            color: '#fff',
                                            borderRadius: '8px',
                                            textAlign: 'center',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                            margin: '0 auto',
                                        }}
                                    >
                                        <h2 style={{ fontSize: '2em', marginBottom: '15px', color: '#f9c74f', textAlign: 'center', }}>
                                            🎉 Your Account Has Been Successfully Verified
                                        </h2>
                                        <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
                                            Congratulations! Your account is now fully verified and ready for use.
                                        </p>
                                        <button
                                            style={{
                                                backgroundColor: '#f9c74f',
                                                color: '#000',
                                                padding: '10px 20px',
                                                fontSize: '1.1em',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                            onClick={() => navigate('/VendorDashboard')}
                                        >
                                            View Dashboard
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ padding: '20px', backgroundColor: '#000000', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                        <h2>Status</h2>
                                        <p style={{ fontSize: '1.2em', color: '#FFF' }}>
                                            🎉 Your business details and documents have been submitted!
                                        </p>
                                        <p style={{ fontSize: '1em', color: '#999' }}>Currently under review. Approval is pending. Stay tuned!</p>
                                    </div>
                                )
                                )}

                                <div style={{ marginTop: '20px' }}>

                                    {![1, 5].includes(currentStep) && (
                                        <button onClick={handlePrev}>Previous</button>
                                    )}


                                    {![4, 5].includes(currentStep) && <button onClick={handleNext} disabled={currentStep === steps.length}>
                                        Next
                                    </button>}

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
