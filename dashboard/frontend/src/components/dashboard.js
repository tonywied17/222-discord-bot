import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

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

  const botAdminGuildIds = userInfo?.botAdminGuilds?.map(guild => guild.guildId) || [];

  const filterAdminGuilds = () => {
    return userInfo?.guilds.filter(guild => 
      guild.permissions === 2147483647 && !botAdminGuildIds.includes(guild.guildId)
    ) || [];
  };

  const filterBotAdminGuilds = () => userInfo?.botAdminGuilds || [];

  return (
    <div className="p-4">
      {userInfo ? (
        <>
          <Card className="mb-8 bg-[#00000044] text-white">
            <CardBody className="flex items-center space-x-4">
              <img src={userInfo.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
              <div>
                <Typography variant="h5" color="blueGray">
                  {userInfo.username}#{userInfo.discriminator}
                </Typography>
                <Typography variant="paragraph" color="blueGray">
                  {userInfo.email}
                </Typography>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className='bg-[#00000044] text-white'>
              <CardBody>
                <Typography variant="h6" color="blueGray">
                  Admin Guilds with 222bot
                </Typography>
                {filterBotAdminGuilds().map((guild, index) => (
                  <div key={index} className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <img src={guild.iconUrl} alt="Guild Icon" className="w-10 h-10 rounded-full mr-4" />
                      <Typography color="blueGray">
                        {guild.guildName}
                      </Typography>
                    </div>
                    <Button color="lightBlue" size="sm" className="ml-auto">Manage</Button>
                  </div>
                ))}
              </CardBody>
            </Card>

            <Card className='bg-[#00000044] text-white'>
              <CardBody>
                <Typography variant="h6" color="blueGray">
                  Your Admin Guilds
                </Typography>
                {filterAdminGuilds().map((guild, index) => (
                  <div key={index} className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <img src={guild.iconUrl} alt="Guild Icon" className="w-10 h-10 rounded-full mr-4" />
                      <Typography color="blueGray">
                        {guild.guildName}
                      </Typography>
                    </div>
                    <Button color="green" size="sm" className="ml-auto">Invite</Button>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </>
      ) : (
        <Typography color="blueGray" className="text-center">
          Please log in.
        </Typography>
      )}
    </div>
  );
}

export default Dashboard;
