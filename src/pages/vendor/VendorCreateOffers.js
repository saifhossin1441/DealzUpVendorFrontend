import React, { useEffect, useState } from "react";
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';
import uploadGallery from './../../assets/images/uploadGallery.png';
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useRefreshToken } from "../../hooks/useRefreshToken";

const styles = {

  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    color: 'white'
  },
  imagePrevieww: {
    width: '30%',
    height: '50%',
    objectFit: 'cover'
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

const VendorCreateOffers = () => {

  const [image, setImage] = useState(null);
  const [error, setError] = useState({})
  const [business, setBusiness] = useState([])
  const [showcat, setShowcat] = useState('')
  const [showSub, setshowSub] = useState('')
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [filteredSubcategories, setFilteredSubcategories] = useState([])
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    name: '',
    descripton: '',
    on_click: '',
    active: true,
    image: null,
    start_date: '',
    end_date: '',
    vendor: '',
    business: '',
  });

  const navigate = useNavigate()
  const { refreshAccessToken, refresherror } = useRefreshToken();

  const schema = yup.object().shape({
    category: yup.string().required("Category is required"),
    subcategory: yup.string().required("SubCategory is required"),
    descripton: yup.string().required("Description is required"),
    image: yup.string().required("Image is required"),
    name: yup.string().required("Offer name is required"),
    business: yup.string().required("Business name is required"),
    start_date: yup
      .string()
      .required("Start Date is required")
      .test(
        "is-future-date",
        "Start Date must be today or in the future",
        (value) => value && new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
      ),
    end_date: yup
      .string()
      .required("End Date is required")
      .test(
        "is-future-date",
        "End Date must be today or in the future",
        (value) => value && new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
      ).when("start_date", (start_date, schema) =>
        schema.test(
          "is-after-start-date",
          "End Date must be on or after Start Date",
          (end_date) =>
            end_date &&
            new Date(end_date).setHours(0, 0, 0, 0) >=
            new Date(start_date).setHours(0, 0, 0, 0)
        )
      )
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newAccessToken = await refreshAccessToken();

        const fetchWithAuth = async (url, setter) => {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${newAccessToken}`,
            },
          });
          const data = await response.json();
          setter(data);
        };
        let vendorInfo = localStorage.getItem('vendorInfo');
        if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');
        vendorInfo = JSON.parse(vendorInfo);
        if (!vendorInfo?.vendor?.id) throw new Error('Vendor ID not found in vendorInfo');

        await fetchWithAuth(`${process.env.REACT_APP_API_URL}deals/businesses/vendor/${vendorInfo?.vendor?.id}`, setBusiness);
        await fetchWithAuth(`${process.env.REACT_APP_API_URL}deals/categories/`, (data) => setCategories(data.data));
        await fetchWithAuth(`${process.env.REACT_APP_API_URL}deals/subcategories/`, setSubcategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let vendorInfo = localStorage.getItem('vendorInfo');
    if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');

    vendorInfo = JSON.parse(vendorInfo); // Correct parsing

    if (!vendorInfo?.vendor?.id) throw new Error('Vendor ID not found in vendorInfo');

    // Set vendor ID in formData

    const formattedStartDate = formatDate(formData.start_date);
    const formattedEndDate = formatDate(formData.end_date);
    const updatedFormData = { ...formData, vendor: vendorInfo.vendor.id, start_date: formattedStartDate, end_date: formattedEndDate };
    console.log('Form Data:', updatedFormData);

    schema.validate(updatedFormData)
      .then(valid => {
        console.log(valid, error)
        setError({});
        SendDataToDatabase(updatedFormData)
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

    const apiEndpoint = `${process.env.REACT_APP_API_URL}deals/offers/`;
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
        console.log(result, "error result")
        setError(result)
      } else {
        const result = await response.json();
        console.log('Business Registration successful:', result);
        toast('Offer Uploaded Successfully')
        // Redirect to another page on successful login
        navigate('/VendorOffers');
      }
      console.log(error, "Business Errror")

    }
    catch (error) {

      console.error('Error:', error);
      setError('Server Down. Please contact Administrator');
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1 * 1024 * 1024) { // 1MB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFormData({
          ...formData,
          image: file
        });
      };
      reader.readAsDataURL(file);
      // setFileName(file.name); // Set the file name
    } else {
      alert('File size should be less than 1MB');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories?.find((item) => item.name === e.target.value);
    console.log(selectedCategory, "thos ")
    setShowcat(selectedCategory.name)
    if (selectedCategory) {
      // Filter subcategories based on the selected category id
      const subcategoriesForCategory = subcategories.filter(
        (subcategory) => subcategory.category === selectedCategory.id
      );
      setFilteredSubcategories(subcategoriesForCategory);

      // Update the form data
      setFormData((prevData) => ({
        ...prevData,
        category: selectedCategory.id, // Store the category id
        subcategory: '' // Reset subcategory when category changes
      }));
    }
  };

  return (
    <>
      <Header />
      <div class="container-fluid content-section align">
        <div class="row">
          <Sidebar />
          <div className="col-md-8" >


            <div className="content-box-o">
              <div>Choose Template</div>
            </div>


            <div class="hr-container">
              <span>Or</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="uploadGallerySection">

                {image ? (
                  <img src={image} alt="Business Logo" style={styles.imagePrevieww} />
                ) : (
                  <>
                    <label htmlFor="fileUpload">
                      <img className="uploadGallery" src={uploadGallery} alt="DealzupUploadGallery" />
                    </label>  <p>Maximum Size: 100KB</p>
                    <p>Size Dimension: 1920 x 1080</p>
                  </>)}
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  name="fileUpload"
                  onChange={handleImageUpload}
                />
                {error.image && <div id="Error" className="form-text2">{error.image}</div>}
              </div>



              <select
                name="category"
                required
                style={styles.select}
                value={showcat}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories?.map((data, index) => (
                  <option key={index} value={data?.name}>
                    {`${data?.name}`}
                  </option>
                ))}

              </select>
              {error.category && <div id="Error" className="form-text2">{error.category}</div>}

              <select
                name="subcategory"
                required
                style={styles.select}
                className="white-placeholder"
                value={showSub}
                onChange={(e) => {
                  const selectedCategory = subcategories?.find((item) => item.name === e.target.value);
                  if (selectedCategory) {
                    setFormData((prevData) => ({
                      ...prevData,
                      subcategory: selectedCategory.id, // Store data.id
                    }));
                    setshowSub(selectedCategory.name)
                  }
                }}
              >
                <option value="" disabled>
                  Select Sub Category
                </option>
                {filteredSubcategories?.map((data, index) => (
                  <option key={index} value={data?.name}>
                    {`${data?.name}`}
                  </option>
                ))}

              </select>
              {error.subcategory && <div id="Error" className="form-text2">{error.subcategory}</div>}

              <select
                name="business"
                required
                style={styles.select}
                className="white-placeholder"
                value={formData.business}
                onChange={(e) => {
                  const selectedBusiness = business?.find((item) => item.name === e.target.value);
                  if (selectedBusiness) {
                    setFormData((prevData) => ({
                      ...prevData,
                      business: selectedBusiness.id, // Store data.id
                    }));
                  }
                }}
              >
                <option value="" disabled>
                  Select Business
                </option>
                {business?.map((data, index) => (
                  <option key={index} value={data?.name}>
                    {`${data?.name}`}
                  </option>
                ))}
              </select>
              {error.business && <div id="Error" className="form-text2">{error.business}</div>}

              <input
                type="text"
                name="name"
                placeholder="Title"
                required
                style={styles.input}
                onChange={handleChange} value={formData.name}
                className="white-placeholder"
              />
              {error.name && <div id="Error" className="form-text2">{error.name}</div>}



              <input
                type="text"
                name="descripton"
                placeholder="Description"
                required
                style={styles.input}
                onChange={handleChange} value={formData.descripton}
                className="white-placeholder"
              />
              {error.descripton && <div id="Error" className="form-text2">{error.descripton}</div>}



              <div className="row" >
                <div className="col-md-6">
                  <DatePicker
                    selected={formData.start_date}
                    onChange={(date) => setFormData({
                      ...formData,
                      start_date: date
                    })}
                    selectsStart
                    startDate={formData.start_date}
                    endDate={formData.end_date}
                    id="from"
                    className="form-control "
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a start date"
                    style={{ width: '100%' }}
                  />
                </div>
                {error.start_date && <div id="Error" className="form-text2">{error.start_date}</div>}

                <div className="col-md-6">
                  <DatePicker
                    selected={formData.end_date}
                    onChange={(date) => setFormData({
                      ...formData,
                      end_date: date
                    })}
                    selectsEnd
                    startDate={formData.start_date}
                    endDate={formData.end_date}
                    minDate={formData.start_date} // Prevents selecting a "to" date before "from" date
                    id="to"
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select an end date"
                  />
                </div>
                {error.end_date && <div id="Error" className="form-text2">{error.end_date}</div>}
              </div>


              <button type="submit" style={styles.submitButton}> Submit</button>

            </form>
            <ToastContainer />
          </div>
        </div>
      </div>

    </>
  );
}

export default VendorCreateOffers;