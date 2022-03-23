import React, { useState } from 'react'

const PostCard = ({ img, name }) => {

    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);
    const url = `${img.url}`;
    const filename = `Moony Nicole-` + `${name}`

    const download = (url, name) => {
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
            })
            .catch(() => setError(true));
    };
    return (
        <>
            <div>
                <img src={img.optimized} className='m-2' style={{ width: "400px" }} />
                {/* <button className='btn btn-secondary'>Download</button> */}

                <button
                    className='btn btn-success'
                    disabled={fetching}
                    onClick={() => download(url, filename)}
                    aria-label="download gif"
                >
                    DOWNLOAD
                </button>
            </div>
        </>
    )
}

export default PostCard