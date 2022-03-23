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
                <div className='nav-brand-container'>
                    <Link to="/" className='nav-brand'>
                        Moony Nicole</Link>
                </div>
                <button className='mobile-nav-toggle' aria-controls='primary-navigation' aria-expanded='false'><span className='sr-only'> </span></button>

                <nav>
                    <ul id="primary-navigation" data-visible="false" className="primary-navigation underline-indicators flex my-4">
                        <li>
                            <Link to="/content" className='nav-links'>
                                Content
                            </Link>
                        </li>

                        <li >
                            <Link to="/about" className='nav-links'>
                                About
                            </Link>
                        </li>

                        {
                            !localStorage.getItem('auth-token')
                                ?
                                (
                                    <li>
                                        <Link to="/adminlogin" className='nav-links'>
                                            Admin Login
                                        </Link>
                                    </li>
                                )
                                :
                                (
                                    <>
                                        <li>
                                            <Link to="/contentform" className='nav-links'>
                                                Content Form
                                            </Link>
                                        </li>
                                        <li>
                                            <a className='nav-links' onClick={logout}>
                                                Logout
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