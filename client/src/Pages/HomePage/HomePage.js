import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'black',
    border: '2px solid #000',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
};

const HomePage = () => {
    const [titleOfImageOftheDay, setTitleOfImageOftheDay] = useState("");
    const [imageUrlOfTheDay, setImageUrlOfTheDay] = useState("");
    const [descOfTheImageOfTheDay, setDescOfTheImageOfTheDay] = useState("");
    const [copyRight, setCopyRight] = useState("");

    const getNasaImageOfTheDay = async () => {
        const respo = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.React_App_Nasa_Api_Key}`, {
            method: "GET",
        });
        const json = await respo.json();
        console.log(json);
        setImageUrlOfTheDay(json.hdurl);
        setTitleOfImageOftheDay(json.title);
        setDescOfTheImageOfTheDay(json.explanation);
        setCopyRight(json.copyright);
    }

    useEffect(() => {
        getNasaImageOfTheDay();
    }, [])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Link to='/content' className='mx-auto my-5 text-decoration-none'>
                <div id='explore' >
                    Explore
                </div>
            </Link>

            <div className='container'>
                <div
                    className='nasaImageContainer d-flex flex-column mx-2 mt-3 p-2 p-lg-4 p-md-3 mx-auto'
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${imageUrlOfTheDay})`
                    }}
                >
                    <div className='astroTitle text-center'>
                        Astronomy Picture Of the Day(APOD)
                    </div>
                    <div className='title mt-auto text-center'>
                        {titleOfImageOftheDay}
                    </div>
                </div >

                <button onClick={handleOpen} className="btn mx-auto d-block my-3" id="readMoreButton">Read More</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={{ maxHeight: "65vh", overflow: 'auto' }}>
                        <Typography id="modal-modal-title" variant="h4" component="h2" className='text-center'>
                            {titleOfImageOftheDay}
                        </Typography>
                        <Typography
                            className='text-center'
                            id="modal-modal-description" sx={{ mt: 2 }}>
                            {descOfTheImageOfTheDay}
                        </Typography>
                        <div className='text-muted my-3 text-center '>
                            &#169; {copyRight}
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default HomePage;