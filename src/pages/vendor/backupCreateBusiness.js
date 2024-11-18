import React, { useState } from 'react';
import './../../assets/vendors/css/styles.css'; 
import { Link } from 'react-router-dom';
import './../../components/vendors/Header'; 
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    color: 'white'
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
    marginBottom:'20px'
  },
  uploadLabel: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadIcon: {
    fontSize: '50px',
    color: '#EE5635'
  },
 
  fileInput: {
    display: 'none'
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  input: {
    marginTop :'10px',
    width: '80%',
    padding: '20px',
    border: '1px solid #F9F9F9',
    background: 'transparent',
    color: 'white !important',
    borderRadius:'8px',
    placeholder : 'white'
  },

  '::placeholder': {
      color: 'white', // Change this to your desired color
    },
  select: {
    width: '80%',
    padding: '20px',
    border: '1px solid #F9F9F9',
    background: 'transparent',
    color: 'white',
    borderRadius:'8px'
  },
  submitButton: {
    border: 'none',
    background: '#F9F9F9',
    color: 'black',
    cursor: 'pointer',
    width: '80%',
    padding: '20px',
    borderRadius:'8px'
  }
};

const VendorCreateBusiness = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    email: '',
    country: ''
  });

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
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <>
        <Header />
        <div className="container-fluid content-section align">
        <div className="row">
            
            <Sidebar />
            
            <div className="col-md-8 main_content" >
                <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.uploadContainer}>
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
                </div>

                <input
                    type="text"
                    name="businessName"
                    placeholder="Business Name"
                    required
                    style={styles.input}
                    value={formData.businessName}
                    onChange={handleChange}
                    className="white-placeholder"
                />
                
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
                    <option value="India">India</option>
                    <option value="UK">UK</option>
                    {/* Add more options as needed */}
                </select>
                
                <Link to="/VendorCreateBusinessPagination" style={styles.submitButton}>Submit</Link>
                </form>
            </div>

        </div>
      </div>
       
    </>
  );
};


export default VendorCreateBusiness;
