const name = "new";
const description = "starts a new game";
function execute(message, server, args) {
    console.log('New game');
}

exports.name = name;
exports.description = description;
exports.execute = execute;