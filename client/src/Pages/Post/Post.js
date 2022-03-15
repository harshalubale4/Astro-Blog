import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
    const { id } = useParams();
    const host = 'http://localhost:5000';
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

    return (
        <>
            <h1 className='display-2'>
                {post.title}
            </h1>
            <h4 className='display-5 text-muted'>
                {post.quote}
            </h4>
            <h6>
                {post.about}
            </h6>
        </>
    )
}

export default Post