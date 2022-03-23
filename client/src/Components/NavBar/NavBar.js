import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./NavBar.css"


const NavBar = () => {
    const navigate = useNavigate();

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

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }



    return (
        <>
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

                        {
                            !localStorage.getItem('auth-token')
                                ?
                                (
                                    <li>
                                        <Link to="/adminlogin">
                                            <span aria-hidden='true'>03</span>Admin Login
                                        </Link>
                                    </li>
                                )
                                :
                                (
                                    <>
                                        <li>
                                            <Link to="/contentform">
                                                <span aria-hidden='true'>04</span>Content Form
                                            </Link>
                                        </li>
                                        <li>
                                            <a className='' onClick={logout}>
                                                <span aria-hidden='true'>05</span>Logout
                                            </a>
                                        </li>
                                    </>

                                )
                        }
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default NavBar