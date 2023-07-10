// const { Client, GatewayIntentBits } = require('discord.js');
//
// const client = new Client({
//     intents: [
//         GatewayIntentBits.DirectMessages,
//         GatewayIntentBits.Guilds,
//         GatewayIntentBits.GuildMessages,
//         GatewayIntentBits.MessageContent,
//     ]
// });
//
// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });
//
// client.on('interactionCreate', async interaction => {
//     if (!interaction.isChatInputCommand()) return;
//
//     if (interaction.commandName === 'ping') {
//         await interaction.reply('Pong!');
//     }
// });
//
// client.on('messageCreate', async msg => {
//     if (msg.author.bot) return;
//     if (msg.content === 'ping') {
//         await msg.reply('hello, Can I help you?')
//     }
// })
//
// client.login("MTEyMzI0Nzc5NjAzNjg0NTU5MQ.GJ-e9A.BRhpGuiKKwtIOzaOhF3qtBq34vx7NdpZ8Mshm0");
//

const discordService = require('./discord.v2')
discordService.sendToFormatCode({
    code: 'a',
    message: 'internal server error',
    title: 'error',
});
