import React from 'react'
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const CustomPagination = ({ setPage, numberOfPages }) => {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }

    return (
        <div>
            <ThemeProvider theme={darkTheme} >
                <Pagination
                    count={numberOfPages}
                    onChange={(e) => handlePageChange(e.target.textContent)}
                    size="large"
                    hidePrevButton
                    hideNextButton />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination