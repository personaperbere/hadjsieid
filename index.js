const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');

let bot = new Client({
  fetchAllMembers: true, // Remove this if the bot is in large guilds.
  presence: {
    status: 'dnd',
    activity: {
      name: `mondragone simulator 2022`,
      type: 'PLAYING'
    }
  }
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on('message', async message => {
  // Check for command
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    switch (command) {

      case 'ping':
        let msg = await message.reply('aspettw...');
        await msg.edit(`sto facendo ${Date.now() - msg.createdTimestamp}ms sto laggand,,,.`)
        break;

      case 'say':
      case 'repeat':
        if (args.length > 0)
          message.channel.send(args.join(' '));
        else
          message.reply('nn capisci noente!! 😠😠😠😠😠, nn mi hai dato mex da ripetere ,,,')
        break


      /* Unless you know what you're doing, don't change this command. */
      case 'help':
        let embed =  new MessageEmbed()
          .setTitle('MENU AIUT')
          .setColor('GREEN')
          .setFooter(`Richiesto da quel frocio di: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        if (!args[0])
          embed
            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            embed
              .setTitle(`COMMAND - ${command}`)

            if (commands[command].aliases)
              embed.addField('alias comandi', `\`${commands[command].aliases.join('`, `')}\``);
            embed
              .addField('descrizions', commands[command].description)
              .addField('formato', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            embed
              .setColor('RED')
              .setDescription('sto comand nn esist,,,,,,');
          }
        }
        message.channel.send(embed);
        break;
    }
  }
});

require('./server')();
bot.login(config.token);
