import React from 'react';
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


const App = () => {
    return (
        <>
            <Router>
                <NavBar />
                <Alert message={"Hello World"} />
                <div className="App">
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/about" element={<About />} />
                        <Route exact path="/adminlogin" element={<AdminLogin />} />
                        <Route exact path="/contentform" element={<ContentForm />} />
                        <Route exact path="/content" element={<Content />} />
                        <Route exact path="/content/:id" element={<Post />} />
                        <Route exact path="*" element={<Error />} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </>
    )
}

export default App