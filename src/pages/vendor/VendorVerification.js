import React, { useState}  from 'react'


const ForgotVerification = ()=>{
    
      const[email, setEmail] = useState("");
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
        
      const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can perform authentication logic with the username and password
        console.log('Username:', email);
      };
    
    return(
        <>
            <div id="background-wrap">
                <div className="bubble1 x1"></div>
                <div className="bubble2 x2"></div>
                <div className="bubble3 x3"></div>
                <div className="bubble4 x4"></div>
                <div className="bubble5 x5"></div>
                <div className="bubble1 x6"></div>
                <div className="bubble2 x7"></div>
                <div className="bubble3 x8"></div>
                <div className="bubble4 x9"></div>
                <div className="bubble5 x10"></div>
                <div className="bubble1 x11"></div>
                <div className="bubble2 x12"></div>
                <div className="bubble3 x13"></div>
                <div className="bubble4 x14"></div>
                <div className="bubble5 x15"></div>
                <div className="bubble1 x16"></div>
                <div className="bubble2 x17"></div>
                <div className="bubble3 x18"></div>
                <div className="bubble4 x19"></div>
                <div className="bubble5 x20"></div>
            </div>
            <div className="container element-forgot-password">
                <div className="row justify-content-center">
                <div className="custom_form_box column col-md-6  form_border_radius">
                    <form className="" onSubmit={handleSubmit}>
                            <h1 >Enter the Verification code</h1>
                
                            <div className="mb-3">
                                <input type="email" placeholder='Enter code' autoComplete="email" onChange={handleEmailChange}  value={email}  id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text"></div>
                            </div>
                     
                            <button type="submit" className="btn btn-dark mb-3">Submit</button>
                            <div  className="form-text1 mb-3">We have sent code to your email.</div>
                            {/* <div  className="form-text3 mb-3"><a  href="/registration">Create an account</a></div> */}
                        </form>
                    </div>
                      
                </div>
            </div>
        </>
    );
     
}

export default ForgotVerification; 