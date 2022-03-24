import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <div id='home-container' className='d-flex flex-row justify-content-around align-content-center mx-auto'>
                <div className='p-3 para'>
                    Your One Place to get to know your astro-photographer and their amazing Astro-Content
                </div>
                <div>
                    <Link to='/content' className='circle d-flex flex-column justify-content-center align-items-center'>
                        <div className='explore'>
                            Explore
                        </div>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default HomePage;