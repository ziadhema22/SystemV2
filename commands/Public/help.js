const { MessageButton, MessageActionRow, MessageEmbed, Client, MessageSelectMenu } = require("discord.js");
const db = require("pro.db");
const { glob } = require("glob");
const { promisify } = require("util");
const main_prefix = `-`;
module.exports = {
    name: "help",
    description: 'Feeling lost?',
    aliases: [],
    run: async (client,message, args, interaction) => {
      const prefix = db.get(`prefix_${message.guild.id}`) || main_prefix
        const globPromise = promisify(glob);
        // const adminFiles = await globPromise(`${process.cwd()}/commands/Owner/**/*.js`);   
        const infoFiles = await globPromise(`${process.cwd()}/commands/Staff/**/*.js`);   
        const musicFiles = await globPromise(`${process.cwd()}/commands/music/**/*.js`);  
        const publicFiles = await globPromise(`${process.cwd()}/commands/Public/**/*.js`);  
        const ownerFiles = await globPromise(`${process.cwd()}/commands/Owner/**/*.js`);  
      
       let menu = new MessageSelectMenu()
      .setCustomId(`help_${message.author.id}`)
      .setPlaceholder("Choose a category")
         
      .addOptions([						
            {
							label: 'Information The Bot',
							description: 'To view the info commands',
							value: 'information',
              emoji: '<:informationbutton:1028081060707315772>',
						},
						{
							label: 'Info Commands',
							description: 'To view the info commands',
							value: 'info',
              emoji: '<:lind:1022965215505170522>',
						},
            {
							label: 'Music Commands',
							description: 'To view the music commands',
							value: 'music',
              emoji: '<a:600958768368582666:1027856966787268608>',
            },
            {
							label: 'General Commands',
							description: 'To view the general commands',
							value: 'general',
              emoji: '<:generalusernameicon16:1028081627471032340>',
            },
            {
							label: 'Admin Commands',
							description: 'To view the admin commands',
							value: 'admin',
              emoji: '<a:651720016651354112:949738143622512711>',
            },
            {
							label: 'Owner Commands',
							description: 'To view the owner commands',
							value: 'owner',
              emoji: '<:1593348379478:1027856960214802475>',
            },
            {
				  		label: 'Delete list',
			  			description: 'Delete messages list',
				  		value: 'delete',
             emoji:'<:trashbin:1028080691784712273>',
            }])
    
   let row = new MessageActionRow()
      .addComponents([menu]);
  let button = new MessageActionRow()

       .addComponents(
            new MessageButton()
  .setStyle('LINK')
  .setLabel('Server Support')
  .setURL(`https://discord.gg/mRHGP5eRJt`))
        .addComponents(
            new MessageButton()
  .setStyle('LINK')
  .setLabel('NS Dashboard')
  .setURL(`https://Music-Bot-v2.mr-crazycrazy1.repl.co`))

    .addComponents(
            new MessageButton()
  .setStyle('LINK')
  .setLabel('Verify')
  .setURL(`https://Music-Bot-v2.mr-crazycrazy1.repl.co/login`))
      
    let embed = new MessageEmbed()    

.setImage(`https://cdn.discordapp.com/banners/488690007155146753/b06f94b7d8976c4afe8c98e2435065ed.png?size=2048`)

.setColor(message.guild.me.displayHexColor)
      .setTimestamp()
    message.reply({ embeds:[embed], components:[row, button] }).then( msg => {
      let filter = b => b.user.id === message.author.id && b.customId === `help_${message.author.id}`;
      let collector = msg.createMessageComponentCollector({ filter:filter, componentType: 'SELECT_MENU', time:120000 });
      collector.on("collect", (b) => {
        if(b.values[0] === "admin") {   
      let embed_1 = new MessageEmbed()
       .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
          
    // adminFiles.map((value) => {
    //     const file = require(value);
    //     const splitted = value.split("/");
    //     const directory = splitted[splitted.length - 2];

    //     if (file.name) {
    //         const properties = { directory, ...file };
    //         embed_1.addField(`${prefix}${properties.name}`, `${properties.description}`, true)
    //     }
    // })
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});
        } else if(b.values[0] === "information")
        {
      const { version: djsversion } = require("discord.js");
    const { version } = require("../../package.json");
            let days = Math.floor(client.uptime / 86400000);
          let hours = Math.floor(client.uptime / 3600000) % 24;
          let minutes = Math.floor(client.uptime / 60000) % 60;
          let seconds = Math.floor(client.uptime / 1000) % 60;    
    let embed_1 = new MessageEmbed()

  .setAuthor(`Information Bot:`, client.user.displayAvatarURL({dynamic : true}))  
      .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
        .addFields([
    {
    name: `Bot:`,
    value: `\`\`\`Version: v${version}
Name: ${client.user.tag}
Id: ${client.user.id}
Users: ${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}
Guilds Count: ${client.guilds.cache.size.toLocaleString()}
Node.js version: ${process.version}
discord js version: v${djsversion}
Platform: ${process.platform}\`\`\``
},
    {
    name: `Server:`,
    value: `\`\`\`Bot Prefix: ${prefix}
Bot Language: English\`\`\``  

}, 
      {
      name: `System:`, 
      value: `\`\`\`Ping: ${client.ws.ping}ms
Uptime: ${seconds}s ${minutes}m ${hours}h ${days}d\`\`\``
}
])
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});
        } else if(b.values[0] === "owner"){
let embed_1 = new MessageEmbed()

  .setAuthor(`Owner Commands:`, client.user.displayAvatarURL({dynamic : true}))
       .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
                 
    ownerFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            embed_1.addField(`${prefix}${properties.name}`, `${properties.description}`, true)
        }
    })
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});    } else if(b.values[0] === "info") {
      let embed_1 = new MessageEmbed()
       .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
                 
    infoFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            embed_1.addField(`${prefix}${properties.name}`, `${properties.description}`, true)
        }
    })
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});
        } else if(b.values[0] === "general") {
      let embed_1 = new MessageEmbed()
       .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
                 
      publicFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            embed_1.addField(`${prefix}${properties.name}`, `${properties.description}`, true)
        }
    })
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});
        } else if(b.values[0] === "music")
  {
let embed_1 = new MessageEmbed()
       .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
                 
    musicFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            embed_1.addField(`${prefix}${properties.name}`, `${properties.description}`, true)
        }
    })
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});  } else if(b.values[0] === "owner") {
     // if(!owner.includes(interaction.user.id)) return intents.reply({content: `معندكش صلاحيه تشوف الاوامر دي` , ephemeral : true})
      let embed_1 = new MessageEmbed()
       .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
                 
    ownerFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            embed_1.addField(`${prefix}${properties.name}`, `${properties.description}`, true)
        }
    })
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});
    b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});  } else if(b.values[0] === "delete") {
          msg.delete().catch(err => {});
          message.delete().catch(err => {});
        } 
      });
    });
   },
};