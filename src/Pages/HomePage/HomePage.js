import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'

const HomePage = () => {
    const [titleOfImageOftheDay, setTitleOfImageOftheDay] = useState("");
    const [imageUrlOfTheDay, setImageUrlOfTheDay] = useState("");
    const [descOfTheImageOfTheDay, setDescOfTheImageOfTheDay] = useState("")
    const getNasaImageOfTheDay = async () => {
        const respo = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.React_App_Nasa_Api_Key}`, {
            method: "GET",
        });
        const json = await respo.json();
        console.log(json);
        setImageUrlOfTheDay(json.url);
        setTitleOfImageOftheDay(json.title);
        setDescOfTheImageOfTheDay(json.explanation);
    }
    useEffect(() => {
        getNasaImageOfTheDay();
    }, [])


    return (
        <>
            <Link to='/content' className='circle d-flex flex-column justify-content-center align-items-center mx-auto my-5'>
                <div className='explore'>
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
                <div className='imageDesc'>
                    {descOfTheImageOfTheDay}
                </div>
            </div>
        </>
    )
}

export default HomePage;