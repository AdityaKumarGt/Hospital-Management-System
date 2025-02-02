import React, { useContext, useEffect } from "react";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Appointment from "./pages/Appointment"
import AboutUs from "./pages/AboutUs"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Context from "./main.jsx";
import axios from "axios";
import Footer from "./components/Footer";

const App = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

useEffect(() => {

  const fetchUser = async () => {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL+"api/v1/user/patient/me";
      console.log("apiUrls::"+apiUrl);
      const response = await axios.get(apiUrl,
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
      console.log(response.data.user)
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
      console.log(error);
    }
  };
  fetchUser();
}, [isAuthenticated]);

  return (
   <>
   <Router>
    <Navbar/>
    <Routes>
      <Route path = '/' element ={<Home/>}/>
      <Route path = '/appointment' element ={<Appointment/>}/>
      <Route path = '/aboutus' element ={<AboutUs/>}/>
      <Route path = '/register' element ={<Register/>}/>
      <Route path = '/login' element ={<Login/>}/>
    </Routes>
    <Footer />
    <ToastContainer position="top-center"/>
   </Router>

   </>
  )
}

export default App;
