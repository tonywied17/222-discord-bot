/*
 * File: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\dashboard\frontend\src\components\dashboard.js
 * Project: c:\Users\tonyw\Desktop\git-222-bot\222-discord-bot\dashboard\frontend
 * Created Date: Monday February 5th 2024
 * Author: Tony Wiedman
 * -----
 * Last Modified: Thu February 8th 2024 4:08:16 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2024 MolexWorks / Tone Web Design
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { FiArrowRight } from "react-icons/fi";

/**
 * @name Dashboard
 * This component is used to display the user's dashboard
 * It fetches the user's information and displays it
 * If the user is not authenticated, it redirects to the homepage
 */
function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/checkAuth`, { withCredentials: true });
        if (response.data.isAuthenticated) {
          fetchUserInfo();
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate('/');
      }
    };
    checkAuthentication();
  }, [navigate]);

  /**
   * Fetch the user's information
   * @returns {void}
   */
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/info`, { withCredentials: true });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
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
          <Card className="mb-8 bg-[#00000044] text-white slide-left">
            <CardBody className="flex items-center space-x-4">
              <img src={userInfo.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
              <div>
                <Typography variant="h5">
                  {userInfo.username}#{userInfo.discriminator}
                </Typography>
                <Typography variant="paragraph">
                  {userInfo.email}
                </Typography>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className='bg-[#00000044] text-white scale-center'>
              <CardBody>
                <Typography variant="h6">
                  Admin Guilds with 222bot
                </Typography>
                {filterBotAdminGuilds().map((guild, index) => (
                  <div key={index} className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <img src={guild.iconUrl} alt="Guild Icon" className="w-10 h-10 rounded-full mr-4" />
                      <Typography>
                        {guild.guildName}
                      </Typography>
                    </div>
                      <Button
                        size="sm"
                        className="ml-auto"
                        onClick={() => navigate(`/manage/${guild.guildId}`, {
                          state: { guildName: guild.guildName, iconUrl: guild.iconUrl },
                        })}
                      >
                        Manage <FiArrowRight className='inline-block mb-1' />
                      </Button>
                  </div>
                ))}
              </CardBody>
            </Card>

            <Card className='bg-[#00000044] text-white scale-center'>
              <CardBody>
                <Typography variant="h6">
                  Your Admin Guilds
                </Typography>
                {filterAdminGuilds().map((guild, index) => (
                  <div key={index} className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <img src={guild.iconUrl} alt="Guild Icon" className="w-10 h-10 rounded-full mr-4" />
                      <Typography>
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
        <Typography className="text-center">
          Please log in.
        </Typography>
      )}
    </div>
  );
}

export default Dashboard;
