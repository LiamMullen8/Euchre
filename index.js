const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { _ } = require('http'); //used to be const { server }
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


const serverModule = require('./server.js');

var server = new serverModule.Server();

for (const file of commandFiles) {
    console.log('./commands/' + file);
    const command = require('./commands/' + file);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!')
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // console.log(client.commands);
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    // console.log(args);
    const command = args.shift().toLowerCase();
    // console.log("command");
    // console.log(command);
    // console.log(client.commands.has(command))
    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, server, args);
    } catch (error) {
        console.error(error);
        message.reply('no command');
    }
});

client.login(token)