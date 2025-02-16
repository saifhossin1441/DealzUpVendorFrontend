import React, { useEffect, useState } from 'react';
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
import RightSidebar from './../../components/vendors/RightSidebar';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom';
import { useRefreshToken } from '../../hooks/useRefreshToken';



const VendorDashboard = () => {

  const [flyers, setFlyers] = useState(null)
  const [banners, setBanners] = useState(null)
  const [deals, setDeals] = useState(null)
  const [offers, setOffer] = useState(null)
  let vendorInfo = localStorage.getItem('vendorInfo');
  if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');
  vendorInfo = JSON.parse(vendorInfo);
  console.log(vendorInfo?.vendor?.full_name)

  const { refreshAccessToken, refresherror } = useRefreshToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newAccessToken = await refreshAccessToken();
        console.log(newAccessToken, "refresh token", refresherror);

        const endpoints = {
          flyers: "http://184.73.96.142/deals/flyers/",
          banners: "http://184.73.96.142/deals/banners/",
          deals: "http://184.73.96.142/deals/deals/",
          offers: "http://184.73.96.142/deals/offers/",
        };

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        };

        // Fetch all data in parallel
        const [flyersRes, bannersRes, dealsRes, offersRes] = await Promise.all([
          fetch(endpoints.flyers, { headers }).then((res) => res.json()),
          fetch(endpoints.banners, { headers }).then((res) => res.json()),
          fetch(endpoints.deals, { headers }).then((res) => res.json()),
          fetch(endpoints.offers, { headers }).then((res) => res.json()),
        ]);
        console.log(bannersRes, offersRes)
        // Update state with the fetched data
        setFlyers(flyersRes);
        setBanners(bannersRes);
        setDeals(dealsRes);
        setOffer(offersRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div class="container-fluid content-section align">
        <div class="row">
          <Sidebar />

          <div className="col-md-8" style={{ marginTop: 10 }}>
            <div className="col-md-12" style={{ textAlign: 'center' }}>
              <br />
              <h1 style={{ textAlign: 'center' }}> Welcome {`${vendorInfo?.vendor?.full_name}`}</h1>
              <h6 style={{ textAlign: 'center' }}>Vendor</h6>
            </div>
            <div className="col-md-12"><br /></div>
            <div className="col-md-12">
              <div className="row" style={{ justifyContent: 'center' }}>
                <div className="content-box col-md-5" style={{ backgroundColor: '#FAD6AD' }}>
                  <div style={{ color: '#000' }}><Link style={{ color: "black" }} to="/VendorFlyers"> Flyers</Link></div>
                  <div className="circle" style={{ backgroundColor: '#000' }}>{`${flyers?.count}`}</div>
                  <div style={{ color: '#000' }}><Link style={{ color: "black" }} to="/VendorFlyers"> View More</Link></div>
                </div>
                <div className="content-box col-md-5">
                  <div><Link style={{ color: "White" }} to="/VendorBanners">Banners</Link></div>
                  <div className="circle">{`${banners?.count}`}</div>
                  <div><Link style={{ color: "White" }} to="/VendorBanners">View More</Link></div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row" style={{ justifyContent: 'center' }}>
                <div className="content-box col-md-5">
                  <div><Link style={{ color: "White" }} to="/VendorDeals">Deals</Link></div>
                  <div className="circle" style={{ backgroundColor: '#000' }}>{`${deals?.count}`}</div>
                  <div> <Link style={{ color: "White" }} to="/VendorDeals">View More</Link></div>
                </div>
                <div className="content-box col-md-5">
                  <div><Link style={{ color: "White" }} to="/VendorOffers">Offer</Link></div>
                  <div className="circle">{offers?.count}</div>
                  <div><Link style={{ color: "White" }} to="/VendorOffers">View More</Link></div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row" style={{ justifyContent: 'center' }}>
                <div className="content-box col-md-12">
                  {/* <div>Request a Video</div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <RightSidebar /> */}
          <RightSidebar />
        </div>
      </div>
    </>

  );
}

export default VendorDashboard;
