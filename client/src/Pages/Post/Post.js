import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostImage from '../../Components/PostCard/PostImage';
import SyncLoader from "react-spinners/SyncLoader";
import './Post.css'

const Post = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const host = process.env.React_App_Server_Url;
    const [post, setPost] = useState({});
    const fetchPostData = async (id) => {
        const response = await fetch(`${host}/api/content/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
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
            {/* <div>
                {
                    post.images && post.images.map((img, index) => {
                        return (
                            // <div key={img._id}>
                            //     <img src={img.optimized} className='m-2' style={{ width: "400px" }} />)
                            //     <button className='btn btn-secondary'>Download</button>
                            // </div>
                            <PostImage img={img} key={index} name={index + 1} />
                        )
                    })
                }
                <SyncLoader loading={loading} />
            </div> */}
            {/* {
                localStorage.getItem('auth-token') ?
                    (<button className='btn btn-danger' onClick={deletePost}>Delete this Post</button>)
                    : ""
            } */}


            <div className='post-container mx-auto p-4'>
                <h1 className='postTitle'>
                    {post.title}
                </h1>
                <div className='d-flex flex-row-reverse mt-2'>
                    <span className='ms-auto date'>
                        {post.contentDate}
                    </span>
                </div>
                <h6 className='mt-2 aboutPara'>
                    {post.about}
                </h6>

                <div className='d-flex flex-row justify-content-around align-items-center flex-wrap'>
                    {
                        post.images && post.images.map((img, index) => {
                            return (
                                <PostImage img={img} key={index} name={index + 1} />
                            )
                        })
                    }
                    <SyncLoader loading={loading} />
                </div>
                <h4 className='text-muted mt-4 quote'>
                    {post.quote}
                </h4>
            </div>
        </>
    )
}

export default Post