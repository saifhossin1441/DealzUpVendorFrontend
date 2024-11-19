import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate in React Router v6
import loginImage from './../assets/images/login-side-image.jpg';
import './../assets/css/login.css';
import './../assets/css/styles.css';
import axios from 'axios';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize the navigate function

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        try {
            // Send POST request to the login API
            const response = await axios.post('http://127.0.0.1:8000/auth/user/login/', data);

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                // Redirect after successful login
                navigate('/VendorDashboard'); // Redirect to dashboard (change to your route)
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid email or password');
        }
    };

    return (
        <>
            <div id="background-wrap">
                {/* Bubbles */}
            </div>
            <div className="container element">
                <div className="row justify-content-center">
                    <div className="custom_form_box column col-md-6 form_border_radius">
                        <form onSubmit={handleSubmit}>
                            <h1 className='heading'>Sign in</h1>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    placeholder='Email'
                                    autoComplete="email"
                                    onChange={handleEmailChange}
                                    value={email}
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />
                                <div id="emailHelp" className="form-text"></div>
                            </div>
                            <div className="mb-3">
                                <input
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    onChange={handlePasswordChange}
                                    type="password"
                                    value={password}
                                    id="exampleInputPassword1"
                                />
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    required
                                />
                                <label className="form-check-label form-text" htmlFor="exampleCheck1">
                                    I agree to the <b>Terms & Condition</b>
                                </label>
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck2"
                                    required
                                />
                                <label className="form-check-label form-text" htmlFor="exampleCheck2">
                                    I agree to the <b>Privacy Policy</b>
                                </label>
                            </div>

                            <div className="form-text2 mb-3">
                                <Link to="/ForgotPassword">Forgot Password?</Link>
                            </div>

                            <button type="submit" className="btn btn-dark mb-3">Submit</button>

                            <div id="g_id_onload" data-client_id="YOUR_GOOGLE_CLIENT_ID" data-login_uri="https://your.domain/your_login_endpoint" data-auto_prompt="false"></div>
                            <div className="g_id_signin mb-3" data-type="standard" data-size="large" data-theme="outline" data-text="sign_in_with" data-shape="rectangular" data-logo_alignment="left"></div>

                            <div className="form-text1 mb-3">Don't have an account?</div>
                            <div className="form-text3 mb-3">
                                <Link to="/registration">Create an account</Link>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6 custom_shadow_box image_border_radius">
                        <img className='image-login' src={loginImage} alt="DealzUp login" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserLogin;