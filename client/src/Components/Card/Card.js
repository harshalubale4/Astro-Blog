import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = ({ title, quote, about, id, imagesSrc }) => {
    return (
        <>
            <div
                className='base-container d-flex flex-column justify-content-end mx-2 my-3 p-2 p-lg-4 p-md-3 '
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7)), url(${imagesSrc[0].optimized})`
                }}
            >
                <div className='title'>
                    {title}
                </div>
                <hr className="hrStyle" size="4" />
                <div>
                    <Link to={`/content/${id}`} className='btn' id='myButton'>See Post</Link>
                </div>
            </div >

        </>
    )
}

export default Card