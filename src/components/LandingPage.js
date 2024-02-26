import React from 'react';
import './css/styles.css'; 
import Typewriter from './Typewriter';
import DealzupApp from './images/DealzupApp.png';
import appStore from './images/appStore.png';
import googlePlay from './images/googlePlay.png';
import dealzup_earn from './images/dealzup_earn.jpeg';
import dealzup_save from './images/dealzup_save.jpg';




const LandingPage = ()=>{
    return (
      <>
      {/* Video Banner Start*/}
      <div className="video-wrapper">
        <video className="background" autoPlay muted loop poster="https://cyphers-thecyphersagency.netdna-ssl.com/wp-content/uploads/2016/10/web-texture.jpg">
                <source src="https://thecyphersagency.com/wp-content/uploads/2018/07/TCA-homepage-video-web-compress.mp4" type="video/mp4"/>
        </video>
        <div className="content ">
          <h1>Explore, Earn Rewards. <br/>Start Saving Today!</h1>
          <div className="search-box search">
             <i className="fa fa-search"></i> <input className="search-input" type="text" placeholder="Update Pincode.." />
          </div>
          
          <p className='banner_fonts'>Dealzup is supporting the next generation of users, entrepreneurs, and everyone in between.</p>
          </div>
      </div>
     
      {/* Video Banner */}

      {/* 2nd Section Start */}

      {/* 2nd Section */}
      
      {/* 3rd Section Start */}


      {/* 3rd Section End */}
      <div className='container custom_box_container '>
        <div className='row justify-content-center'>
          <h2 className='text-center'>Save time, money and earn rewards</h2>
         
          <div className='col-md-6 wow fadeInUp '>
            <div className='custom_box col_left'>
              <h5> How to save?</h5>
              <p>Discover flyers, promotions, and enticing deals to find products at affordable rates.</p>
              <a href="/">Know More &#8594;  </a>
              <img className="img-box" src={dealzup_save}alt="Dealzup" />
            </div>
          </div>
          <div className='col-md-6 wow fadeInUp'>
            <div className='custom_box col_left'>
              <h5> How to earn?</h5>
              <p>Explore rewards for earning cash and points, and engage in our Spin to Win game!</p>
              <a href="/">Know More &#8594; </a>
              <img className="img-box" src={dealzup_earn}alt="Dealzup" />
            </div>
          </div>
          
        </div>
      </div>

      {/* Gradient Section  */}
      <div className=" justify-content-center custom-gradient ">
        <div className=" container justify-content-center align-items-center">
            <h3 className="fw-light align-items-center ">Maximize Your Savings and Fun with Our App: Earn, Win, and Spin!</h3>
            <p>How can DealzUp revolutionize your shopping experience by integrating captivating rewards, opportunities to earn and win, and an exhilarating spin feature, all within one seamless platform?</p>
              <button className='custom_button'> View Flyers</button>
              <button className='custom_button'> Get Deals</button>
              <button className='custom_button'> Get Offers</button>
              <button className='custom_button'> Spin & Win</button>
              <button className='custom_button'> Save Money</button>
              <button className='custom_button'> Earn Rewards</button>
              <button className='custom_button'> Earn Points</button>
              <button className='custom_button'> Student Benefits</button>
              <div> <button className='custom_button2'>Get Started</button></div>
              <h5 className="fw-light text-white m-0"></h5>
           </div>
        </div>
        {/* Gradient Section  */}
      
        {/* Download App Section Start */}
        <div className='container'>
            <div className='container-app'>
              <div className="row">
                <div className='col-md-6 text-left '>
                  <h2>Download the App</h2>
                  <p >Dealzup is supporting the next generation of users, entrepreneurs, and everyone in between.</p>
                  <Typewriter />
                  <br/>
                    <div className='column-image'><img className="app-img" src={appStore}  alt="Dealzup App Store"/>  </div>
                    <div className='column-image'><img className="app-img" src={googlePlay} alt="Dealzup Google Play" /></div>
                </div>
                <div className='col-md-6'>
                  <div className='image'><img src={DealzupApp} alt="Dealzup App" /></div>
                </div>
              </div>
            </div>
          </div>
        {/* Download App Section End */}

      </>
      );

}

export default LandingPage;