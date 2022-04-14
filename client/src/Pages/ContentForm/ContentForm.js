import React, { useContext, useEffect, useState, version } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SyncLoader from 'react-spinners/SyncLoader';
import './ContentForm.css'

const ContentForm = ({ showAlert }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [images, setImages] = useState([]);
    const [content, setContent] = useState({ title: '', quote: '', about: '' });
    const host = `${process.env.React_App_Server_Url}`;

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

    useEffect(() => {
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function () {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needsValidation')

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                        }

                        form.classList.add('was-validated')
                    }, false)
                })
        })()
    }, [])


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
            <div className='contentFormConatiner d-flex flex-column container px-5 py-3'>
                <h1 className='text-center'>
                    Content Form
                </h1>
                <form onSubmit={handleSubmit} className='needsValidation' noValidate>
                    <div className="mb-3 w-60 mx-auto">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="title" value={content.title} onChange={handleChange} name='title' required />
                    </div>
                    <div className="mb-3 w-60 mx-auto">
                        <label htmlFor="about" className="form-label">About</label>
                        <textarea type="text" className="form-control" id="about" aria-describedby="about" value={content.about} onChange={handleChange} name='about' required />
                    </div>
                    <div className="mb-3 w-60 mx-auto">
                        <label htmlFor="quote" className="form-label">Quote</label>
                        <textarea type="text" className="form-control" id="quote" aria-describedby="quote" value={content.quote} onChange={handleChange} name='quote' required />
                    </div>
                    <div className="mb-3 w-60 mx-auto">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" className="form-control" id="image" multiple accept='image/*' name='image' aria-describedby="image" onChange={(e) => { handleFileChange(e) }} required />
                    </div>
                    {imageUrls.map(imageSrc => <img src={imageSrc} className="w-60 m-2" style={{ height: "200px" }} />)}
                    <button type="submit" id="submitButton" className="btn d-block mx-auto">
                        <SyncLoader size={8} color="#ffffff" loading={loading} /> Upload Content</button>
                </form>
            </div>
        </>
    )
}

export default ContentForm;