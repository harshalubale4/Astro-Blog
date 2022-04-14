import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import PuffLoader from "react-spinners/PuffLoader";
import './Content.css';

const Content = ({ showAlert }) => {
    const host = `${process.env.React_App_Server_Url}`;
    const [fetchedContent, setFetchedContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState(10);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const fetchContent = async () => {
        setLoading(true);
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
        setLoading(false);
    }
    useEffect(() => {
        try {
            fetchContent();
        } catch (e) {
            showAlert(e.message, 'warning');
        }
    }, [page]);

    return (

        <>
            {
                loading ? (
                    <div className='d-flex flex-row justify-content-center align-items-center' style={{
                        marginTop: "100px"
                    }}>
                        <PuffLoader color='#ffffff' size={150} speedMultiplier={2} loading={loading} />
                    </div>
                ) :
                    <div className='d-flex flex-row justify-content-around align-items-center flex-wrap mx-auto content-container p-2'>
                        {fetchedContent.map((elem) => {
                            return (
                                <Card
                                    key={elem._id}
                                    title={elem.title}
                                    quote={elem.quote}
                                    about={elem.about}
                                    id={elem._id}
                                    imagesSrc={elem.images}
                                />
                            )
                        })}
                    </div>
            }
            <div className='d-flex flex-row justify-content-center mt-auto' id='paginationContainer'>
                <CustomPagination numberOfPages={numOfPages} setPage={setPage} />
            </div>
        </>
    )
}

export default Content;