import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const authSuccess = query.get('auth');

    if (authSuccess) {
      axios.get('http://localhost:3001/user/info', { withCredentials: true })
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [location]);

  const filterAdminGuilds = () => {
    if (userInfo && userInfo.guilds) {
      return userInfo.guilds.filter(guild => {
        return guild.permissions === 2147483647;
      });
    }
    return [];
  };

  return (
    <div className="dashboard">
      {userInfo ? (
        <>
          <div className="profile-info">
            <img src={userInfo.avatar} alt={`${userInfo.username}'s Avatar`} style={{ width: 100, borderRadius: '50%' }} />
            <h2>Welcome {userInfo.username}#{userInfo.discriminator}!</h2>
          </div>
          <div>
            <h3>Your Admin Guilds:</h3>
            <ul className="guilds-list">
              {filterAdminGuilds().map(guild => (
                <li key={guild.id} className="guild">
                  {guild.iconUrl ? (
                    <img src={guild.iconUrl} alt={`${guild.guildName} Icon`} style={{ width: 50, borderRadius: '50%' }} />
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
