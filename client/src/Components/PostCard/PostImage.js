import React, { useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import SyncLoader from 'react-spinners/SyncLoader';
const PostImage = ({ img, name }) => {

    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);
    const url = `${img.url}`;
    const filename = `Website Name-` + `${name}`
    const [loading, setLoading] = useState(true);
    const [downLoading, setDownLoading] = useState(false);
    const download = (url, name) => {
        setDownLoading(true);
        if (!url) {
            throw new Error("Resource URL not provided! You need to provide one");
        }
        console.log(img)
        setFetching(true);
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                setFetching(false);
                const blobURL = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobURL;
                a.style = "display: none";

                if (name && name.length) a.download = name;
                document.body.appendChild(a);
                a.click();
                setDownLoading(false);
            })
            .catch(() => setError(true));
    };
    return (
        <>
            <div className='text-center'>
                <PuffLoader loading={loading} />
            </div>
            <img onLoad={() => setLoading(false)} src={img.optimized} className='m-2' style={{ width: "400px" }} />
            {/* <button className='btn btn-secondary'>Download</button> */}
            <SyncLoader loading={downLoading} />
            <button
                className='btn btn-success'
                disabled={fetching}
                onClick={() => download(url, filename)}
                aria-label="download gif"
            >
                DOWNLOAD
            </button>
        </>
    )
}

export default PostImage