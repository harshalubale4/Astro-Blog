import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const AdminLogin = (props) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const host = process.env.React_App_Server_Url;


    const handleSubmit = async (e) => {
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
        if (json.success) {
            localStorage.setItem('auth-token', json.authToken);
            navigate('/');
        } else {
            props.showAlert("Invalid Credentials", "danger");
            console.log("Not Authenticated");
        }
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