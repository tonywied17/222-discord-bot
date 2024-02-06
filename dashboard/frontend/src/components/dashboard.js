import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/checkAuth`, { withCredentials: true })
      .then(response => {
        if (response.data.isAuthenticated) {
          fetchUserInfo();
        } else {
          navigate('/');
        }
      })
      .catch(error => {
        console.error("Authentication check failed:", error);
        navigate('/');
      });
  }, [navigate]);

  const fetchUserInfo = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/info`, { withCredentials: true })
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error("Error fetching user info:", error);
      });
  };

  const filterAdminGuilds = () => {
    if (userInfo && userInfo.guilds) {
      return userInfo.guilds.filter(guild => guild.permissions === 2147483647);
    }
    return [];
  };

  return (
    <div className="dashboard">
      {userInfo ? (
        <>
          <div className="profile-info">
            <img src={userInfo.avatar} alt={`${userInfo.username}'s Avatar`} style={{ width: 100, borderRadius: "50%" }} />
            <h2>Welcome {userInfo.username}#{userInfo.discriminator}!</h2>
          </div>
          <div>
            <h3>Your Admin Guilds:</h3>
            <ul className="guilds-list">
              {filterAdminGuilds().map(guild => (
                <li key={guild.id} className="guild">
                  {guild.iconUrl ? (
                    <img src={guild.iconUrl} alt={`${guild.guildName} Icon`} style={{ width: 50, borderRadius: "50%" }} />
                  ) : (
                    <div>No Icon</div>
                  )}
                  {guild.guildName}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
}

export default Dashboard;
