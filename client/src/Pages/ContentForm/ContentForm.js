import React, { useState } from 'react';
const axios = require('axios');

const ContentForm = () => {
    const [content, setContent] = useState({ title: '', quote: '', about: '' });
    const baseUrl = 'localhost:5000';
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        setContent({ ...content, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${baseUrl}/content`


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
                    <button type="submit" className="btn btn-primary d-block mx-auto" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default ContentForm