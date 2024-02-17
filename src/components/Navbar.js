import React from "react";
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          DealzUp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul  className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
              <li className="nav-item">
                <Link className="nav-link active " aria-current="page" to="/login">Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/registration">Sign up</Link>
              </li>
          </ul>
          <form className="d-flex" role="search">
            <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
              <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              {/* <label className="form-check-label" htmlFor="flexSwitchCheckDefault"> {`${props.mode==='light'?"Enable Dark Mode" :"Enable Light Mode"}`}</label> */}
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
