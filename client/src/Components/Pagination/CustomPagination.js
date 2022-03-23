import React from 'react'
import Pagination from '@mui/material/Pagination';
const CustomPagination = ({ setPage, numberOfPages }) => {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }
    return (
        <div>
            <Pagination count={numberOfPages} onChange={(e) => handlePageChange(e.target.textContent)} size="large" hidePrevButton hideNextButton />
        </div>
    )
}

export default CustomPagination