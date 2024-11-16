# 222 Discord Bot

222 Discord Bot is a versatile Discord bot designed to enhance your server's functionality and user experience. From utility commands to music playback, this bot brings a range of features to your community.

### [Slash Commands](COMMANDS.md)

For a detailed list of all available slash commands and their descriptions, please see the [Slash Commands](COMMANDS.md) documentation.

### [Installation Prerequisites](PREREQS.md)

Before installing the 222 Discord Bot, make sure to review the [Installation Prerequisites](PREREQS.md) to ensure your system meets all the necessary requirements.

## Installation Instructions

To get started with 222 Discord Bot, follow these simple steps:

1. **Clone the GitHub Project**

    Start by cloning the project to your local machine or downloading the zip file.

    ```bash
    git clone https://github.com/tonywied17/222-discord-bot.git
    cd 222-discord-bot
    ```

2. **Install Dependencies for the Bot & Backend**

    With the project cloned, navigate to the root directory and install the required dependencies using npm.

    ```bash
    npm install
    ```

3. **Install Dependencies for the Frontend Dashboard**

    Next, navigate to the `/dashboard/frontend` directory to install the frontend dependencies.

    ```bash
    cd dashboard/frontend
    npm install
    ```

    After the installation is complete, you can return to the root directory by running `cd ../../`.

4. **Create Environment Variables**

    Before running the bot, the dashboard, and the backend, you need to set up the required environment variables. Create a `.env` file in the root directory for the bot's environment variables, another `.env` file inside `/dashboard/frontend` for the frontend's environment variables, and a third `.env` file within `/dashboard/backend` for the backend's environment variables.

    **For the bot, in the root directory:**

    ```plaintext
    TOKEN=<Discord Application/Bot Token>
    CLIENT_ID=<Discord Application Client ID>
    ```

    Replace `<Discord Application/Bot Token>` and `<Discord Application Client ID>` with your actual Discord application's bot token and client ID, respectively.

    **For the frontend, in `/dashboard/frontend`:**

    ```plaintext
    REACT_APP_BACKEND_URL=<Express Backend Endpoint>
    SESSION_SECRET=<Your Session Secret>
    ```

    Replace `<Express Backend Endpoint>` with the URL where your backend server will be accessible. The `SESSION_SECRET` can be any string and is used to secure session data.

    **For the backend, in `/dashboard/backend`:**

    ```plaintext
    CLIENT_ID=<Discord Client ID>
    CLIENT_SECRET=<Discord Client Secret>
    CALLBACK_URL=<OAuth2 Callback URL>
    OAUTH2_URL=<OAuth2 URL>
    FRONTEND_URL=<React App Deploy URL>
    SESSION_SECRET=<Your Session Secret>
    ```

    These variables are critical for the operation of your backend, including integration with Discord OAuth2 for authentication and linking the backend with your frontend. Ensure you replace each placeholder with the appropriate values for your application's setup.

## Running the Bot Only

- **To run the bot in the console:**

    ```bash
    node index.js
    ```

- **To delete and re-register/refresh global slash commands:**

    ```bash
    node slash-register.js
    ```

### Optional: Deploying the Bot Continuously with Forever

For a more resilient deployment, you can use `forever`, a CLI tool to ensure that your bot runs continuously. This is particularly useful for production environments.

1. **Install Forever Globally**

    ```bash
    npm install forever -g
    ```

2. **Start Your Bot with Forever**

    To keep your bot running continuously, navigate to your bot's directory and start it with `forever`:

    ```bash
    forever start -a --uid "222Bot" index.js
    ```

    This command starts the bot and assigns it a unique identifier (`uid`) of "222Bot", making it easy to manage later.

3. **Managing Your Bot with Forever**

    - **To list all processes:**

        ```bash
        forever list
        ```

    - **To stop your bot:**

        ```bash
        forever stop 222Bot
        ```

For more details on using `forever`, refer to its [documentation](https://github.com/foreversd/forever).

## 222 Web Dashboard
The 222 Discord Bot comes with a web dashboard built using Create React App and styled with TailwindCSS and Tailwind Material while utilizing a REST API backend using Express.js, discord-passport, and sqlite. The dashboard allows for easy management and configuration of the bot's features directly from a web interface.

### Development Commands (Bot, React, Express API)

- **For backend API development (Express, SQLite):**

    ```bash
    npm run start:backend
    ```

- **For frontend development (Create React App, TailwindCSS, Tailwind Material):**

    ```bash
    npm run dev:frontend
    ```

- **To run the bot, frontend and backend in concurrently in development mode:**

    ```bash
    npm run dev
    ```

## React Dashboard Screenshots

### Home Dashboard
![Home Dashboard](https://raw.githubusercontent.com/tonywied17/222-discord-bot/refs/heads/main/assets/home_dash.png)

### User Dashboard
![User Dashboard](https://github.com/tonywied17/222-discord-bot/blob/main/assets/user_dash.png)

### Guild Settings
![Guild Settings](https://raw.githubusercontent.com/tonywied17/222-discord-bot/refs/heads/main/assets/guild_settings.png)


## Discord Bot Screenshots

### Slash Commands
![Slash Command 1](https://raw.githubusercontent.com/tonywied17/222-discord-bot/refs/heads/main/assets/slash_1.png)
![Slash Command 2](https://raw.githubusercontent.com/tonywied17/222-discord-bot/refs/heads/main/assets/slash_2.png)

### Sample Outputs
![Sample Outputs](https://github.com/tonywied17/222-discord-bot/blob/main/assets/sample_outputs.png)


## Contributing

Your contributions are welcome! If you have suggestions for new features or improvements, feel free to fork the project, make your changes, and submit a pull request.

## License

This project is licensed under GPL-3.0 license, see the LICENSE file for details.

## Technical Dependencies

The 222 Discord Bot is built using a variety of technologies and dependencies. Below is a list of the main dependencies used in the project:

### Backend Dependencies
- **@discordjs/voice:** Voice client library for Discord.js.
- **axios:** Promise based HTTP client for the browser and node.js.
- **cors:** Node.js package for providing a Connect/Express middleware that can be used to enable CORS.
- **discord.js:** A powerful JavaScript library for interacting with the Discord API.
- **dotenv:** Loads environment variables from a `.env` file into `process.env`.
- **express:** Fast, unopinionated, minimalist web framework for node.
- **express-session:** Simple session middleware for Express.
- **ffmpeg-static:** A static build of ffmpeg for Node.js projects.
- **libsodium-wrappers:** A wrapper for the libsodium cryptographic library.
- **node-fetch:** A light-weight module that brings `window.fetch` to Node.js.
- **passport:** Express-compatible authentication middleware for Node.js.
- **passport-discord:** A Discord strategy for Passport.
- **path:** Utilities for working with file and directory paths.
- **prism-media:** A media transcoding utility used by discord.js for voice.
- **sqlite3:** Asynchronous, non-blocking SQLite3 bindings for Node.js.
- **youtube-sr:** A simple YouTube search and information library.
- **ytdl-core:** A library that downloads videos from YouTube as a stream.

### Frontend Dependencies
- **react:** A JavaScript library for building user interfaces.
- **react-icons:** Includes popular icons in your React projects easily.
- **@material-tailwind/react:** Material Tailwind components for React.
- **tailwindcss:** A utility-first CSS framework for rapid UI development.

This comprehensive set of technologies and libraries ensures the bot's functionality across various features, including interaction with the Discord API, handling web requests, and streaming media content.

## Acknowledgements

- Thanks to everyone who has contributed to the development of this bot.
- Discord API for making interactive bots possible.
- Special thanks to the following third-party APIs for providing valuable data and services used by this bot:
  - [Advice Slip API](https://api.adviceslip.com/advice) for random pieces of advice.
  - [Affirmations.dev](https://www.affirmations.dev/) for motivational affirmations.
  - [Evil Insult Generator](https://evilinsult.com/generate_insult.php?lang=en&type=json) for generating random insults.
  - [Urban Dictionary API](https://api.urbandictionary.com/) for word definitions and slang explanations.
