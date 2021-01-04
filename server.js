var { Game } = require('./gameLogic/game');

class Server {
    constructor() {
        this.games = new Map();
    }
    channelHasGame(channelName) {
        return this.games.has(channelName);
    }

    newGame(channelName) {
        if (!this.games.has(channelName)) {
            console.log('setting new game in channel');
            this.games.set(channelName, new Game());
            console.log(this.games.get(channelName));
        }
    }
}

exports.Server = Server;