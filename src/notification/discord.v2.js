const { Client, GatewayIntentBits } = require('discord.js');

class DiscordLogService {
    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ]
        });

        // add channel id
        this.channelId = '1123249441260974103'

        this.client.on('ready', () => {
          console.log(`Logged is as ${this.client.user.tag}`)
        })

    }

    async sendMessage(msg) {
        await this.client.login("MTEyNzQzNjkxODkzMDUzODU5OQ.GHP88i.h-C8lZOyJesfgTWCIZcaykO3J8AxyBf0tUCPmM");

        const channel = await this.client.channels.fetch(this.channelId)
        // const channel = this.client.channels.cache.get(this.channelId)
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
                    description: '```json\n' + JSON.stringify(code, null, 2) + '\n```'
                }
            ]
        }

        this.sendMessage(codeMsg)
    }
}

module.exports = new DiscordLogService();