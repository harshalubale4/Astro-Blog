import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";
import './AdminLogin.css'

const AdminLogin = ({ showAlert }) => {
    const navigate = useNavigate()


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const host = `${process.env.React_App_Server_Url}`;
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

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

    useEffect(() => {
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function () {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')

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

    return (
        <>
            <SyncLoader loading={loading} height={10} width={100} />
            <div className='loginContainer p-3 px-md-5'>
                <h1 className='text-center mb-4'>
                    ADMIN LOGIN
                </h1>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="mb-3 mx-auto">
                        <label htmlFor="username" className="form-label">Admin Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3 mx-auto">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" id="loginButton" className="btn d-block mx-auto">
                        <SyncLoader color='#ffffff' loading={loading} size={8} /> Login</button>
                </form>
            </div >
        </>
    )
}

export default AdminLogin