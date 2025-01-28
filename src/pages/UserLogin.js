import React, { useState } from 'react'
/* eslint-disable-next-line no-unused-vars */
import { Link } from 'react-router-dom';
import loginImage from './../assets/images/login-side-image.jpg'
import './../assets/css/login.css';
import './../assets/css/styles.css';
import * as yup from 'yup'

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState({ term1: false, term2: false });
    const [error, setError] = useState("");
    const [termerror, setTermError] = useState("");
    // const navigate = useNavigate();

    const schema = yup.object().shape({
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        username: yup.string().required("UserName is required"),
    });


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const ApiCall = async (data) => {
        const apiEndpoint = `${process.env.REACT_APP_API_URL}auth/user/login/`;
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            const result = await response.json();
            console.log('Login successful:', result);
            // Redirect to another page on successful login
            // navigate('/LandingPage'); 
        }
        catch (error) {

            console.error('Error:', error);
            console.log(JSON.stringify(error))
            setError('Invalid credentials. Please try again.');
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you can perform authentication logic with the username and password
        console.log('Username:', email); //Testing purpose
        console.log('Password:', password);
        setError("")

        // Data to be sent
        const data = {
            username: email,
            password: password,
        };
        schema.validate(data)
            .then(valid => {
                console.log(valid, error)
                console.log(isChecked.term1, isChecked.term2)
                if (!isChecked.term1 || !isChecked.term2) {
                    setTermError(prevErrors => ({
                        ...prevErrors,
                        term1: !isChecked.term1 ? "You must agree to the Terms & Conditions" : null,
                        term2: !isChecked.term2 ? "You must agree to the Privacy Policy" : null,
                    }));
                } else {
                    // Clear checkbox-related errors if checkboxes are valid
                    setTermError(prevErrors => ({
                        ...prevErrors,
                        term1: null,
                        term2: null,
                    }));
                    ApiCall(data)
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                setError(error.errors);
            });
    };

    const handleCheckboxChange = (e, term) => {
        console.log('t', term, e.target.checked);
        setIsChecked(prevState => ({
            ...prevState,
            [term]: e.target.checked,
        }));

        // Clear the error when the checkbox is checked
        if (e.target.checked) {
            setTermError(prevErrors => ({
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
            <div className="container element">
                <div className="row justify-content-center">
                    <div className="custom_form_box column col-md-6 form_border_radius">
                        <form className="" onSubmit={handleSubmit}>
                            <h1 className='heading'>Sign in</h1>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="mb-3">
                                <input type="text" placeholder='User Name' autoComplete="email" onChange={handleEmailChange} value={email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text"></div>
                            </div>
                            <div className="mb-3">
                                <input autoComplete="current-password" placeholder="Password" onChange={handlePasswordChange} type="password" value={password} id="exampleInputPassword1" />
                            </div>
                            <div className=" form-check ">
                                <input type="checkbox" className={`form-check-input ${termerror.term1 ? 'is-invalid' : ''}`} id="exampleCheck1" onChange={(e) => handleCheckboxChange(e, 'term1')} checked={isChecked.term1} />
                                <label className="form-check-label form-text" htmlFor="exampleCheck1"> I agree to the <b>Terms & Condition</b> </label>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className={`form-check-input ${termerror.term2 ? 'is-invalid' : ''}`} id="exampleCheck2" onChange={(e) => handleCheckboxChange(e, 'term2')} checked={isChecked.term2} />
                                <label className="form-check-label form-text" htmlFor="exampleCheck2"> I agree to the   <b> Privacy Policy</b></label>

                            </div>
                            <div className="form-text2 mb-3"><Link to="/ForgotPassword">Forgot Password?</Link></div>
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

                            <div className="form-text1 mb-3">Don't have an account?</div>
                            <div className="form-text3 mb-3"><Link to="/registration">Create an account</Link></div>
                        </form>
                    </div>
                    <div className="col-md-6 custom_shadow_box image_border_radius" >
                        <img className='image-login' src={loginImage} alt="DealzUp login" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserLogin;