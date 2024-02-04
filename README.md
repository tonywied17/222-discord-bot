# 222 Discord Bot

222 Discord Bot is a versatile Discord bot designed to enhance your server's functionality and user experience. From utility commands to music playback, this bot brings a range of features to your community.

## Installation Instructions

To get started with 222 Discord Bot, follow these simple steps:

1. **Clone the GitHub Project**

    Start by cloning the project to your local machine or downloading the zip file.

    ```bash
    git clone https://github.com/tonywied17/222-discord-bot.git
    cd 222-discord-bot
    ```

2. **Install Dependencies**

    With the project cloned, navigate to the root directory and install the required dependencies using npm.

    ```bash
    npm install
    ```

3. **Create Environment Variables**

    Before running the bot, you need to set up the required environment variables. Create a `.env` file in the root directory and include the following:

    ```plaintext
    TOKEN=<Discord Application/Bot Token>
    CLIENT_ID=<Discord Application Client ID>
    ```

    Replace `<Discord Application/Bot Token>` and `<Discord Application Client ID>` with your actual Discord application's bot token and client ID, respectively.

## Running the Bot

- **To run the bot in the console:**

    ```bash
    node index.js
    ```

- **To delete and re-register/refresh global slash commands:**

    ```bash
    node slash-register.js
    ```

### Optional: Running the Bot Continuously with Forever

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

## Supported Slash Commands

222 Discord Bot supports a variety of slash commands to improve the user experience on your server. Here's what you can do:

### Utility Commands

- `/ping`: Replies with "pong". This is a simple command to test the bot's responsiveness.

### Music Commands

- `/play` - Plays a YouTube video in your voice channel. You need to provide the URL of the YouTube video or a search query as an option.
  - **Options:** `query` - The YouTube video URL or a search query.

- `/queue` - Displays the current music queue.

- `/skip` - Skips the currently playing song.

- `/stop` - Stops the music and leaves the voice channel.

### Therapy Commands

- `/advice` - Get a random piece of advice.

- `/affirmation` - Get a motivational affirmation.

- `/roastme` - Roast someone with a randomly generated insult.

### Searcher Commands

- `/urban` - Get the definition of a word from Urban Dictionary.
  - **Options:** `word` - The word to define.

## Contributing

Your contributions are welcome! If you have suggestions for new features or improvements, feel free to fork the project, make your changes, and submit a pull request.

## License

This project is licensed under [insert your license here], see the LICENSE file for details.

## Acknowledgements

- Thanks to everyone who has contributed to the development of this bot.
- Discord API for making interactive bots possible.
- Special thanks to the following third-party APIs for providing valuable data and services used by this bot:
  - [Advice Slip API](https://api.adviceslip.com/advice) for random pieces of advice.
  - [Affirmations.dev](https://www.affirmations.dev/) for motivational affirmations.
  - [Evil Insult Generator](https://evilinsult.com/generate_insult.php?lang=en&type=json) for generating random insults.
  - [Urban Dictionary API](https://api.urbandictionary.com/) for word definitions and slang explanations.
