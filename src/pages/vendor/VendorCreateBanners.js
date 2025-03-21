import React, { useEffect, useState } from "react";
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';
import uploadGallery from './../../assets/images/uploadGallery.png';
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { fetchData } from "../../apis/vendor/Common/common";
import { useMutation, useQuery } from '@tanstack/react-query';
import { AddBanners } from "../../apis/vendor/Banners/Banners";
import { useFormik } from "formik";

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
  imagePrevieww: {
    width: '30%',
    height: '50%',
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

// const VendorCreateBanners = () => {
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState({})
//   const [business, setBusiness] = useState([])
//   const [showcat, setShowcat] = useState('')
//   const [showSub, setshowSub] = useState('')
//   const [categories, setCategories] = useState([])
//   const [subcategories, setSubcategories] = useState([])
//   const [filteredSubcategories, setFilteredSubcategories] = useState([])
//   const [formData, setFormData] = useState({
//     category: '',
//     subcategory: '',
//     name: '',
//     descripton: '',
//     on_click: '',
//     active: true,
//     image: null,
//     start_date: '',
//     end_date: '',
//     business: '',
//     vendor: ''
//   });
//   const navigate = useNavigate()



//   const schema = yup.object().shape({
//     category: yup.string().required("Category is required"),
//     subcategory: yup.string().required("SubCategory is required"),

//     descripton: yup.string().required("Description is required"),
//     image: yup.string().required("Image is required"),
//     name: yup.string().required("Flyer name is required"),
//     business: yup.string().required("Business name is required"),

//     start_date: yup
//       .string()
//       .required("Start Date is required")
//       .test(
//         "is-future-date",
//         "Start Date must be today or in the future",
//         (value) => value && new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
//       ),
//     end_date: yup
//       .string()
//       .required("End Date is required")
//       .test(
//         "is-future-date",
//         "End Date must be today or in the future",
//         (value) => value && new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
//       ).when("start_date", (start_date, schema) =>
//         schema.test(
//           "is-after-start-date",
//           "End Date must be on or after Start Date",
//           (end_date) =>
//             end_date &&
//             new Date(end_date).setHours(0, 0, 0, 0) >=
//             new Date(start_date).setHours(0, 0, 0, 0)
//         )
//       )
//   });

//   const query = useQuery({ queryKey: ['dealsData'], queryFn: fetchData })

//   const mutation = useMutation({
//     mutationFn: AddBanners,
//     onSuccess: (response) => {
//       toast('Banner Uploaded Successfully')
//       navigate('/VendorBanners');
//     },
//     onError: (error) => {
//       console.log(error, "error")
//       setError('Server Down. Please contact Administrator');
//     }
//   })

//   useEffect(() => {
//     if (query.data) {
//       // Assuming query.data has business, categories, subcategories
//       const { business, categories, subcategories } = query.data;

//       setBusiness(business);
//       setCategories(categories.data);
//       setSubcategories(subcategories);
//     }
//   }, [query.data]);

//   const formatDate = (date) => {
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
//     const year = date.getFullYear();
//     return `${year}-${month}-${day}`; // Change the order to YYYY-MM-DD
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     let vendorInfo = localStorage.getItem('vendorInfo');
//     if (!vendorInfo) return

//     vendorInfo = JSON.parse(vendorInfo); // Correct parsing

//     if (!vendorInfo?.vendor?.id) return

//     // Set vendor ID in formData
//     const formattedStartDate = formatDate(formData.start_date);
//     const formattedEndDate = formatDate(formData.end_date);
//     const updatedFormData = { ...formData, vendor: vendorInfo.vendor.id, start_date: formattedStartDate, end_date: formattedEndDate };
//     console.log('Form Data:', updatedFormData);

//     schema.validate(updatedFormData)
//       .then(valid => {
//         console.log(valid, error)
//         setError({});
//         mutation.mutate(updatedFormData)
//         // SendDataToDatabase(updatedFormData)
//       })
//       .catch(error => {

//         const newErrors = {};
//         console.log(error)
//         Object.keys(error.value).forEach(field => {
//           if (error.params.path) {
//             console.log("first")
//             newErrors[error.params.path] = error.errors
//           }
//         });
//         setError(newErrors);
//       });

//   };



//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size <= 1 * 1024 * 1024) { // 1MB limit
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//         setFormData({
//           ...formData,
//           image: file
//         });
//       };
//       reader.readAsDataURL(file);
//       // setFileName(file.name); // Set the file name
//     } else {
//       alert('File size should be less than 1MB');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value
//     });

//   };


//   const handleCategoryChange = (e) => {
//     const selectedCategory = categories?.find((item) => item.name === e.target.value);
//     console.log(selectedCategory, "thos ")
//     setShowcat(selectedCategory.name)
//     if (selectedCategory) {
//       // Filter subcategories based on the selected category id
//       const subcategoriesForCategory = subcategories.filter(
//         (subcategory) => subcategory.category === selectedCategory.id
//       );
//       setFilteredSubcategories(subcategoriesForCategory);

//       // Update the form data
//       setFormData((prevData) => ({
//         ...prevData,
//         category: selectedCategory.id, // Store the category id
//         subcategory: '' // Reset subcategory when category changes
//       }));
//     }
//   };


//   return (
//     <>
//       <Header />
//       <div class="container-fluid content-section align">
//         <div class="row">
//           <Sidebar />
//           <div className="col-md-8" >


//             <div className="content-box-o">
//               <div>Choose Template</div>
//             </div>


//             <div class="hr-container">
//               <span>Or</span>
//             </div>
//             <form onSubmit={handleSubmit}>

//               <div className="uploadGallerySection">
//                 {image ? (
//                   <img src={image} alt="Business Logo" style={styles.imagePrevieww} />
//                 ) : (
//                   <>
//                     <label htmlFor="fileUpload">
//                       <img className="uploadGallery" src={uploadGallery} alt="DealzupUploadGallery" />
//                     </label>  <p>Maximum Size: 100KB</p>
//                     <p>Size Dimension: 1920 x 1080</p>
//                   </>)}
//                 <input
//                   id="fileUpload"
//                   type="file"
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   name="fileUpload"
//                   onChange={handleImageUpload}
//                 />
//                 {error.image && <div id="Error" className="form-text2">{error.image}</div>}

//               </div>


//               <select
//                 name="category"
//                 required
//                 style={styles.select}
//                 value={showcat}
//                 onChange={handleCategoryChange}
//               >
//                 <option value="" disabled>
//                   Select Category
//                 </option>
//                 {categories?.map((data, index) => (
//                   <option key={index} value={data?.name}>
//                     {`${data?.name}`}
//                   </option>
//                 ))}

//               </select>
//               {error.category && <div id="Error" className="form-text2">{error.category}</div>}

//               <select
//                 name="subcategory"
//                 required
//                 style={styles.select}
//                 className="white-placeholder"
//                 value={showSub}
//                 onChange={(e) => {
//                   const selectedCategory = subcategories?.find((item) => item.name === e.target.value);
//                   if (selectedCategory) {
//                     setFormData((prevData) => ({
//                       ...prevData,
//                       subcategory: selectedCategory.id, // Store data.id
//                     }));
//                     setshowSub(selectedCategory.name)
//                   }
//                 }}
//               >
//                 <option value="" disabled>
//                   Select Sub Category
//                 </option>
//                 {filteredSubcategories?.map((data, index) => (
//                   <option key={index} value={data?.name}>
//                     {`${data?.name}`}
//                   </option>
//                 ))}

//               </select>
//               {error.subcategory && <div id="Error" className="form-text2">{error.subcategory}</div>}

//               <select
//                 name="business"
//                 required
//                 style={styles.select}
//                 className="white-placeholder"
//                 value={formData.business}
//                 onChange={(e) => {
//                   const selectedBusiness = business?.find((item) => item.name === e.target.value);
//                   if (selectedBusiness) {
//                     setFormData((prevData) => ({
//                       ...prevData,
//                       business: selectedBusiness.id, // Store data.id
//                     }));
//                   }
//                 }}
//               >
//                 <option value="" disabled>
//                   Select Business
//                 </option>
//                 {business?.map((data, index) => (
//                   <option key={index} value={data?.name}>
//                     {`${data?.name}`}
//                   </option>
//                 ))}
//               </select>
//               {error.business && <div id="Error" className="form-text2">{error.business}</div>}


//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Title"
//                 required
//                 style={styles.input}
//                 onChange={handleChange} value={formData.name}
//                 className="white-placeholder"
//               />

//               {error.name && <div id="Error" className="form-text2">{error.name}</div>}


//               <input
//                 type="text"
//                 name="descripton"
//                 placeholder="Description"
//                 required
//                 style={styles.input}
//                 onChange={handleChange} value={formData.descripton}
//                 className="white-placeholder"
//               />
//               {error.descripton && <div id="Error" className="form-text2">{error.descripton}</div>}

//               <div className="row" >
//                 <div className="col-md-6">
//                   <DatePicker
//                     selected={formData.start_date}
//                     onChange={(date) => setFormData({
//                       ...formData,
//                       start_date: date
//                     })}
//                     selectsStart
//                     startDate={formData.start_date}
//                     endDate={formData.end_date}
//                     id="from"
//                     className="form-control "
//                     dateFormat="yyyy-MM-dd"
//                     placeholderText="Select a start date"
//                     style={{ width: '100%' }}
//                   />
//                 </div>
//                 {error.start_date && <div id="Error" className="form-text2">{error.start_date}</div>}

//                 <div className="col-md-6">
//                   <DatePicker
//                     selected={formData.end_date}
//                     onChange={(date) => setFormData({
//                       ...formData,
//                       end_date: date
//                     })}
//                     selectsEnd
//                     startDate={formData.start_date}
//                     endDate={formData.end_date}
//                     minDate={formData.start_date} // Prevents selecting a "to" date before "from" date
//                     id="to"
//                     className="form-control"
//                     dateFormat="yyyy-MM-dd"
//                     placeholderText="Select an end date"
//                   />
//                 </div>
//                 {error.end_date && <div id="Error" className="form-text2">{error.end_date}</div>}
//               </div>

//               <button type="submit" style={styles.submitButton}> Submit</button>


//             </form>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// }

const VendorCreateBanners = () => {
  const navigate = useNavigate();
  const [business, setBusiness] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);


  const query = useQuery({ queryKey: ['dealsData'], queryFn: fetchData });
  const mutation = useMutation({
    mutationFn: AddBanners,
    onSuccess: (response) => {
      toast('Banner Uploaded Successfully');
      navigate('/VendorBanners');
    },
    onError: (error) => {
      console.log(error, 'error');
      toast('Server Down. Please contact Administrator');
    }
  });

  useEffect(() => {
    if (query.data) {
      const { business, categories, subcategories } = query.data;
      setBusiness(business);
      setCategories(categories.data);
      setSubcategories(subcategories);
    }
  }, [query.data]);

  const schema = yup.object().shape({
    category: yup.string().required('Category is required'),
    subcategory: yup.string().required('SubCategory is required'),
    descripton: yup.string().required('Description is required'),
    image: yup.string().required('Image is required'),
    name: yup.string().required('Flyer name is required'),
    business: yup.string().required('Business name is required'),
    start_date: yup
      .string()
      .required('Start Date is required')
      .test('is-future-date', 'Start Date must be today or in the future', (value) => value && new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)),
    end_date: yup
      .string()
      .required('End Date is required')
      .test('is-future-date', 'End Date must be today or in the future', (value) => value && new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0))
      .when('start_date', (start_date, schema) =>
        schema.test('is-after-start-date', 'End Date must be on or after Start Date', (end_date) =>
          end_date && new Date(end_date).setHours(0, 0, 0, 0) >= new Date(start_date).setHours(0, 0, 0, 0)
        )
      )
  });

  const formik = useFormik({
    initialValues: {
      category: '',
      subcategory: '',
      name: '',
      descripton: '',
      on_click: '',
      active: true,
      image: null,
      simage: '',
      start_date: '',
      end_date: '',
      business: '',
      vendor: ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      let vendorInfo = localStorage.getItem('vendorInfo');
      if (!vendorInfo) return;

      vendorInfo = JSON.parse(vendorInfo); // Correct parsing

      if (!vendorInfo?.vendor?.id) return;

      // Set vendor ID in formData
      const formattedStartDate = formatDate(values.start_date);
      const formattedEndDate = formatDate(values.end_date);
      const updatedFormData = { ...values, vendor: vendorInfo.vendor.id, start_date: formattedStartDate, end_date: formattedEndDate };
      console.log('Form Data:', updatedFormData);

      mutation.mutate(updatedFormData);
    }
  });

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories?.find((item) => item.name === e.target.value);

    if (selectedCategory) {
      const subcategoriesForCategory = subcategories.filter((subcategory) => subcategory.category === selectedCategory.id);
      setFilteredSubcategories(subcategoriesForCategory);
      formik.setFieldValue('category', selectedCategory.id);
      formik.setFieldValue('subcategory', ''); // Reset subcategory when category changes
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1 * 1024 * 1024) { // 1MB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('image', file);
        formik.setFieldValue('simage', reader.result)
      };
      reader.readAsDataURL(file);
    } else {
      toast('File size should be less than 1MB');
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid content-section align">
        <div className="row">
          <Sidebar />
          <div className="col-md-8">
            <div className="content-box-o">
              <div>Choose Template</div>
            </div>

            <div className="hr-container">
              <span>Or</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="uploadGallerySection">
                {formik.values.image ? (
                  <img src={formik.values.simage} alt="Business Logo" style={styles.imagePrevieww} />
                ) : (
                  <>
                    <label htmlFor="fileUpload">
                      <img className="uploadGallery" src={uploadGallery} alt="DealzupUploadGallery" />
                    </label>
                    <p>Maximum Size: 100KB</p>
                    <p>Size Dimension: 1920 x 1080</p>
                  </>
                )}
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  name="fileUpload"
                  onChange={handleImageUpload}
                />
                {formik.errors.image && <div id="Error" className="form-text2">{formik.errors.image}</div>}
              </div>

              <select
                name="category"
                required
                style={styles.select}
                value={formik.values.category}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories?.map((data, index) => (
                  <option key={index} value={data?.name}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {formik.errors.category && <div id="Error" className="form-text2">{formik.errors.category}</div>}

              <select
                name="subcategory"
                required
                style={styles.select}
                value={formik.values.subcategory}
                onChange={(e) => {
                  const selectedSubcategory = filteredSubcategories?.find(
                    (item) => item.name === e.target.value
                  );
                  if (selectedSubcategory) {
                    formik.setFieldValue("subcategory", selectedSubcategory.id); // Save subcategory ID in form state
                  }
                }}
              >
                <option value="" disabled>
                  Select Sub Category
                </option>
                {filteredSubcategories?.map((data, index) => (
                  <option key={index} value={data?.name}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {formik.errors.subcategory && <div id="Error" className="form-text2">{formik.errors.subcategory}</div>}

              <select
                name="business"
                required
                style={styles.select}
                value={formik.values.business}
                onChange={(e) => {
                  // Find the selected business object by its name
                  const selectedBusiness = business?.find(
                    (item) => item.name === e.target.value
                  );

                  // If a business is selected, set the ID in Formik's state
                  if (selectedBusiness) {
                    formik.setFieldValue("business", selectedBusiness.id); // Save business ID in form state
                  }
                }}
              >
                <option value="" disabled>
                  Select Business
                </option>
                {business?.map((data, index) => (
                  <option key={index} value={data?.name}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {formik.errors.business && <div id="Error" className="form-text2">{formik.errors.business}</div>}

              <input
                type="text"
                name="name"
                placeholder="Title"
                required
                style={styles.input}
                onChange={formik.handleChange}
                value={formik.values.name}
                className="white-placeholder"
              />
              {formik.errors.name && <div id="Error" className="form-text2">{formik.errors.name}</div>}

              <input
                type="text"
                name="descripton"
                placeholder="Description"
                required
                style={styles.input}
                onChange={formik.handleChange}
                value={formik.values.descripton}
                className="white-placeholder"
              />
              {formik.errors.descripton && <div id="Error" className="form-text2">{formik.errors.descripton}</div>}

              <div className="row">
                <div className="col-md-6">
                  <DatePicker
                    selected={formik.values.start_date}
                    onChange={(date) => formik.setFieldValue('start_date', date)}
                    selectsStart
                    startDate={formik.values.start_date}
                    endDate={formik.values.end_date}
                    id="from"
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a start date"
                    style={{ width: '100%' }}
                  />
                </div>
                {formik.errors.start_date && <div id="Error" className="form-text2">{formik.errors.start_date}</div>}

                <div className="col-md-6">
                  <DatePicker
                    selected={formik.values.end_date}
                    onChange={(date) => formik.setFieldValue('end_date', date)}
                    selectsEnd
                    startDate={formik.values.start_date}
                    endDate={formik.values.end_date}
                    minDate={formik.values.start_date}
                    id="to"
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select an end date"
                  />
                </div>
                {formik.errors.end_date && <div id="Error" className="form-text2">{formik.errors.end_date}</div>}
              </div>

              <button type="submit" style={styles.submitButton}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorCreateBanners;