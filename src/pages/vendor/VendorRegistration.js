import React, { useState } from 'react';
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
    // const [error, setError] = useState("");


    const schema = yup.object().shape({
        full_name: yup.string().required("Full name is required"),
        email: yup.string().email("Invalid email address").required("Email is required"),
        address: yup.string().required("Address is required"),
        apartment: yup.string().required(), // Optional field; allow null or empty
        phone: yup
            .string()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        state: yup.string().required("State is required"),
        pin: yup
            .string()
            .matches(/^\d{6}$/, "PIN must be 6 digits")
            .required("PIN is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirm_password: yup
            .string()
            .oneOf([yup.ref('password'), null], "Passwords must match")
            .required("Confirm password is required"),
        city: yup.string().required("City is required"),
        country: yup.string().required("Country is required"),
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
        // console.log('Username:', email);
        // console.log('Password:', password);
        // console.log(error)
        // const apiEndpoint = 'http://127.0.0.1:8000/auth/vendors-registration/';


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
            .then(valid => console.log(valid))
            .catch(error => console.log(error));

        // try {
        //     const response = await fetch(apiEndpoint, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     });

        //     if (!response.ok) {
        //         throw new Error('Login failed');
        //     }
        //     const result = await response.json();
        //     console.log('Login successful:', result);
        //     // Redirect to another page on successful login
        //     // navigate('/VendorDashboard'); // 
        // }
        // catch (error) {

        //     console.error('Error:', error);
        //     setError('Invalid credentials. Please try again.');
        // }


    };

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
                                <input type="text" placeholder='Name' autoComplete="name" onChange={handleNameChange} value={name} id="exampleInputName" />
                                <div id="Name" className="form-text"></div>
                            </div>
                            <div className="mb-3">
                                <input type="email" placeholder='Email' autoComplete="email" onChange={handleEmailChange} value={email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text"></div>
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Phone Number' onChange={handlePhoneChange} value={phone} />
                                <div id="Phone" className="form-text"></div>
                            </div>
                            <div className="mb-3">
                                {/* value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} */}
                                <label htmlFor="select-container" className="form-label">Country</label>
                                <select id="select-container" value={country} onChange={handleCountryChange} >
                                    <option value="">Choose Country</option>
                                    <option value="Canada">Canada</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                {/* value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} */}
                                <label htmlFor="select-container" className="form-label">City</label>
                                <select id="select-container" value={city} onChange={handleCityChange} >
                                    <option value="">Choose City</option>
                                    <option value="Toronto">Toronto</option>
                                    <option value="Kitchener">Kitchener</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                {/* value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} */}
                                <label htmlFor="select-container" className="form-label">Province</label>
                                <select id="select-container" value={province} onChange={handleProvinceChange} >
                                    <option value="">Choose Province</option>
                                    <option value="Ontario">Ontario</option>
                                    <option value="Alberta">Alberta</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Address' onChange={handleAddressChange} value={address} />
                                <div id="Address" className="form-text"></div>
                            </div>

                            <div className="mb-3">
                                <input type="text" placeholder='Apartment' onChange={handleApartmentChange} value={apartment} />
                                <div id="Apartment" className="form-text"></div>
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Postalcode' onChange={handlePostalCodeChange} value={postalcode} />
                                <div id="Postalcode" className="form-text"></div>
                            </div>
                            <div className="mb-3">
                                <input autoComplete="current-password" placeholder="Password" onChange={handlePasswordChange} type="password" value={password} id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3">
                                <input autoComplete="current-password" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} type="password" value={confirmpassword} id="exampleInputConfirmPassword1" />
                            </div>



                            <div className=" form-check ">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label form-text" htmlFor="exampleCheck1"> I agree to the <b>Terms & Condition</b> </label>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck2" />
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

                </div>
            </div>
        </>
    )
}
export default VendorRegistration;