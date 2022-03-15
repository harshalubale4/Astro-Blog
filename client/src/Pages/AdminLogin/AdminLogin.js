import React, { useState } from 'react'

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        setUsername('');
        setPassword('');
    }
    return (
        <>
            <h1 className='text-center'>
                This is a Login Page for Admin
            </h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 w-50 mx-auto">
                        <label htmlFor="username" className="form-label">Admin Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3 w-50 mx-auto">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary d-block mx-auto">Submit</button>
                </form>
            </div >
        </>
    )
}

export default AdminLogin