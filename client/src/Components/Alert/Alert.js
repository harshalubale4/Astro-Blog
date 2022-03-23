import React, { useEffect, useState } from 'react'

const Alert = ({ alert }) => {
    return (
        <>
            {
                alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    <h5 className='display-6'>{alert.message}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

        </>
    )
}

export default Alert