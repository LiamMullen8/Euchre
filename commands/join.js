const name = "join";
const description = "join a euchre game";

function execute(message, server, args) {
    console.log('joined');
    if (args.length == 0) {
        message.channel.send('Which game do you want to join?');
        for (const game of server.games ){
            
        }
    }
}

exports.name = name;
exports.description = description;
exports.execute = execute;