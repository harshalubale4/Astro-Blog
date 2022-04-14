import { useState } from "react";


import AdminContext from "./AdminContext";
const AdminState = (props) => {

    const [isLoggedInState, setIsLoggedInState] = useState(false);
    const isLoggedIn = async () => {
        const host = process.env.React_App_Server_Url;
        if (!localStorage.getItem('auth-token')) {

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
        if (json.isLoggedIn) {
            setIsLoggedInState(true);
        } else {
            setIsLoggedInState(false);
        }
    }

    return (
        <AdminContext.Provider value={{ isLoggedIn, isLoggedInState, setIsLoggedInState }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminState;