import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Main from './components/main';
import Dashboard from './components/dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/checkAuth`, { withCredentials: true })
      .then(response => {
        setIsLoggedIn(response.data.isAuthenticated);
      })
      .catch(error => console.error("Authentication check failed:", error));
  }, []);

  const handleLogout = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        window.location.href = '/';
      })
      .catch(error => console.error("Logout failed:", error));
  };


  return (
    <Router>
      <div className='w-full h-full main'>
        <div className='md:container md:mx-auto'>
          <div className="min-h-screen main-inner text-white flex flex-col rounded-3xl">
            <header className="flex justify-between items-center p-4">
              <h1 className="text-2xl md:text-4xl select-none drop-shadow-md my-4">
                <span className="font-bold text-indigo-200">222</span>bot.
              </h1>
              <nav>
                <Link to="/" className="text-gray-300 hover:text-white mx-2">Home</Link>
                <Link to="/features" className="text-gray-300 hover:text-white mx-2">Features</Link>
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard" className="text-gray-300 hover:text-white mx-2">Dashboard</Link>
                    <button onClick={handleLogout} className="text-gray-300 hover:text-white mx-2 font-[900]">Logout</button>
                  </>
                ) : (
                  <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/discord`} className="text-gray-300 hover:text-white mx-2 font-[900]">Login</a>
                )}
              </nav>
            </header>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
