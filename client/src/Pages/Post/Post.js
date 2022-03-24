import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostImage from '../../Components/PostCard/PostImage';
import SyncLoader from "react-spinners/SyncLoader";
import './Post.css'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TocIcon from '@mui/icons-material/Toc';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const Post = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const host = `${process.env.React_App_Server_Url}`;
    const [post, setPost] = useState({});
    const fetchPostData = async (id) => {
        const response = await fetch(`${host}/api/content/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        if (json.error) {
            navigate('/error');
            return;
        }
        console.log(json);
        setPost(json);
    }
    useEffect(() => {
        fetchPostData(id);
    }, [])

    const deletePost = async () => {
        setLoading(true);
        const response = await fetch(`${host}/api/content/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.stringify(localStorage.getItem('auth-token'))
            }
        });
        const delResponse = await response.json();
        console.log(delResponse);
        setPost('');
        setLoading(false);
        navigate('/content')
    }

    return (
        <>
            <div className='post-container mx-auto p-4'>
                <h1 className='postTitle'>
                    {post.title}
                </h1>
                <hr className="hrStyle" size="6" />
                <div className='d-flex flex-row-reverse mt-2'>
                    <span className='date pb-2'>
                        <CalendarTodayIcon /> {post.contentDate}
                    </span>
                </div>
                <h6 className='mt-4 aboutPara'>
                    <TocIcon /> {post.about}
                </h6>
                <div className='d-flex flex-row justify-content-around align-items-center flex-wrap'>
                    {
                        post.images && post.images.map((img, index) => {
                            return (
                                <PostImage img={img} key={index} name={index + 1} />
                            )
                        })
                    }
                </div>
                <h4 className='mt-4 quote p-2'>
                    <FormatQuoteIcon /> {post.quote} <FormatQuoteIcon />
                </h4>
                {
                    localStorage.getItem('auth-token') ?
                        (
                            <div className='text-center mt-4'>
                                <button className='btn btn-danger' onClick={deletePost}>
                                    <SyncLoader size={10} color='#ffffff' loading={loading} /> DELETE THIS POST</button>
                            </div>
                        )
                        :
                        ""
                }
            </div>

        </>
    )
}

export default Post