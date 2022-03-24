import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = ({ title, quote, about, id, imagesSrc }) => {
    const lorem = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, ex magnam! Expedita, ea, aliquam nihil saepe eius odit aspernatur earum corrupti dignissimos perferendis voluptate sapiente accusamus reiciendis sint consectetur. Eaque!`;
    return (
        <>
            {/* <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{about}</p>
                    <Link to={`/content/${id}`} className="btn btn-primary">See Post</Link>
                </div>
            </div> */}

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