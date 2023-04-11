const {notification: {discord}} = require('./config')

const { Client, GatewayIntentBits } = require('discord.js');

class DiscordLogConfig {
    constructor() {
        this.connect();
    }

    async connect() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ]
        });

        // add channel id
        this.channelId = discord.channelId

        this.client.on('ready', () => {
            console.log(`Logged is as ${this.client.user.tag}`)
        })

        await this.client.login(discord.token);
    }

    static getInstance() {
        if (!DiscordLogConfig.instance) {
            DiscordLogConfig.instance = new DiscordLogConfig();
        }

        return DiscordLogConfig.instance;
    }

     sendMessage(msg) {
        const channel = this.client.channels.cache.get(this.channelId)
        if (!channel) {
            console.error(`Couldn't find the channel ... ${this.channelId}`)
            return;
        }

        channel.send(msg).catch(e => console.error(e))
    }

    sendToFormatCode(logData) {
        const {code, message = '', title=''} = logData;

        const codeMsg = {
            content: message,
            embeds: [
                {
                    color: parseInt('00ff00', 16),
                    title,
                    description: "```json\n" + JSON.stringify(code, null, 2) + "\n```"
                }
            ]
        }

        this.sendMessage(codeMsg)
    }
}

const instanceDiscord = DiscordLogConfig.getInstance();
module.exports = instanceDiscord;