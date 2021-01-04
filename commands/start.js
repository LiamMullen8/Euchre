const name = 'start';
const description = 'activate and start the euchre game logic';
function execute(message, server, args) {
    console.log(message.channel.name);
    message.channel.send("Euchre Start");
}


exports.name = name;
exports.description = description;
exports.execute = execute