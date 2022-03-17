import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import './App.css';
import About from './Pages/About/About';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import ContentForm from './Pages/ContentForm/ContentForm';
import Content from './Pages/Content/Content';
import Post from './Pages/Post/Post';
import Error from './Pages/Error/Error';
import Alert from './Components/Alert/Alert';
import AdminState from './Context/admin/AdminState';


const App = () => {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }
    return (
        <>
            <AdminState >

                <Router>
                    <NavBar />
                    <Alert message={"Hello World"} />
                    <div className="App">
                        <Routes>
                            <Route exact path="/" element={<HomePage />} />
                            <Route exact path="/about" element={<About />} />
                            <Route exact path="/adminlogin" element={<AdminLogin showAlert={showAlert} />} />
                            <Route exact path="/contentform" element={<ContentForm />} />
                            <Route exact path="/content" element={<Content />} />
                            <Route exact path="/content/:id" element={<Post />} />
                            <Route exact path="*" element={<Error />} />
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </AdminState>
        </>
    )
}

export default App