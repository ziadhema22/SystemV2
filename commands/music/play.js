const { QueryType } = require("discord-player");
const player = require("../../client/player");

module.exports = {
    name: "play",
    description: "Add a song to queue and plays it.",
    aliases: ['p', 'شغل', 'ش'],
     async execute(client, message, args) {
        if (!message.member.voice.channel)
            return message.reply({
                content: ":no_entry_sign: **You must join a voice channel to use that!**", ephemeral: true 
            }).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        })
        if (message.guild.me.voice?.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.reply({
                content: `:no_entry_sign: You must be listening in **${message.guild.me.voice.channel.name}** to use that!`, ephemeral: true 
            }).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        })
                const songTitle = args.slice(0).join(' ')
        if (!songTitle) 
            return message.reply({
                content: `:no_entry_sign: **You should type song name or url.**`, ephemeral: true 
            }).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        })
  const queue = await player.createQueue(message.guild, {
            leaveOnEnd: false,
			leaveOnStop: true,
            metadata: {
                channel: message.channel,
                voice: message.member.voice.channel
            }
        });
        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            queue.destroy();
            return await message.reply({ content: "**Couldn't join your voice channel!**", ephemeral: true }).catch((err) => {
                                                console.log(`i couldn't reply to the message: ` + err.message)
                                        })
        }
        message.reply({ content: `:watch: Searching ... (\`${songTitle}\`)`, etchReply: true }).then(async m => {
                    const searchResult = await player.search(songTitle, {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO,
        });
            if (!searchResult.tracks.length) return m.edit({content: `**:mag: Not found.**`})
            m.edit({content: `:notes: **${searchResult.tracks[0].title}** Added to **Queue** (${searchResult.tracks[0].duration})!`, ephemeral: true })
            searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();
        })
    },
};
