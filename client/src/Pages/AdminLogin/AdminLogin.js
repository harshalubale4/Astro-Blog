import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";

const AdminLogin = ({ showAlert }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const host = process.env.React_App_Server_Url;
    const [loading, setLoading] = useState(false);
    let color = "#FFFFFF";


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(username, password);

        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        });
        const json = await response.json();
        console.log(json);
        if (json.error) {
            showAlert(json.error, 'warning')
        }
        if (json.success) {
            localStorage.setItem('auth-token', json.authToken);
            navigate('/');
        } else {
            console.log("Not Authenticated");
        }
        setLoading(false);
        setUsername('');
        setPassword('');
    }
    return (
        <>
            <SyncLoader loading={loading} height={10} width={100} />
            <h1 className='text-center'>
                This is a Login Page for Admin
            </h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 w-50 mx-auto">
                        <label htmlFor="username" className="form-label">Admin Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3 w-50 mx-auto">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary d-block mx-auto">Submit</button>
                </form>
            </div >
        </>
    )
}

export default AdminLogin