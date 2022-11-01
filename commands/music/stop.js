const player = require("../../client/player");

module.exports = {
    name: "stop",
    description: "Stop the current song and clears the entire music queue.",
    aliases: ['st'],
    async execute(client, message, args) {
                if (!message.member.voice.channel)
            return message.reply({
                content: ":no_entry_sign: **You must join a voice channel to use that!**", ephemeral: true 
            }).catch((err) => {console.log(`i couldn't reply to the message: ` + err.message)
    })
if (!message.guild.me.voice.channel)
            return message.reply({
                content: ":notes: **The player has stopped and the queue has been cleared.**", ephemeral: true 
            }).catch((err) => {console.log(`i couldn't reply to the message: ` + err.message)
    })
        if (message.guild.me.voice?.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.reply({
                content: `:no_entry_sign: You must be listening in **${message.guild.me.voice.channel.name}** to use that!`, ephemeral: true 
            }).catch((err) => {console.log(`i couldn't reply to the message: ` + err.message)
    })
        const queue = player.getQueue(message.guild.id);

        queue.stop();

        return message.reply({ content: ":notes: **The player has stopped and the queue has been cleared.**", ephemeral: true  }).catch((err) => {console.log(`i couldn't reply to the message: ` + err.message)
    })
    },
};
