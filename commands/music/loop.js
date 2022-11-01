const player = require("../../client/player");

module.exports = {
    name: "repeat",
    description: "Toggles the repeat mode.",
    aliases: ['loop'],
    async execute(client, message, args) {
                if (!message.member.voice.channel)
            return message.reply({
                content: ":no_entry_sign: **You must join a voice channel to use that!**", ephemeral: true 
            }).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        });
        if (message.guild.me.voice?.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.reply({
                content: `:no_entry_sign: You must be listening in **${message.guild.me.voice.channel.name}** to use that!`, ephemeral: true 
            }).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        })
        const queue = player.getQueue(message.guild.id);
        if (!queue?.playing)
            return message.reply({
                content: ":no_entry_sign: **There must be music playing to use that!**",
            }).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        });
       if (queue.repeatMode == 0) {
        queue.setRepeatMode(1);
        message.reply({ content: "Repeat Mode: **ON**", ephemeral: true }).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        });
       } else {
        queue.setRepeatMode(0);
        message.reply({ content: "Repeat Mode: **OFF**", ephemeral: true }).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        });
       }
    },
};
