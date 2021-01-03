const name = 'starteuchre';
const description = 'activate and start the euchre logic';
function execute(message, args) {
    message.channel.send("Euchre Start");
}


exports.name = name;
exports.description = description;
exports.execute = execute