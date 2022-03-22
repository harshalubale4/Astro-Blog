import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./NavBar.css"


const NavBar = () => {
    const location = useLocation();



    useEffect(() => {
        const nav = document.querySelector(".primary-navigation");
        const navToggle = document.querySelector(".mobile-nav-toggle");

        navToggle.addEventListener("click", () => {

            const visiblity = nav.getAttribute("data-visible");
            if (visiblity === "false") {
                nav.setAttribute("data-visible", true);
                navToggle.setAttribute("aria-expanded", true);
            } else {
                nav.setAttribute("data-visible", false);
                navToggle.setAttribute("aria-expanded", false);
            }
        })
    }, [])



    return (
        <div>
            {/* <nav classNameName="navbar navbar-expand-lg navbar-dark bg-dark">
                <div classNameName="container-fluid">
                    <Link classNameName="navbar-brand" to="/">Blogging Web</Link>
                    <button classNameName="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span classNameName="navbar-toggler-icon"></span>
                    </button>
                    <div classNameName="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul classNameName="navbar-nav me-auto mb-2 mb-lg-0">
                            <li classNameName="nav-item">
                                <Link classNameName={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About Us</Link>
                            </li>
                            <li classNameName="nav-item">
                                <Link classNameName={`nav-link ${location.pathname === "/content" ? "active" : ""}`} to="/content">Content</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav> */}









            <header className='primary-header flex'>
                <div className='nav-brand'>
                    <Link to="/">Home</Link>
                </div>
                <button className='mobile-nav-toggle' aria-controls='primary-navigation' aria-expanded='false'><span className='sr-only'> </span></button>

                <nav>
                    <ul id="primary-navigation" data-visible="false" className="primary-navigation flex">
                        <li className='active'>
                            <Link to="/content">
                                <span aria-hidden='true'>01</span>Content
                            </Link>
                        </li>

                        <li>
                            <Link to="/about">
                                <span aria-hidden='true'>02</span>About
                            </Link>
                        </li>

                        <li>
                            <Link to="/adminlogin">
                                <span aria-hidden='true'>02</span>Admin Login
                            </Link>
                        </li>

                    </ul>
                </nav>

            </header>











        </div >
    )
}

export default NavBar