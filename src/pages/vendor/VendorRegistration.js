import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup'
import { register } from '../../apis/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';


const VendorRegistration = () => {
    const [isChecked, setIsChecked] = useState({ term1: false, term2: false });
    const [termerror, setTermError] = useState({ term1: null, term2: null });
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (response) => {
            if (response.response.data.email) {
                toast(`${response.response.data.email[0]}`);
            } else {

                navigate('/VendorLogin');
            }
        },
        onError: (error) => {

            if (error.response.data.email) {
                toast(`${error.response.data.email[0]}`);
            } else {
                toast(`Server Down. Please contact Administrator`);
            }
        }
    });

    const schema = yup.object().shape({
        full_name: yup.string().required("Full name is required"),
        email: yup.string().required("Email is required").email("Invalid email address"),
        phone: yup
            .string()
            .required("Phone number is required")
            .matches(/^\d{10}$/, "Phone number must be 10 digits"),
        country: yup.string().required("Country is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("Province is required"),
        address: yup.string().required("Address is required"),
        apartment: yup.string().optional(),
        pin: yup
            .string()
            .required("Postal Code is required")
            .matches(/^\d{6}$/, "Postal Code must be 6 digits"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        confirm_password: yup
            .string()
            .required("Confirm password is required")
            .oneOf([yup.ref('password'), null], "Passwords must match"),
    });

    const formik = useFormik({
        initialValues: {
            full_name: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            state: '',
            address: '',
            apartment: '',
            pin: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // Data to be sent to the backend
            const data = { ...values };
            if (isChecked.term1 && isChecked.term2) {
                mutation.mutate(data);
            } else {
                setTermError({
                    term1: !isChecked.term1 ? "You must agree to the Terms & Conditions" : null,
                    term2: !isChecked.term2 ? "You must agree to the Privacy Policy" : null,
                });
                toast.error("You must agree to the Terms & Conditions and Privacy Policy.");
            }
        },
    });

    const handleCheckboxChange = (e, term) => {
        setIsChecked(prevState => ({
            ...prevState,
            [term]: e.target.checked,
        }));
    };

    return (
        <>
            <div id="background-wrap">
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
            </div>
            <div className="container element-registration" style={{ width: '50%', marginTop: '50px !important' }}>
                <div className="row justify-content-center">
                    <div className="custom_form_box column form_border_radius_reg">
                        <form onSubmit={formik.handleSubmit}>
                            <h1 style={{ textAlign: 'center' }}>Vendor Sign Up</h1>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    autoComplete="name"
                                    {...formik.getFieldProps('full_name')}
                                />
                                {formik.touched.full_name && formik.errors.full_name && (
                                    <div className="form-text2">{formik.errors.full_name}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="form-text2">{formik.errors.email}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    {...formik.getFieldProps('phone')}
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <div className="form-text2">{formik.errors.phone}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <select
                                    id="country"
                                    {...formik.getFieldProps('country')}
                                >
                                    <option value="">Choose Country</option>
                                    <option value="Canada">Canada</option>
                                    <option value="India">India</option>
                                </select>
                                {formik.touched.country && formik.errors.country && (
                                    <div className="form-text2">{formik.errors.country}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <select
                                    id="city"
                                    {...formik.getFieldProps('city')}
                                >
                                    <option value="">Choose City</option>
                                    <option value="Toronto">Toronto</option>
                                    <option value="Kitchener">Kitchener</option>
                                </select>
                                {formik.touched.city && formik.errors.city && (
                                    <div className="form-text2">{formik.errors.city}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">Province</label>
                                <select
                                    id="state"
                                    {...formik.getFieldProps('state')}
                                >
                                    <option value="">Choose Province</option>
                                    <option value="Ontario">Ontario</option>
                                    <option value="Alberta">Alberta</option>
                                </select>
                                {formik.touched.state && formik.errors.state && (
                                    <div className="form-text2">{formik.errors.state}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    {...formik.getFieldProps('address')}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <div className="form-text2">{formik.errors.address}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Apartment"
                                    {...formik.getFieldProps('apartment')}
                                />
                                {formik.touched.apartment && formik.errors.apartment && (
                                    <div className="form-text2">{formik.errors.apartment}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    {...formik.getFieldProps('pin')}
                                />
                                {formik.touched.pin && formik.errors.pin && (
                                    <div className="form-text2">{formik.errors.pin}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="form-text2">{formik.errors.password}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    {...formik.getFieldProps('confirm_password')}
                                />
                                {formik.touched.confirm_password && formik.errors.confirm_password && (
                                    <div className="form-text2">{formik.errors.confirm_password}</div>
                                )}
                            </div>

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className={`form-check-input ${termerror.term1 ? 'is-invalid' : ''}`}
                                    id="exampleCheck1"
                                    onChange={(e) => handleCheckboxChange(e, 'term1')}
                                    checked={isChecked.term1}
                                />
                                <label className="form-check-label form-text" htmlFor="exampleCheck1">
                                    I agree to the <b>Terms & Condition</b>
                                </label>
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className={`form-check-input ${termerror.term2 ? 'is-invalid' : ''}`}
                                    id="exampleCheck2"
                                    onChange={(e) => handleCheckboxChange(e, 'term2')}
                                    checked={isChecked.term2}
                                />
                                <label className="form-check-label form-text" htmlFor="exampleCheck2">
                                    I agree to the <b>Privacy Policy</b>
                                </label>
                            </div>

                            <button type="submit" className="btn btn-dark mb-3">Submit</button>

                            <div className="form-text1 mb-3">Already have an account?</div>
                            <div className="form-text3 mb-3"><a href="/login"><b>Sign in</b></a></div>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};
export default VendorRegistration;