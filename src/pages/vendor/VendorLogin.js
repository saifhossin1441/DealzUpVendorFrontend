import React, { useState } from 'react'
/* eslint-disable-next-line no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import loginImage from './../../assets/images/login-image-vendor.jpg'
import './../../assets/css/login.css';
import './../../assets/css/styles.css';
import * as yup from 'yup'
import { login } from '../../apis/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';


const VendorLogin = () => {
    const [isChecked, setIsChecked] = useState({ term1: false, term2: false });
    const [termerror, setTermError] = useState({ term1: null, term2: null });
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            localStorage.setItem('vendorInfo', JSON.stringify(response));
            navigate('/VendorCreateBusiness');
        },
        onError: (error) => {
            console.log(error, "error");
            formik.setFieldError('general', 'Invalid credentials. Please try again.');
        }
    });

    const schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email is required"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            setTermError({ term1: null, term2: null });
            const data = {
                email: values.email,
                password: values.password,
            };

            if (!isChecked.term1 || !isChecked.term2) {
                setTermError({
                    term1: !isChecked.term1 ? "You must agree to the Terms & Conditions" : null,
                    term2: !isChecked.term2 ? "You must agree to the Privacy Policy" : null,
                });
            } else {
                mutation.mutate(data);
            }
        },
    });

    const handleCheckboxChange = (e, term) => {
        setIsChecked(prevState => ({
            ...prevState,
            [term]: e.target.checked,
        }));

        // Clear error for checked terms
        if (e.target.checked) {
            setTermError(prevErrors => ({
                ...prevErrors,
                [term]: null,
            }));
        }
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
            <div className="container element">
                <div className="row justify-content-center">
                    <div className="custom_form_box column col-md-6 form_border_radius">
                        <form onSubmit={formik.handleSubmit}>
                            <h1 className='heading'>Vendor Sign in</h1>

                            {formik.errors.general && <div className="alert alert-danger">{formik.errors.general}</div>}

                            <div className="mb-3">
                                <input
                                    type="email"
                                    placeholder='Email'
                                    autoComplete="email"
                                    {...formik.getFieldProps('email')}
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="invalid-feedback">{formik.errors.email}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    {...formik.getFieldProps('password')}
                                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                )}
                            </div>

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className={`form-check-input ${termerror.term1 ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleCheckboxChange(e, 'term1')}
                                    checked={isChecked.term1}
                                />
                                <label className="form-check-label form-text" htmlFor="exampleCheck1">
                                    I agree to the <b>Terms & Conditions</b>
                                </label>

                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className={`form-check-input ${termerror.term2 ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleCheckboxChange(e, 'term2')}
                                    checked={isChecked.term2}
                                />
                                <label className="form-check-label form-text" htmlFor="exampleCheck2">
                                    I agree to the <b>Privacy Policy</b>
                                </label>

                            </div>

                            <div className="form-text2 mb-3">
                                <Link to="/VendorForgotPassword">Forgot Password?</Link>
                            </div>

                            <button type="submit" className="btn btn-dark mb-3">Submit</button>

                            <div id="g_id_onload" data-client_id="YOUR_GOOGLE_CLIENT_ID" data-login_uri="https://your.domain/your_login_endpoint" data-auto_prompt="false"></div>
                            <div className="g_id_signin mb-3" data-type="standard" data-size="large" data-theme="outline" data-text="sign_in_with" data-shape="rectangular" data-logo_alignment="left"></div>

                            <div className="form-text1 mb-3">Don't have an account?</div>
                            <div className="form-text3 mb-3">
                                <Link to="/VendorRegistration">Create an account</Link>
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

export default VendorLogin;