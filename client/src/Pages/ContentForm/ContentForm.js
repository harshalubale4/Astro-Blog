import React, { useContext, useEffect, useState, version } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminContext from '../../Context/admin/AdminContext';

const ContentForm = () => {
    const navigate = useNavigate();
    // const { isLoggedInState, isLoggedIn } = useContext(AdminContext);
    // useEffect(() => {
    //     isLoggedIn()
    //     if (!localStorage.getItem('auth-token')) {
    //         return navigate('/');
    //     }
    //     if (!isLoggedInState) {
    //         return navigate('/');
    //     };
    // }, [])
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

    // const [images, setImages] = useState([]);
    // const [imageUrls, setImageUrls] = useState([]);
    // useEffect(() => {
    //     if (images.length < 1) return;
    //     const newImageUrls = [];
    //     images.forEach((image) => {
    //         newImageUrls.push(URL.createObjectURL(image));
    //         console.log(URL.createObjectURL(image));
    //     });
    //     setImageUrls(newImageUrls);
    // }, [images]);
    // function onImageChange(e) {
    //     setImages([...e.target.files]);
    // }






    const [imageUrls, setImageUrls] = useState([]);
    const [images, setImages] = useState([]);
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










    const [content, setContent] = useState({ title: '', quote: '', about: '' });

    const host = process.env.React_App_Server_Url;
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setContent({ ...content, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const data = new FormData();
        for (var x = 0; x < images.length; x++) {
            data.append('image', images[x])
        }
        data.append('title', content.title);
        data.append('about', content.about);
        data.append('quote', content.quote);


        // const response = await fetch(`${host}/api/content`, {
        //     mode: 'no-cors',
        //     method: "POST",
        //     body: data
        //     // body: JSON.stringify({ title: content.title, quote: content.quote, about: content.about, data: data })

        // });
        const res = await axios.post(`${host}/api/content`, data, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.stringify(localStorage.getItem('auth-token'))
            }
        })
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

                    <button type="submit" className="btn btn-primary d-block mx-auto" onClick={handleSubmit}>Submit</button>
                </form>
                {imageUrls.map(imageSrc => <img src={imageSrc} className="w-60 m-2" style={{ height: "200px" }} />)}

            </div>
        </>
    )
}

export default ContentForm;