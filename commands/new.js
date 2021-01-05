const name = "new";
const description = "starts a new game";
function execute(message, server, args) {
    console.log('New game');
    if (!server.channelHasGame(message.channel.name)) {
        server.newGame(message.channel.name);
        console.log('\u2665');
        console.log('\u2664');
        message.channel.send('New game of Euchre started');
        message.channel.send(server.games.get(message.channel.name).status());
    } else {
        message.channel.send("An active Euchre game already exists in this channel");
    }
}

exports.name = name;
exports.description = description;
exports.execute = execute;