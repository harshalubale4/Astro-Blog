import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        setIsLoggedInState(false);
        navigate('/')
    }
    const [isLoggedInState, setIsLoggedInState] = useState(false);
    useEffect(() => {
        isLoggedIn();
    }, [])

    const isLoggedIn = async () => {
        const host = process.env.React_App_Server_Url;
        const response = await fetch(`${host}/api/auth/isloggedin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.stringify(localStorage.getItem('auth-token'))
            },
        });
        const json = await response.json();
        console.log(json);
        if (json.isLoggedIn) {
            setIsLoggedInState(true);
        } else {
            setIsLoggedInState(false);
        }
    }
    return (
        <>
            <div className="footerContainer mt-auto">
                <h1>
                    This is Footer
                </h1>

                {
                    !localStorage.getItem('auth-token') ?
                        (
                            <button onClick={() => navigate('/adminlogin')} className='btn btn-primary mb-2'>Admin Login</button>
                        ) :
                        (
                            <div>
                                <button className='btn btn-danger mb-2 mx-2' onClick={logout}>Logout</button>
                                <button className="btn btn-primary mb-2 mx-1" onClick={() => navigate('/contentform')}>Content Form</button>

                            </div>
                        )
                }

            </div>

        </>
    )
}

export default Footer