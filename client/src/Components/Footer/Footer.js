import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="footerContainer mt-auto">
                <h1>
                    This is Footer
                </h1>
                <button onClick={() => navigate('/adminlogin')} className='btn btn-primary mb-2'>Admin Login</button>
            </div>

        </>
    )
}

export default Footer