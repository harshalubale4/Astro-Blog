import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ title, quote, about, id }) => {
    return (
        <>
            {/* <div className='w-10'>
                <h1 className='display-3'>
                    {title}
                </h1>
                <h3 className='text-muted'>
                    {quote}
                </h3>
                <h6>
                    {about}
                </h6>
            </div> */}

            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{about}</p>
                    <Link to={`/content/${id}`} className="btn btn-primary">See Post</Link>
                </div>
            </div>

        </>
    )
}

export default Card