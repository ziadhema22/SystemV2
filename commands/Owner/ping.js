const { COOLDOWN } = require('../../config.json');

module.exports = {
    name: 'ping',
    cooldown: COOLDOWN,
    aliases: [],
    execute(client, message, args) {

        message.reply('Pong.');

    }
}