import React, { useEffect, useState } from 'react';
import './../../assets/vendors/css/styles.css';
import './../../components/vendors/Header';
import Header from './../../components/vendors/Header';
import Sidebar from './../../components/vendors/Sidebar';
import { useRefreshToken } from '../../hooks/useRefreshToken';
import { Link } from 'react-router-dom';



const VendorCreateBusiness = () => {
  const [data, setData] = useState()
  const { refreshAccessToken, refresherror } = useRefreshToken();


  useEffect(() => {
    const GetApi = async () => {
      const newAccessToken = await refreshAccessToken();
      console.log(newAccessToken, 'refresh token', refresherror)
      let vendorInfo = localStorage.getItem('vendorInfo');
      if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');
      vendorInfo = JSON.parse(vendorInfo);
      if (!vendorInfo?.vendor?.id) throw new Error('Vendor ID not found in vendorInfo');

      const apiEndpoint = `${process.env.REACT_APP_API_URL}deals/businesses/vendor/3`;
      fetch(apiEndpoint, {
        method: 'GET',
        // mode: 'no-cors',

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${newAccessToken}`,
        },
      }).then((response) => response.json())
        .then((data) => {

          console.log(data, "isthis array i need")
          setData(data);
        })
        .catch((error) => {
          console.error('Error fetching the bussiness:', error);
        });
    }
    GetApi()

  }, [refreshAccessToken, refresherror])



  return (
    <>
      <Header />
      <div className="container-fluid content-section align">
        <div className="row">
          <Sidebar />
          <div className="col-md-8 main_content" >
            {data && data.length > 0 && <h2 style={{ textAlign: "center", color: "#007BFF" }}>
              <Link to="/VendorCreateBusinessPagination" style={{ textDecoration: "none", color: "#007BFF" }}>
                + Create Business
              </Link>
            </h2>}
            <div className="container" style={{ backgroundColor: "#000000", padding: "20px", minHeight: "100vh" }}>
              {data && data.length > 0 ? (
                <div
                  className="business-list"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {data?.map((business, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#1e1e1e",
                        color: "#fff",
                        border: "1px solid #444",
                        borderRadius: "12px",
                        padding: "20px",
                        width: "100%",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.8)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.5)";
                      }}
                    >
                      {/* Business Logo */}
                      <img
                        src={business.business_logo}
                        alt={`${business.name} Logo`}
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "8px",
                          marginRight: "20px",
                          flexShrink: 0,
                        }}
                      />
                      {/* Business Details */}
                      <div style={{ flexGrow: 1 }}>
                        <h2 style={{ margin: "0 0 10px", color: "#f4f4f4" }}>{business.name}</h2>
                        <p style={{ color: "#bbb", margin: "4px 0" }}>
                          <strong>Phone:</strong> {business.phone}
                        </p>
                        <p style={{ color: "#bbb", margin: "4px 0" }}>
                          <strong>Email:</strong> {business.email}
                        </p>
                        <p style={{ color: "#bbb", margin: "4px 0" }}>
                          <strong>Country:</strong> {business.country}
                        </p>
                        <p style={{ color: "#bbb", margin: "4px 0" }}>
                          <strong>Business Registration Number:</strong> {business.business_registration_number}
                        </p>
                        <p
                          style={{
                            color: business.is_verified ? "#28a745" : "#ffc107",
                            margin: "4px 0",
                          }}
                        >
                          <strong>Verification Status:</strong> {business.is_verified ? "Verified" : "Pending"}
                        </p>
                      </div>
                      {/* View Document Link */}
                      <a
                        href={business.business_verification_document}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          marginLeft: "20px",
                          padding: "10px 20px",
                          backgroundColor: "#007BFF",
                          color: "#fff",
                          borderRadius: "8px",
                          textDecoration: "none",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
                      >
                        View Document
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <h1 style={{ textAlign: "center", color: "#f4f4f4" }}>No Business to Show</h1>
                  <h2 style={{ textAlign: "center", color: "#007BFF" }}>
                    <Link to="/VendorCreateBusinessPagination" style={{ textDecoration: "none", color: "#007BFF" }}>
                      + Create Business
                    </Link>
                  </h2>
                  <div className="video-container" style={{ textAlign: "center", marginTop: "50px" }}>
                    <iframe
                      width="100%"
                      height="600px"
                      src="https://www.youtube.com/embed/gnIah_M0sjQ"
                      title="YouTube Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: "12px", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.8)" }}
                    ></iframe>
                  </div>
                </>
              )}
            </div>



          </div>
        </div>
      </div >

    </>
  );
};


export default VendorCreateBusiness;
