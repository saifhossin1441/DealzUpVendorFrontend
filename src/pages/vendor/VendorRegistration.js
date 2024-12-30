import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup'

const VendorRegistration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const [password, setPassword] = useState("");
    const [apartment, setApartment] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [isChecked, setIsChecked] = useState({ term1: false, term2: false });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const schema = yup.object().shape({
        confirm_password: yup
            .string()
            .required("Confirm password is required")
            .oneOf([yup.ref('password'), null], "Passwords must match")
        ,
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        pin: yup
            .string()
            .required("Postal Code is required")
            .matches(/^\d{6}$/, "Postal Code must be 6 digits")
        ,
        apartment: yup.string().required(), // Optional field; allow null or empty
        address: yup.string().required("Address is required"),
        state: yup.string().required("Province is required"),
        city: yup.string().required("City is required"),
        country: yup.string().required("Country is required"),
        phone: yup
            .string()
            .required("Phone number is required")
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
        ,
        email: yup.string().required("Email is required").email("Invalid email address"),
        full_name: yup.string().required("Full name is required"),
    });




    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleApartmentChange = (event) => {
        setApartment(event.target.value);
    };

    const handlePostalCodeChange = (event) => {
        setPostalCode(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you can perform authentication logic with the username and password
        setError({})

        // Data to be sent
        const data = {
            full_name: name,
            email: email,
            address,
            phone,
            state: province,
            pin: postalcode,
            apartment,
            password,
            confirm_password: confirmpassword,
            city,
            country,
        };


        schema.validate(data)
            .then(valid => {
                console.log(valid, error)
                console.log(isChecked.term1, isChecked.term2)
                if (!isChecked.term1 || !isChecked.term2) {
                    setError(prevErrors => ({
                        ...prevErrors,
                        term1: !isChecked.term1 ? "You must agree to the Terms & Conditions" : null,
                        term2: !isChecked.term2 ? "You must agree to the Privacy Policy" : null,
                    }));
                } else {
                    // Clear checkbox-related errors if checkboxes are valid
                    setError(prevErrors => ({
                        ...prevErrors,
                        term1: null,
                        term2: null,
                    }));
                    SendDataToDatabase(data)
                }
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



    };


    const SendDataToDatabase = async (data) => {
        console.log(data)
        const apiEndpoint = 'http://127.0.0.1:8000/auth/vendors-registration/';

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json()
                setError(result)
            } else {
                const result = await response.json();
                console.log('Registration successful:', result);
                // Redirect to another page on successful login
                navigate('/VendorLogin'); // 
            }
            console.log(error)

        }
        catch (error) {

            console.error('Error:', error);
            toast('Server Down. Please contact Administrator');
        }
    }
    const handleCheckboxChange = (e, term) => {
        console.log('t', term, e.target.checked);
        setIsChecked(prevState => ({
            ...prevState,
            [term]: e.target.checked,
        }));

        // Clear the error when the checkbox is checked
        if (e.target.checked) {
            setError(prevErrors => ({
                ...prevErrors,
                [term]: false,
            }));
        }
    }

    return (
        <>
            <div id="background-wrap">
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
            <div className="container element-registration" style={{ width: '50%', MarginTop: '50px !important' }}>
                <div className="row justify-content-center">
                    <div className="custom_form_box column  form_border_radius_reg">
                        <form className="" onSubmit={handleSubmit}>
                            <div className="mb-3 ">
                                <h1 style={{ textAlign: 'center' }}> Vendor Sign Up</h1>
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Full Name' autoComplete="name" onChange={handleNameChange} value={name} id="exampleInputName" />
                                {error.full_name && <div id="Name" className="form-text2">{error.full_name}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="email" placeholder='Email' autoComplete="email" onChange={handleEmailChange} value={email} aria-describedby="emailHelp" />
                                {error.email && <div id="emailHelp" className="form-text2">{error.email}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Phone Number' onChange={handlePhoneChange} value={phone} />
                                {error.phone && <div id="Phone" className="form-text2">{error.phone}</div>}
                            </div>
                            <div className="mb-3">
                                {/* value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} */}
                                <label htmlFor="select-container" className="form-label">Country</label>
                                <select id="select-container" value={country} onChange={handleCountryChange} >
                                    <option value="">Choose Country</option>
                                    <option value="Canada">Canada</option>
                                    <option value="India">India</option>
                                </select>
                                {error.country && <div id="Phone" className="form-text2">{error.country}</div>}
                            </div>
                            <div className="mb-3">
                                {/* value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} */}
                                <label htmlFor="select-container" className="form-label">City</label>
                                <select id="select-container" value={city} onChange={handleCityChange} >
                                    <option value="">Choose City</option>
                                    <option value="Toronto">Toronto</option>
                                    <option value="Kitchener">Kitchener</option>
                                </select>
                                {error.city && <div id="Phone" className="form-text2">{error.city}</div>}
                            </div>
                            <div className="mb-3">
                                {/* value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} */}
                                <label htmlFor="select-container" className="form-label">Province</label>
                                <select id="select-container" value={province} onChange={handleProvinceChange} >
                                    <option value="">Choose Province</option>
                                    <option value="Ontario">Ontario</option>
                                    <option value="Alberta">Alberta</option>
                                </select>
                                {error.state && <div id="Phone" className="form-text2">{error.state}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Address' onChange={handleAddressChange} value={address} />
                                {error.address && <div id="Address" className="form-text2">{error.address}</div>}
                            </div>

                            <div className="mb-3">
                                <input type="text" placeholder='Apartment' onChange={handleApartmentChange} value={apartment} />
                                {error.apartment && <div id="Apartment" className="form-text2">{error.apartment}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Postalcode' onChange={handlePostalCodeChange} value={postalcode} />
                                {error.pin && <div id="Postalcode" className="form-text2">{error.pin}</div>}
                            </div>
                            <div className="mb-3">
                                <input autoComplete="current-password" placeholder="Password" onChange={handlePasswordChange} type="password" value={password} />
                                {error.password && <div id="Password" className="form-text2">{error.password}</div>}
                            </div>
                            <div className="mb-3">
                                <input autoComplete="current-password" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} type="password" value={confirmpassword} />
                                {error.confirm_password && <div id="ConfirmPassword" className="form-text2">{error.confirm_password}</div>}
                            </div>



                            <div className={"form-check"}>
                                <input type="checkbox" className={`form-check-input ${error.term1 ? 'is-invalid' : ''}`} id="exampleCheck1" onChange={(e) => handleCheckboxChange(e, 'term1')} checked={isChecked.term1} />
                                <label className="form-check-label form-text" htmlFor="exampleCheck1"> I agree to the <b>Terms & Condition</b> </label>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className={`form-check-input ${error.term2 ? 'is-invalid' : ''}`} id="exampleCheck2" onChange={(e) => handleCheckboxChange(e, 'term2')} checked={isChecked.term2} />
                                <label className="form-check-label form-text" htmlFor="exampleCheck2"> I agree to the   <b> Privacy Policy</b></label>

                            </div>


                            <button type="submit" className="btn btn-dark mb-3">Submit</button>

                            <div id="g_id_onload"
                                data-client_id="YOUR_GOOGLE_CLIENT_ID"
                                data-login_uri="https://your.domain/your_login_endpoint"
                                data-auto_prompt="false">
                            </div>
                            <div className="g_id_signin mb-3"
                                data-type="standard"
                                data-size="large"
                                data-theme="outline"
                                data-text="sign_in_with"
                                data-shape="rectangular"
                                data-logo_alignment="left">
                            </div>

                            <div className="form-text1 mb-3">Already have an account?</div>
                            <div className="form-text3 mb-3"><a href="/login"><b>Sign in</b></a></div>
                        </form>
                    </div>
                    <ToastContainer />
                </div >
            </div >
        </>
    )
}
export default VendorRegistration;