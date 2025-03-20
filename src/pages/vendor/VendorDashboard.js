import React, { useEffect, useState } from 'react';
import './../../assets/vendors/css/styles.css';
import Header from './../../components/vendors/Header';
import RightSidebar from './../../components/vendors/RightSidebar';
import Sidebar from './../../components/vendors/Sidebar';
import { Link } from 'react-router-dom';
import { useRefreshToken } from '../../hooks/useRefreshToken';
import { useQuery } from "@tanstack/react-query";
import { GetBanners } from '../../apis/vendor/Banners/Banners';
import { GetDeals } from '../../apis/vendor/Deals/Deals';
import { GetFlyers } from '../../apis/vendor/Flyers/Flyers';
import { GetOffers } from '../../apis/vendor/Offers/Offers';
import { GetUsage } from '../../apis/vendor/Subscriptions/Subscription';


const VendorDashboard = () => {

  const [flyers, setFlyers] = useState(null)
  const [banners, setBanners] = useState(null)
  const [deals, setDeals] = useState(null)
  const [offers, setOffer] = useState(null)
  const [SubscriptionDetails, setSubscriptionDetails] = useState(null)
  let vendorInfo = localStorage.getItem('vendorInfo');
  if (!vendorInfo) throw new Error('No vendorInfo found in localStorage');
  vendorInfo = JSON.parse(vendorInfo);
  console.log(vendorInfo?.vendor?.full_name)


  const query = useQuery({ queryKey: ['bannerData'], queryFn: GetBanners })
  const query2 = useQuery({ queryKey: ['dealsData'], queryFn: GetDeals })
  const query3 = useQuery({ queryKey: ['flyerData'], queryFn: GetFlyers })
  const query4 = useQuery({ queryKey: ['offerData'], queryFn: GetOffers })
  const query5 = useQuery({ queryKey: ['subscription'], queryFn: GetUsage })

  useEffect(() => {
    const fetchData = async () => {
      try {


        console.log(query5.data.data)
        setFlyers(query.data.data);
        setBanners(query2.data.data);
        setDeals(query3.data.data);
        setOffer(query4.data.data);
        setSubscriptionDetails(query5.data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query.data, query2.data, query3.data, query4.data, query5.data]);

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
                  <div className="circle" style={{ backgroundColor: '#000' }}>{`${flyers?.length}`}</div>
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
                  <div className="circle">  {offers?.length}</div>
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
