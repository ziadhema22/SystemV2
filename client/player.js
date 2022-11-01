const { Player } = require("discord-player");
const client = require("../index.js");
const { Utils } = require("devtools-ts");
const utilites = new Utils();
const player = new Player(client, {
  ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },
});

player.on("error", (queue, error) => {
  });
  player.on("botDisconnect", (queue) => {
  });

  player.on("connectionCreate", (queue, connection) => {
  });
  player.on("connectionError", (queue, error) => {
  });
  player.on("queueEnd", (queue) => {
  });
  player.on("trackAdd", (queue, track) => {
  });
  player.on("trackEnd", (queue, track) => {
  });
  player.on("tracksAdd", (queue, tracks) => {
  });
  player.on("trackStart", (queue, track) => {
  });
  player.on("trackStart", (queue, track) => {
    client.user.setActivity(`${track.title}`, {type: "LISTENING"});
  });
  player.on("trackEnd", (queue, track) => {
    client.user.setActivity(`Dev:乡Joker乡#6973`);
  });

module.exports = player;
