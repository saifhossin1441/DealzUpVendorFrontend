import React, { useState } from 'react'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';


const UserRegistration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [isStudent, setIsStudent] = useState(false); // State to track student status
    const [promocode, setPromoCode] = useState("");
    const [studentid, setStudentId] = useState("");
    const [university, setUniversity] = useState("");
    const [graduationyear, setGraduationYear] = useState("");
    const [isChecked, setIsChecked] = useState({ term1: false, term2: false });
    const [error, setError] = useState({});
    // const navigate = useNavigate();

    // const [selectedValue, setSelectedValue] = useState('Are you a Student?');

    const schema = yup.object().shape({
        username: yup.string().required("User name is required"),
        email: yup.string().required("Email is required").email("Invalid email address"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        password_confirmation: yup
            .string()
            .required("Confirm password is required")
            .oneOf([yup.ref('password'), null], "Passwords must match")
        ,
        is_student: yup.bool(),// Assuming this field indicates if the user is a student
        promo_code: yup
            .string()
            .when("is_student", { is: true, then: (schema) => schema.required("Promo Code is required") }
            ),
        student_id: yup
            .string()
            .when("is_student", { is: true, then: (schema) => schema.required("Student Id is required") }
            ),
        university: yup
            .string()
            .when("is_student", { is: true, then: (schema) => schema.required("University is required") }
            ),
        graduation_year: yup
            .string()
            .when("is_student", { is: true, then: (schema) => schema.required("Graduation Year is required") }
            ),
    });


    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleStudentChange = (event) => {
        setIsStudent(event.target.value === "yes");
    };

    const handlePromoCode = (event) => {
        setPromoCode(event.target.value);
    };

    const handleStudentId = (event) => {
        setStudentId(event.target.value);
    };

    const handleUniversity = (event) => {
        setUniversity(event.target.value);
    };

    const handleGraduationYear = (event) => {
        setGraduationYear(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you can perform authentication logic with the username and password
        setError({})

        const data = {
            username: name,
            email: email,
            password: password,
            password_confirmation: confirmpassword,
            is_student: isStudent,
            promo_code: promocode,
            student_id: studentid,
            university: university,
            graduation_year: graduationyear
        };
        console.log(data)
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
                    if (error.value[field] === "") {
                        newErrors[field] = "Required";
                    }
                    if (error.params.path) {
                        console.log("first")
                        newErrors[error.params.path] = error.errors
                    }
                });
                setError(newErrors);
            });
        // SendDataToDatabase(data)

    };

    const SendDataToDatabase = async (data) => {

        const apiEndpoint = `${process.env.REACT_APP_API_URL}auth/register/`;


        // Data to be sent


        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                // console.log(, "tiinids")
                const newErrors = {};
                result.error.fields.forEach(field => {

                    if (field.field) {
                        console.log(field)
                        newErrors[field.field] = field.message[0];
                    } else {
                        setError(result)
                    }
                })

                setError(newErrors);

                // throw new Error('Registration failed');
            } else {

                const result = await response.json();
                console.log('Registration successful:', result);
            }

            // Redirect to another page on successful login
            // navigate('/VendorDashboard'); // 
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
                            <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                            <div className="mb-3">
                                <input type="text" placeholder='User Name' autoComplete="name" onChange={handleNameChange} value={name} id="exampleInputName" />
                                {error.username && <div id="User Name" className="form-text2">{error.username}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="email" placeholder='Email' autoComplete="email" onChange={handleEmailChange} value={email} id="exampleInputEmail2" aria-describedby="emailHelp" />
                                {error.email && <div id="emailHelp" className="form-text2">{error.email}</div>}
                            </div>
                            <div className="mb-3">
                                <input autoComplete="current-password" placeholder="Password" onChange={handlePasswordChange} type="password" value={password} id="exampleInputPassword1" />
                                {error.password && <div id="Password" className="form-text2">{error.password}</div>}

                            </div>
                            <div className="mb-3">
                                <input autoComplete="current-password" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} type="password" value={confirmpassword} id="exampleInputConfirmPassword1" />
                                {error.password_confirmation && <div id="ConfirmPassword" className="form-text2">{error.password_confirmation}</div>}

                            </div>
                            <div className="mb-3">
                                {/* value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} */}
                                <label htmlFor="select-container" className="form-label">Are you Student?</label>
                                <select id="select-container" onChange={handleStudentChange} value={isStudent === null ? '' : isStudent ? 'yes' : 'no'}>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>
                            {isStudent === true && ( // Render additional fields if user is a student
                                <>
                                    <div className="mb-3">
                                        <input type="text" onChange={handlePromoCode} value={promocode} placeholder="Have a promo code?" autoComplete="promo code" />
                                        {error.promo_code && <div id="Promo Code" className="form-text2">{error.promo_code}</div>}

                                    </div>
                                    <div className="mb-3">
                                        <input type="text" onChange={handleStudentId} value={studentid} placeholder="Student ID" autoComplete="student id" />
                                        {error.student_id && <div id="Student Id" className="form-text2">{error.student_id}</div>}

                                    </div>
                                    <div className="mb-3">
                                        <input type="text" onChange={handleUniversity} value={university} placeholder="School/College/University" autoComplete="School" />
                                        {error.university && <div id="University" className="form-text2">{error.university}</div>}

                                    </div>
                                    <div className="mb-3">
                                        <input type="text" onChange={handleGraduationYear} value={graduationyear} placeholder="Graduation Year" autoComplete="Graduation Year" />
                                        {error.graduation_year && <div id="Graduation Year" className="form-text2">{error.graduation_year}</div>}

                                    </div>
                                </>
                            )}


                            <div className=" form-check ">
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
                </div>
            </div>
        </>
    );

}

export default UserRegistration; 