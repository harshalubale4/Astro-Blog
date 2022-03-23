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
import './App.css'


const App = () => {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }
    return (
        <>
            <AdminState >
                <div className="App d-flex flex-column">
                    <Router>
                        <div className='content-wrap d-flex flex-column '>
                            <NavBar />
                            <Alert alert={alert} />
                            <Routes>
                                <Route exact path="/" element={<HomePage />} />
                                <Route exact path="/about" element={<About />} />
                                <Route exact path="/adminlogin" element={<AdminLogin showAlert={showAlert} />} />
                                <Route exact path="/contentform" element={<ContentForm showAlert={showAlert} />} />
                                <Route exact path="/content" element={<Content showAlert={showAlert} />} />
                                <Route exact path="/content/:id" element={<Post />} />
                                <Route exact path="*" element={<Error />} />
                            </Routes>
                        </div>
                        <Footer />
                    </Router>
                </div>
            </AdminState>
        </>
    )
}

export default App