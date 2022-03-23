import React, { useContext, useEffect, useState, version } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SyncLoader from 'react-spinners/SyncLoader';

const ContentForm = ({ showAlert }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [images, setImages] = useState([]);
    const [content, setContent] = useState({ title: '', quote: '', about: '' });
    const host = process.env.React_App_Server_Url;

    const isLoggedIn = async () => {
        const host = process.env.React_App_Server_Url;
        if (!localStorage.getItem('auth-token')) {
            navigate('/');
            return;
        }
        const response = await fetch(`${host}/api/auth/isloggedin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.stringify(localStorage.getItem('auth-token'))
            },
        });
        const json = await response.json();
        console.log(json);
        if (!json.isLoggedIn) {
            navigate('/');
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => {
            newImageUrls.push(URL.createObjectURL(image));
        });
        setImageUrls(newImageUrls);
    }, [images]);

    const handleFileChange = (event) => {
        setImages([...event.target.files]);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setContent({ ...content, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        for (var x = 0; x < images.length; x++) {
            data.append('image', images[x])
        }
        data.append('title', content.title);
        data.append('about', content.about);
        data.append('quote', content.quote);
        let res;
        try {
            res = await axios.post(`${host}/api/content`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": JSON.stringify(localStorage.getItem('auth-token'))
                }
            })
        } catch (e) {
            showAlert(e.message, 'warning');
            setLoading(false);
            navigate('/');
            setImages('');
            setContent({ title: '', about: '', quote: '' });
        }
        setLoading(false);
        navigate('/');
        setImages('');
        setContent({ title: '', about: '', quote: '' });
    }

    return (
        <>
            <h1 className='text-center'>
                This is the Content Form
            </h1>
            <div>
                <form>
                    <div className="mb-3 w-50 mx-auto">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="title" value={content.title} onChange={handleChange} name='title' />
                    </div>
                    <div className="mb-3 w-50 mx-auto">
                        <label htmlFor="quote" className="form-label">Quote</label>
                        <input type="text" className="form-control" id="quote" aria-describedby="quote" value={content.quote} onChange={handleChange} name='quote' />
                    </div>
                    <div className="mb-3 w-50 mx-auto">
                        <label htmlFor="about" className="form-label">About</label>
                        <textarea type="text" className="form-control" id="about" aria-describedby="about" value={content.about} onChange={handleChange} name='about' />
                    </div>
                    <div className="mb-3 w-50 mx-auto">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" className="form-control" id="image" multiple accept='image/*' name='image' aria-describedby="image" onChange={(e) => { handleFileChange(e) }} />
                    </div>
                    <SyncLoader loading={loading} />
                    <button type="submit" className="btn btn-primary d-block mx-auto" onClick={handleSubmit}>Submit</button>
                </form>
                {imageUrls.map(imageSrc => <img src={imageSrc} className="w-60 m-2" style={{ height: "200px" }} />)}

            </div>
        </>
    )
}

export default ContentForm;