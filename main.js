require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const axios = require('axios');

const client = new Discord.Client();
const apiKey = process.env.COINGECKO_API_KEY; // Replace with your CoinGecko API key

client.on('ready', () => {
    console.log(`Ready as ${client.user.tag}`);
});

client.on('message', async message => {
    if (!message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'crypto') {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd`);
            const btcPrice = response.data.bitcoin.usd;
            const ethPrice = response.data.ethereum.usd;

            message.channel.send(`Current prices:\n- Bitcoin: $${btcPrice}\n- Ethereum: $${ethPrice}`);
        } catch (error) {
            console.error(error);
            message.channel.send('Error fetching data from the CoinGecko API.');
        }
    }
});

client.login(process.env.BOT_TOKEN); // Replace with your Discord bot token
