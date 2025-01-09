import React, { useState } from "react";
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';
import images from './../../assets/images/uploadGallery.png';
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const styles = {
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        color: 'white',
    },
    uploadContainer: {
        width: '200px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '20px',
    },
    uploadLabel: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadIcon: {
        fontSize: '50px',
        color: '#EE5635',
    },
    fileInput: {
        display: 'none',
    },
    imagePreview: {
        width: '50%',
        height: '50%',
        objectFit: 'cover',
    },
    input: {
        marginTop: '10px',
        width: '100%',
        padding: '20px',
        border: '1px solid #F9F9F9',
        background: 'transparent',
        color: 'white',
        borderRadius: '8px',
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
        borderRadius: '8px',
    },
    fileName: {
        marginTop: '10px',
        color: 'white',
        fontSize: '14px',
        textAlign: 'center',
    },
};

const VendorCreateDeals = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState({})
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        descripton: '',
        on_click: '',
        active: true,
        image: null,
        start_date: '',
        end_date: ''
    });

    const navigate = useNavigate()

    const schema = yup.object().shape({
        category: yup.string().required("Category is required"),
        descripton: yup.string().required("Description is required"),
        image: yup.string().required("Image is required"),
        name: yup.string().required("Flyer name is required"),
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
        const apiEndpoint = `${process.env.REACT_APP_API_URL}deals/deals/`;
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
                // Redirect to another page on successful login
                toast('Deal Uploaded Successfully')
                // Redirect to another page on successful login
                navigate('/VendorDeals');
                // navigate('/VendorLogin'); 
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

                        <div className="uploadGallerySection">
                            <div style={styles.uploadContainer}>
                                {image ? (
                                    <img src={image} alt="Business Logo" style={styles.imagePreview} />
                                ) : (
                                    <>
                                        <label htmlFor="fileUpload" style={styles.uploadLabel}>
                                            <img src={images} alt="Upload Icon" style={styles.imagePreview} />
                                        </label>
                                    </>
                                )}
                                <input
                                    id="fileUpload"
                                    type="file"
                                    accept="image/*"
                                    style={styles.fileInput}
                                    name="fileUpload"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            {/* {fileName && <p style={styles.fileName}>{fileName}</p>} Display file name */}
                            <p>Maximum Size: 1MB</p>
                            <p>Size Dimension: 1920 x 1080</p>
                            {error.image && <div id="Error" className="form-text2">{error.image}</div>}
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <select
                                name="category"
                                required
                                style={styles.select}
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Education">Education</option>
                            </select>
                            {error.category && <div id="Error" className="form-text2">{error.category}</div>}

                            <select
                                name="sub_category"
                                required
                                style={styles.select}
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Sub Category</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Education">Education</option>
                            </select>

                            <input
                                type="text"
                                name="name"
                                placeholder="Title"
                                required
                                style={styles.input}
                                onChange={handleChange} value={formData.name}
                            />
                            {error.name && <div id="Error" className="form-text2">{error.name}</div>}


                            <input
                                type="text"
                                name="descripton"
                                placeholder="Description"
                                required
                                style={styles.input}
                                onChange={handleChange} value={formData.descripton}
                            />
                            {error.descripton && <div id="Error" className="form-text2">{error.descripton}</div>}


                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="startDate">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="start_date"
                                        required
                                        style={styles.input}
                                        onChange={handleChange} value={formData.start_date}
                                    />
                                </div>
                                {error.start_date && <div id="Error" className="form-text2">{error.start_date}</div>}

                                <div className="col-md-6">
                                    <label htmlFor="endDate">End Date</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="end_date"
                                        required
                                        style={styles.input}
                                        onChange={handleChange} value={formData.end_date}
                                    />
                                </div>
                                {error.end_date && <div id="Error" className="form-text2">{error.end_date}</div>}
                            </div>

                            <button type="submit" style={styles.submitButton}>
                                Submit
                            </button>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default VendorCreateDeals;
