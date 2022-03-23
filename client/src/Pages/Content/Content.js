import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import PuffLoader from "react-spinners/PuffLoader";

const Content = () => {
    const host = process.env.React_App_Server_Url;
    const [fetchedContent, setFetchedContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState(10);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const fetchContent = async () => {
        const response = await fetch(`${host}/api/content?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        setNumOfPages(json.numberOfPages);
        console.log(json);
        setFetchedContent(json.allContent);
    }
    useEffect(() => {
        setLoading(true);
        fetchContent();
        setLoading(false);
    }, [page]);

    return (

        <>
            {
                loading ? (<PuffLoader size={60} margin={2} speedMultiplier={1} loading={loading} />) :
                    <div>
                        <div className='d-flex flex-row justify-content-between flex-wrap container'>
                            {fetchedContent.map((elem) => {
                                return (
                                    <div className=''>
                                        <Card title={elem.title} quote={elem.quote} about={elem.about} id={elem._id} />
                                    </div>
                                )
                            })}

                        </div>
                        <CustomPagination numberOfPages={numOfPages} setPage={setPage} />

                    </div>
            }
        </>
    )
}

export default Content