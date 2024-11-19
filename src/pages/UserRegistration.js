import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isStudent, setIsStudent] = useState(null);
  const [promocode, setPromoCode] = useState("");
  const [studentid, setStudentId] = useState("");
  const [university, setUniversity] = useState("");
  const [graduationyear, setGraduationYear] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false); // State for Terms & Conditions checkbox
  const [agreePrivacy, setAgreePrivacy] = useState(false); // State for Privacy Policy checkbox

  const navigate = useNavigate(); // Hook for navigation

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
  const handleStudentChange = (event) => setIsStudent(event.target.value === "yes");
  const handlePromoCode = (event) => setPromoCode(event.target.value);
  const handleStudentId = (event) => setStudentId(event.target.value);
  const handleUniversity = (event) => setUniversity(event.target.value);
  const handleGraduationYear = (event) => setGraduationYear(event.target.value);

  const handleAgreeTermsChange = (event) => setAgreeTerms(event.target.checked); // Handle Terms checkbox
  const handleAgreePrivacyChange = (event) => setAgreePrivacy(event.target.checked); // Handle Privacy checkbox

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting normally

    if (password !== confirmpassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      alert('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    // Set the email as the username
    const formData = {
      name,
      email,
      password,
      password_confirmation: confirmpassword,
      is_student: isStudent === null ? false : isStudent,
      promo_code: isStudent ? promocode : '',
      student_id: isStudent ? studentid : '',
      university: isStudent ? university : '',
      graduation_year: isStudent ? graduationyear : '',
      username: email,  // Use email as username
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/register/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Registration successful:', response.data);

      // Redirect to the login page upon success
      navigate('/login'); // Navigate to the login page
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: 200 }}>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Name"
            autoComplete="name"
            onChange={handleNameChange}
            value={name}
          />
        </div>

        {/* Email (used as username) */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleEmailChange}
            value={email}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="current-password"
            onChange={handleConfirmPasswordChange}
            value={confirmpassword}
          />
        </div>

        {/* Are you a student? */}
        <div className="mb-3">
          <label htmlFor="select-container" className="form-label">Are you a Student?</label>
          <select id="select-container" onChange={handleStudentChange} value={isStudent === null ? '' : isStudent ? 'yes' : 'no'}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Student-specific fields */}
        {isStudent === true && (
          <>
            <div className="mb-3">
              <input type="text" onChange={handlePromoCode} value={promocode} placeholder="Have a promo code?" autoComplete="promo code" />
            </div>
            <div className="mb-3">
              <input type="text" onChange={handleStudentId} value={studentid} placeholder="Student ID" autoComplete="student id" />
            </div>
            <div className="mb-3">
              <input type="text" onChange={handleUniversity} value={university} placeholder="School/College/University" autoComplete="School" />
            </div>
            <div className="mb-3">
              <input type="text" onChange={handleGraduationYear} value={graduationyear} placeholder="Graduation Year" autoComplete="Graduation Year" />
            </div>
          </>
        )}

        {/* Terms & Conditions */}
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            onChange={handleAgreeTermsChange}
            checked={agreeTerms}
            required
            style={{ zIndex: 1 }}
          />
          <label className="form-check-label form-text" htmlFor="exampleCheck1"> I agree to the <b>Terms & Condition</b> </label>
        </div>

        {/* Privacy Policy */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            onChange={handleAgreePrivacyChange}
            checked={agreePrivacy}
            required
            style={{ zIndex: 1 }}
          />
          <label className="form-check-label form-text" htmlFor="exampleCheck2"> I agree to the <b>Privacy Policy</b></label>
        </div>

        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
  );
};

export default UserRegistration;