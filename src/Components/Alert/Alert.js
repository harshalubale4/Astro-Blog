import React, { useEffect, useState } from 'react';
import './Alert.css'

const Alert = ({ alert }) => {
    return (
        <>
            {
                alert && <div className={`alert-${alert.type} alert-container mx-auto mb-4`}>
                    <h5 className='alert-message text-center my-2'>{alert.message}</h5>
                </div>
            }

        </>
    )
}

export default Alert