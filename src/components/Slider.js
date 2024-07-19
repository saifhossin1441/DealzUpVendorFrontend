import React from 'react';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import dealzup_earn from '../assets/images/dealzup_earn.jpeg';
import dealzup_save from '../assets/images/dealzup_save.jpg';
import canadaMap from '../assets/images/canadaMap.jpeg';

const SliderComponent = () => {
    const data = [
      {
        id: 1,
        name: 'Earn Rewards',
        image: dealzup_earn
      },
      {
        id: 2,
        name: 'Save with Dealzup',
        image: dealzup_save
      },
      {
        id: 3,
        name: 'Get Cashback on your next purchase'
      }
    ];
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
  
    return (
      <div className='container additional-section'>
        <h2 className='text-center mb-4'>Discover More with Dealzup</h2>
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-end mb-4 mb-md-0">
              {/* Additional information on the right side */}
              <p className="text-md-start">
                Explore a world of savings, exciting offers, and endless opportunities with Dealzup. Our platform is designed to provide you with the best shopping experience, whether you're a student looking for exclusive benefits or a savvy shopper seeking the latest deals.
                <br />
                <br />
                <ul className="list-unstyled">
                  <li>Save money on your favorite products</li>
                  <li>Earn rewards and points with every purchase</li>
                  <li>Unlock special offers and discounts</li>
                  <li>Participate in fun games and win exciting prizes</li>
                </ul>
                <br />
                <br />
                <a href="/about-us" className="icon-link icon-link-hover">
                  Learn more about Dealzup &#8594;
                  <svg className="bi" aria-hidden="true"><use xlinkHref="#arrow-right"></use></svg>
                </a>
              </p>
            </div>
            <div className="col-md-6 text-center">
              {/* Gif or any content on the left side */}
              <img className="img-box" src={canadaMap} alt="canadaMap" />
            </div>
          </div>
        <div className='w-3/4 m-auto'>
          <div className='mt-20'>
            <Slider {...settings}>
              {data.map((d) => (
                <div key={d.id} className='bg-white h-[450px] text-black rounded-xl'>
                  <div className='h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center'>
      <img className="h-44 w-44 rounded-full" src={canadaMap} alt="canadaMap" />
      </div>
      <div className='flex flex-col justify-center items-center gap-4 p-4'>
      <p className='text-xl font-semibold'>Get it on</p>
      <p>Let's Go</p>
      <button className='bg-orange-500 text-black px-6 py-1 text-lg rounded-xl'>Read More</button>
    </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
  
  export default SliderComponent;
  

