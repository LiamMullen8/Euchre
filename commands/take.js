const name = "take";
const description = "command issued to make the dealer pick up the center card";
function execute(message, server, args) {
    server.get(message.channel.name).pickItUp();
}