import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-dark fixed-top" style={{width:'100%', backgroundColor:'#784BF6'}}>
      <div className="container-fluid">
       
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            
          </ul>
          <form className="d-flex me-3" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success"  style={{borderColor:'#fff',color:'#fff'}} type="submit">Search</button>
            
          </form>
          
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" style={{borderRadius:'10px'}} href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Saif
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/VendorProfile">Profile</Link></li>
                <li><Link className="dropdown-item" to="/VendorDashboard">Dashboard</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="/">Logout</a></li>
              </ul>
            </li>
          </ul>
          {/* <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
             <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
          </div> */}
        </div>
      </div>
    </nav>
  );
}

export default Header;
