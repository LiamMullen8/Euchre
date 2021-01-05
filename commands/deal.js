const name = "deal";
const description = "called by the dealer to deal the current hand";
function execute(message, server, args) {
    if (!server.games.has(message.channel.name)) {
        message.channel.send("No active Euchre game in this channel. Create a new game with !new");
        return;
    } else if (!server.games.get(message.channel.name).hasStarted) {
        message.channel.send("Euchre game has not yet started. Start the game with !start");
        return;
    } else if (server.games.get(message.channel.name).currentDealer.name != message.author.username) {
        console.log(server.games.get(message.channel.name).currentDealer.name);
        message.channel.send("It is not your turn to deal");
        return;
    }
    console.log('dealing');
    server.games.get(message.channel.name).deal(message);
}

exports.name = name;
exports.description = description;
exports.execute = execute;