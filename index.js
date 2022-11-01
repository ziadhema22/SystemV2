const { Client, Intents, Collection } = require('discord.js');
const { TOKEN } = require('./config.json');

const client = new Client({
    intents: 32767,
  allowedMentions: { repliedUser: false },
});

client.commands = new Collection();
client.events = new Collection();

['commands', 'events'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(TOKEN);
// client.login(process.env.token || ((_a = config.json) === null || _a === void 0 ? void 0 : _a.token)).catch((err) => {
//     console.log(err.message)
//   });