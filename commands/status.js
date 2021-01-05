const name = "status";
const description = "retrieve a summary of the current state of the game";
function execute(message, server, args) {
    if (!server.games.has(message.channel.name)) {
        message.channel.send("No active Euchre game in this channel");
        return;
    }
    message.channel.send(server.games.get(message.channel.name).status());
    // message.author.send("hi");
}

exports.name = name;
exports.description = description;
exports.execute = execute;