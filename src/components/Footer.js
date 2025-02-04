import React from 'react'
import { Link } from 'react-router-dom';
import facebook from './../assets/images/facebook.png'
import linkedin from './../assets/images/linkedin.png'
import instagram from './../assets/images/instagram.png'

const Footer = ()=>{
    return(
        <>
            <footer className="footer ">
                <div className="container-footer">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4'>
                            <h4>About DealzUp</h4>
                            <p >Dealzup is an innovative technology platform that empowers vendors to effortlessly upload their flyers, deals, and offers. Moreover, it offers users the convenience of selecting the most competitive prices tailored to their specific location.</p>
                            </div>
                            <div className='col-md-2'>
                                <h4>Help</h4>
                                <p className='text'> Support</p>
                                <p className='text'> Sitemap</p>
                                <Link style={{textDecoration:'none'}} to="/PrivacyPolicy"><p className='text'> Privacy Policy</p> </Link>
                                <Link  style={{textDecoration:'none'}} to="/TermsAndConditions"> <p className='text'> Terms & Condition</p></Link>
                            </div>
                            <div className='col-md-2'>
                                <h4>Region</h4>
                                <p className='text'> Canada</p>
                                <p className='text'> USA</p>
                                <p className='text'> India</p>
                                <p className='text'> Dubai</p>
                            </div>
                            <div className='col-md-4'>
                            <h4>Signup for DealzUp Newsletter</h4>
                                <form >
                                    <div className="mb-3">
                                        <input type="email"placeholder='Email' className='footer-email' autoComplete="email"  id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text"></div>
                                    </div>
                                <button type="submit" className="custom-btn btn-5 mb-3">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-8'></div>
                            <div className='col-md-4'>
                            <a href="https://www.facebook.com/people/Dealzup/61551597433785/"><img src={facebook} alt="Dealzup"className='social-icons' /></a>
                            <a href="https://www.instagram.com/dealzup.ca/"><img src={instagram} className='social-icons'  alt="Dealzup"/></a>
                            <a href="https://www.linkedin.com/company/dealzup/"><img src={linkedin} alt="Dealzup"  className='social-icons' /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
 );
}

export default Footer;