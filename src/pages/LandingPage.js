import React from 'react';
import './../assets/css/styles.css';
// import Typewriter from './../components/Typewriter';
// import DealzupApp from './../assets/images/DealzupApp.png';
import appStore from './../assets/images/appStore.png';
import googlePlay from './../assets/images/googlePlay.png';
import dealzup_earn from './../assets/images/dealzup_earn.jpeg';
import dealzup_save from './../assets/images/dealzup_save.jpg';
import banner from './../assets/images/banner.svg';
import mobile from './../assets/images/mobile.png';
import bank from './../assets/images/DBank.png';

const LandingPage = () => {
  return (
    <>
      {/* 1st Section Start */}
      <div className=" container-fluid banner" style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: '120vh',
      }}>
        <div className="container">
          <div className='row'>
            <div className='col-md-6'>
              <h1>Shop smarter with Dealzup – Get cashback directly into your
                bank account!</h1>
            </div>
            <div className='col-md-6' style={{}}>
              <div className='image' >
                <img src={bank} alt="Dealzup App" className="img-fluid " />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <h2>Boost Your Brand For Free.</h2>
            </div>

            <div className='col-md-4'>
              <div className='image'  >
                <img src={mobile} alt="Dealzup App" className="img-fluid heart " />
              </div>
            </div>

            <div className='col-md-4  text-center'  >
             <center><h3>It’s easier in the apps</h3></center> 
              <img className="app-img" src={appStore} alt="Dealzup App Store" />
              <img className="app-img" src={googlePlay} alt="Dealzup Google Play" />
            </div>
          </div>
        </div>
      </div>
      {/* 1st Section End*/}

      {/* 2nd Section Start */}
      <div className='container custom_box_container '>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <h2 className='text-center'>Empowering Customers & Vendors: Discover What We Offer</h2>
          </div>
          <div className='col-md-6 wow fadeInUp '>
            <div className='custom_box '>
              <h5> Customers</h5>
              <p>Discover flyers, promotions, and enticing deals to find products at affordable rates.</p>
              <p>Explore rewards for earning cash and points, and engage in our Spin to Win game!</p>
              {/* <a href="/">Know More &#8594;  </a> */}
              <img className="img-box" src={dealzup_save} alt="Dealzup" />
            </div>
          </div>
          <div className='col-md-6 wow'>
            <div className='custom_box  '>
              <h5> Vendors</h5>
              <p>Everything you need to promote and profit. The Easiest Way to Grow Your
                Revenue</p>
              <p>Promote your products, discover new customers, and gain insights from top marketing experts </p>
              {/* <a href="/">Know More &#8594;  </a> */}
              <img className="img-box" src={dealzup_earn} alt="Dealzup" />
            </div>
          </div>

        </div>
      </div>
      {/* 2nd Section End */}

      {/* Gradient Section  */}
      <div className=" justify-content-center custom-gradient ">
        <div className=" container justify-content-center align-items-center" >
          <h3 className="fw-light align-items-center ">Maximize Your Savings and Fun with Our App: Earn, Win, and Spin!</h3>
          <p>How can DealzUp revolutionize your shopping experience by integrating captivating rewards, opportunities to earn and win, and an exhilarating spin feature, all within one seamless platform?</p>
          <div className='row text-center' style={{ alignItems: 'center !important' }}>

            <div className='col-md-3'><center><button className='custom_button'> View Flyers</button></center></div>
            <div className='col-md-3'><center> <button className='custom_button'> Get Deals</button></center></div>
            <div className='col-md-3'><center><button className='custom_button'> Get Offers</button></center></div>
            <div className='col-md-3'><center><button className='custom_button'> Spin & Win</button></center></div>

          </div>
          <div className='row text-center'>
            <div className='col-md-3 '><center><button className='custom_button'> Save Money</button></center></div>
            <div className='col-md-3'><center><button className='custom_button'> Earn Rewards</button></center></div>
            <div className='col-md-3'><center><button className='custom_button'> Earn Points</button></center></div>
            <div className='col-md-3'><center><button className='custom_button'> Student Offers</button></center></div>
          </div>
          <div> <button className='custom_button2'>Get Started</button></div>

        </div>
      </div>
      {/* Gradient Section  */}

      {/* Download App Section Start */}
      {/* <div className='container'>
          <div className='container-app'>
            <div className="row">
              <div className='col-md-6 text-left'>
                <h2>Download the App</h2>
                <p>Dealzup is supporting the next generation of users, entrepreneurs, and everyone in between.</p>
                <Typewriter />
                <br />
                <div className='column-image'>
                  <img className="app-img" src={appStore} alt="Dealzup App Store" />
                </div>
                <div className='column-image'>
                  <img className="app-img" src={googlePlay} alt="Dealzup Google Play" />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='image'>
                  <img src={DealzupApp} alt="Dealzup App" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      {/* Download App Section End */}
    </>
  );

}

export default LandingPage;