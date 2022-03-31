import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <div id='home-container' className='d-flex flex-column mx-auto text-center'>
                <div className='p-3 para mx-auto'>
                    Your once place to get amazing Astro Content
                </div>
                <Link to='/content' className='circle d-flex flex-column justify-content-center align-items-center mx-auto mt-4'>
                    <div className='explore'>
                        Explore
                    </div>
                </Link>
            </div>
        </>
    )
}

export default HomePage;