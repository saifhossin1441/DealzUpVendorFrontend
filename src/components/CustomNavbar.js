import React, { useEffect, useState } from 'react';
import { Navbar, Container} from 'react-bootstrap';
// import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css'; // For custom styles if needed
import logo from './../assets/images/dealzupLogo.png';

const CustomNavbar = () => {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar
            className={`navbar ${scrolling ? 'bg-white' : 'transparent'} fixed-top bg-white-mobile`}
            expand="lg"
        >
            <Container fluid>
                <Navbar.Brand href="#home" className='logo' >
                    <img src={logo} alt="Dealzup Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* <Nav className="mx-auto">
                        <Nav.Link href="#flyers">Flyers</Nav.Link>
                        <Nav.Link href="#deals">Deals</Nav.Link>
                        <Nav.Link href="#about">About Us</Nav.Link>
                        <Nav.Link href="#contact">Contact Us</Nav.Link>
                    </Nav> */}
                    <div className=" d-flex align-items-center ml-auto">
                        {/* <Dropdown className='dropdown'>
                            <Dropdown.Toggle className="dropdownbtn" variant="success" id="dropdown-basic">
                                Sign Up
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/registration">Sign Up as a User</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/VendorRegistration">Sign Up as a Vendor</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        {/* <Dropdown className='dropdown'>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Sign In
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/login">Sign In as a User</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/VendorLogin">Sign In as a Vendor</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}

                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
