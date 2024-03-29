import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

/**
   * @name GuildManage
   * This component is used to display the guild management page
   * It fetches the guild's information and settings and displays it
   */
function GuildManage() {
  const { guildId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [guildInfo, setGuildInfo] = useState(location.state || null);
  const [guildSettings, setGuildSettings] = useState(null);
  const [hasFetchedGuildSettings, setHasFetchedGuildSettings] = useState(false);

  useEffect(() => {
    if (!guildInfo) { 
      checkAuthenticationAndFetchGuildInfo();
    } else {
      fetchGuildSettings(); 
    }
  }, [guildId, guildInfo]);
  const checkAuthenticationAndFetchGuildInfo = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/checkAuth`, { withCredentials: true })
      .then(authResponse => {
        if (!authResponse.data.isAuthenticated) {
          navigate('/');
        } else {
          fetchGuildInfoBasedOnId();
        }
      })
      .catch(error => {
        console.error("Authentication check failed:", error);
        navigate('/');
      });
  };

  /**
   * Fetch the user's guild information
   * @returns {void}
   */
  const fetchGuildInfoBasedOnId = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/info`, { withCredentials: true })
      .then(userInfoResponse => {
        const allGuilds = [...userInfoResponse.data.botAdminGuilds, ...userInfoResponse.data.guilds];
        const currentGuild = allGuilds.find(guild => guild.guildId === guildId);
        if (!currentGuild) {
          console.error("Guild not found among user's guilds.");
          navigate('/');
          return;
        }

        if (currentGuild.permissions !== 2147483647) {
          console.error("User does not have admin rights for this guild.");
          navigate('/');
          return;
        }
  
        setGuildInfo({
          guildName: currentGuild.guildName,
          iconUrl: currentGuild.iconUrl,
        });
        if (!hasFetchedGuildSettings) {
          fetchGuildSettings();
        }
      })
      .catch(error => console.error("Error fetching user info for guilds:", error));
  };

  /**
   * Fetch the guild's settings
   * @returns {void}
   */
  const fetchGuildSettings = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/guilds/${guildId}/settings`, { withCredentials: true })
      .then(response => {
        setGuildSettings(response.data);
        setHasFetchedGuildSettings(true);
      })
      .catch(error => console.error("Error fetching guild settings:", error));
  };

  return (
    <div className="p-4">
      {guildInfo && (
        <Card className="mb-8 bg-[#00000044] text-white slide-left">
          <CardBody className="flex flex-col md:flex-row items-center space-x-4">
            <img src={guildInfo.iconUrl || '/default-guild-icon.png'} alt="Guild Icon" className="w-20 h-20 rounded-full" />
            <div>
              <Typography variant="h5" className="mb-2">
                {guildInfo.guildName}
              </Typography>
              <Typography variant="paragraph">
                ID: {guildId}
              </Typography>
            </div>
          </CardBody>
        </Card>
      )}

      {guildSettings && (
        <Card className="mb-8 bg-[#00000044] text-white slide-left">
          <CardBody>
            <Typography variant="h5" className="mb-4">Guild Settings</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(guildSettings).map(([settingKey, settingValue]) => (
                <div key={settingKey} className="mb-4">
                  <Typography variant="h6">{settingKey}</Typography>
                  <Typography variant="paragraph">
                    {settingValue}
                  </Typography>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default GuildManage;
