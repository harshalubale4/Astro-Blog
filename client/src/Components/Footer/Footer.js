import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <>
            <div className='footerContainer mt-4'>
                &copy; Astro Blog 2022
            </div>
        </>
    )
}

export default Footer