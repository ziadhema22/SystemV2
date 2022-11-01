const player = require("../../client/player");

module.exports = {
    name: "nowplaying",
    description: "Shows what is song that the bot is currently playing.",
    aliases: ['np'],
    async execute(client, message, args) {
                if (!message.member.voice.channel)
            return message.reply({
                content: ":no_entry_sign: **You must join a voice channel to use that!**", ephemeral: true 
            });
        if (message.guild.me.voice?.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.reply({
                content: `:no_entry_sign: You must be listening in **${message.guild.me.voice.channel.name}** to use that!`, ephemeral: true 
            })
        const queue = player.getQueue(message.guild.id);
        if (!queue?.playing)
            return message.reply({
                content: ":x: **bot is not currently playing**", ephemeral: true 
            }).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        })
        return message.reply({
            embeds: [
                { 
                    title: `${queue.current.title}`, 
                    description: `:arrow_forward: ${queue.createProgressBar().split(' ')[2]}\`[${queue.createProgressBar().split(' ')[0]}/${queue.createProgressBar().split(' ')[4]}]\``,
                    color: "2f3136"
                }
            ]}).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        })
    },
};
