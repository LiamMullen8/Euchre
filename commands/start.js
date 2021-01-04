const name = 'start';
const description = 'activate and start the euchre game logic';
function execute(message, server, args) {
    console.log(message.channel.name);
    message.channel.send("Euchre Start");
    if (!server.games.has(message.channel.name)) {
        message.channel.send('No active Euchre game to start');
        return;
    } else if (server.games.get(message.channel.name).authors.length < 4) {
        console.log(server.games.get(message.channel.name).authors.length);
        message.channel.send('Not enough players to start');
        return;
    }
    server.games.get(message.channel.name).start(message);
}


exports.name = name;
exports.description = description;
exports.execute = execute