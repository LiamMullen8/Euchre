const name = "join";
const description = "join a euchre game";

function execute(message, server, args) {
    if (!server.games.has(message.channel.name)) {
        message.channel.send("No active Euchre game in this channel. Start a new game with !new");
        return;
    }
    server.games.get(message.channel.name).addPlayer(message.author, null);
}

exports.name = name;
exports.description = description;
exports.execute = execute;