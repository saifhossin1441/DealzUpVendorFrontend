import React, { useState } from "react";
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';
import uploadGallery from './../../assets/images/uploadGallery.png';
import * as yup from 'yup'

const styles = {

  form: {
    width: '100%',
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
    marginBottom: '20px'
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
    marginTop: '10px',
    width: '100%',
    padding: '20px',
    border: '1px solid #F9F9F9',
    background: 'transparent',
    color: 'white !important',
    borderRadius: '8px',
    placeholder: 'white'
  },

  '::placeholder': {
    color: 'white', // Change this to your desired color
  },
  select: {
    width: '100%',
    padding: '20px',
    border: '1px solid #F9F9F9',
    background: 'transparent',
    color: 'white',
    borderRadius: '8px',
    marginTop: '20px',
  },
  submitButton: {
    border: 'none',
    background: '#F9F9F9',
    color: 'black',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
    padding: '20px',
    borderRadius: '8px'
  }
};


const VendorCreateFlyers = () => {
  const [error, setError] = useState({})
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    descripton: '',
    on_click: '',
    active: true,
    image: null,
    vendor: 1,
  });



  const schema = yup.object().shape({
    category: yup.string().required("Category is required"),
    descripton: yup.string().required("Description is required"),
    image: yup.string().required("Image is required"),
    name: yup.string().required("Business name is required"),
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    schema.validate(formData)
      .then(valid => {
        console.log(valid, error)
        setError({});
        SendDataToDatabase(formData)
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
    // console.log(data)
    const apiEndpoint = 'http://127.0.0.1:8000/deals/flyers/';
    let formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) { // Only append non-null values
        formData.append(key, value);
      }
    });
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }


    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const result = await response.json()
        setError(result)
      } else {
        const result = await response.json();
        console.log('Business Registration successful:', result);
        // Redirect to another page on successful login
        // navigate('/VendorLogin'); 
      }
      console.log(error, "Business Errror")

    }
    catch (error) {

      console.error('Error:', error);
      setError('Server Down. Please contact Administrator');
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid content-section align">
        <div className="row">
          <Sidebar />
          <div className="col-md-8" >


            <div className="content-box-o">
              <div>Choose Template</div>
            </div>


            <div className="hr-container">
              <span>Or</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="uploadGallerySection">
                <img className="uploadGallery" src={uploadGallery} alt="DealzupUploadGallery" />
                <p>Maximum Size: 100KB</p>
                <p>Size Dimension: 1920 x 1080</p>
              </div>



              <select
                name="category"
                required
                style={styles.select}
                className="white-placeholder"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="">Select Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Medicine">Medicine</option>
                <option value="Fashion">Fashion</option>
                <option value="Education">Education</option>
                {/* Add more options as needed */}
              </select>



              <select
                name="category"
                required
                style={styles.select}
                className="white-placeholder"
              >
                <option value="" disabled>
                  Select Sub Category
                </option>
                <option value="">Select Sub Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Medicine">Medicine</option>
                <option value="Fashion">Fashion</option>
                <option value="Education">Education</option>
                {/* Add more options as needed */}
              </select>



              <input
                type="text"
                name="businessName"
                placeholder="Title"
                required
                style={styles.input}

                className="white-placeholder"
              />



              <input
                type="text"
                name="businessName"
                placeholder="Description"
                required
                style={styles.input}

                className="white-placeholder"
              />


              <div className="row" >
                <div className="col-md-6">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"

                    placeholder="Date"
                    required
                    style={styles.input}
                    name="startDate"
                    className="white-placeholder"
                  />
                </div>
                <div className="col-md-6">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="businessName"
                    placeholder="Date"
                    required
                    style={styles.input}

                    className="white-placeholder"
                  />
                </div>
              </div>

              <button type="submit" style={styles.submitButton}> Submit</button>

            </form>

          </div>
        </div>
      </div>

    </>
  );
}

export default VendorCreateFlyers