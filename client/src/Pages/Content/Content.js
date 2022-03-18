import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card';

const Content = () => {
    const host = process.env.React_App_Server_Url;
    const [fetchedContent, setFetchedContent] = useState([]);
    const fetchContent = async () => {
        const response = await fetch(`${host}/api/content`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        json.reverse();
        console.log(json);
        setFetchedContent(json);
    }
    useEffect(() => {
        fetchContent();
    }, []);

    return (
        <>
            <div className='d-flex flex-row justify-content-between flex-wrap container'>
                {fetchedContent.map((elem) => {
                    return (
                        <div className=''>
                            <Card title={elem.title} quote={elem.quote} about={elem.about} id={elem._id} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Content