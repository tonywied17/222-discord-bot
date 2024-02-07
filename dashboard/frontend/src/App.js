import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Main from './components/main';
import Dashboard from './components/dashboard';
import GuildManage from './components/guildManage';
import  { FiLogIn, FiLogOut, FiArrowRight } from "react-icons/fi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/checkAuth`, { withCredentials: true })
      .then(response => {
        setIsLoggedIn(response.data.isAuthenticated);
        if (response.data.isAuthenticated && !sessionStorage.getItem('postLoginRedirectDone')) {
          sessionStorage.setItem('postLoginRedirectDone', 'true'); 
          navigate('/dashboard');
        }
      })
      .catch(error => console.error("Authentication check failed:", error));
  }, [navigate]);

  const handleLogout = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('postLoginRedirectDone');
        navigate('/');
      })
      .catch(error => console.error("Logout failed:", error));
  };

  return (
      <div className='w-full h-full main'>
        <div className='md:container md:mx-auto'>
          <div className="min-h-screen main-inner text-white flex flex-col rounded-3xl">
            <header className="flex justify-between items-center p-4">
              <h1 className="text-2xl md:text-4xl select-none drop-shadow-md my-4 animate-[bounce_2.22s_ease-in-out_infinite]">
                <span className="font-bold text-indigo-200">222</span>bot.
              </h1>
              <nav>
                <Link to="/" className="text-gray-300 hover:text-gray-400 active:text-gray-700 mx-2 transition-all duration-300">Home</Link>
                <Link to="/features" className="text-gray-300 hover:text-gray-400 active:text-gray-700 mx-2 transition-all duration-300">Features</Link>
                <Link to="/commands" className="text-gray-300 hover:text-gray-400 active:text-gray-700 mx-2 transition-all duration-300">Commands</Link>
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard" className="text-gray-300 hover:text-gray-400 active:text-gray-700 mx-2 transition-all duration-300">Dashboard</Link>
                    <button onClick={handleLogout} className="text-red-300 hover:text-red-400 active:text-red-700 mx-2 font-[900] transition-all duration-300">Logout<FiLogOut className='inline-block mb-1 ml-1' /></button>
                  </>
                ) : (
                  <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/discord`} className="text-indigo-300 hover:text-indigo-400 active:text-indigo-700 mx-2 font-[900] transition-all duration-300">Login<FiLogIn className='inline-block mb-1 ml-1' /></a>
                )}
              </nav>
            </header>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manage/:guildId" element={<GuildManage />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
