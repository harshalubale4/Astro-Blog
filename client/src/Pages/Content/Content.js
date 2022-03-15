import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card';

const Content = () => {
    const host = 'http://localhost:5000';
    const [fetchedContent, setFetchedContent] = useState([]);
    const fetchContent = async () => {
        const response = await fetch(`${host}/api/content`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        console.log(json);
        setFetchedContent(json);
    }
    useEffect(() => {
        fetchContent();
    }, []);

    return (
        <>
            {fetchedContent.map((elem) => {
                return (
                    <Card title={elem.title} quote={elem.quote} about={elem.about} id={elem._id} />
                )
            })}
        </>
    )
}

export default Content