import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.css"
import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import LogoutIcon from '@mui/icons-material/Logout';

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
                        Website Name</Link>
                </div>
                <button className='mobile-nav-toggle' aria-controls='primary-navigation' aria-expanded='false'><span className='sr-only'> </span></button>

                <nav>
                    <ul id="primary-navigation" data-visible="false" className="primary-navigation underline-indicators flex my-2">
                        <li>
                            <Link to="/content" className='nav-links py-2'>
                                Gallery <CameraAltOutlined />
                            </Link>
                        </li>

                        <li>
                            <Link to="/about" className='nav-links py-2'>
                                About <PersonIcon />
                            </Link>
                        </li>

                        {
                            !localStorage.getItem('auth-token')
                                ?
                                (
                                    <li>
                                        <Link to="/adminlogin" className='nav-links py-2'>
                                            Admin Login <AdminPanelSettingsIcon />
                                        </Link>
                                    </li>
                                )
                                :
                                (
                                    <>
                                        <li>
                                            <Link to="/contentform" className='nav-links py-2'>
                                                Content Form <FormatAlignCenterIcon />
                                            </Link>
                                        </li>
                                        <li>
                                            <a className='nav-links py-2' onClick={logout}>
                                                Logout <LogoutIcon />
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