import React, { useState, useEffect } from "react";
import './../../assets/vendors/css/styles.css'; 
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';
import images from './../../assets/images/uploadGallery.png';

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
        color: 'white !important',
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
    const [fileName, setFileName] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Optional: Fetch initial data if needed
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 1 * 1024 * 1024) { // 1MB limit
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            setFileName(file.name); // Set the file name
        } else {
            alert('File size should be less than 1MB');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("sub_category", subCategory);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        if (image) {
            formData.append("image", image);
        }

        setLoading(true);

        fetch("http://35.183.28.28:8080/deals/deals/", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            setLoading(false);
            // Optional: Reset form or handle success
        })
        .catch(error => {
            console.error("Error posting the deal:", error);
            setLoading(false);
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
                            {fileName && <p style={styles.fileName}>{fileName}</p>} {/* Display file name */}
                            <p>Maximum Size: 1MB</p>
                            <p>Size Dimension: 1920 x 1080</p>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <select
                                name="category"
                                required
                                style={styles.select}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Education">Education</option>
                            </select>

                            <select
                                name="sub_category"
                                required
                                style={styles.select}
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                required
                                style={styles.input}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="startDate">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        required
                                        style={styles.input}
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>  
                                <div className="col-md-6">
                                    <label htmlFor="endDate">End Date</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        required
                                        style={styles.input}
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>                          
                            </div>

                            <button type="submit" style={styles.submitButton} disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VendorCreateDeals;
