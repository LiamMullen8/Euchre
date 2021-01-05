var { Game } = require('./gameLogic/game');

class Server {
    constructor() {
        this.games = new Map();
        this.suitCodes = new Map();
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.suitCodes.set('hearts', '\u2665');
        this.suitCodes.set('diamonds', '\u2666');
        this.suitCodes.set('clubs', '\u2667');
        this.suitCodes.set('spades', '\u2664');
    }
    channelHasGame(channelName) {
        return this.games.has(channelName);
    }

    newGame(channelName) {
        if (!this.games.has(channelName)) {
            // console.log('setting new game in channel');
            this.games.set(channelName, new Game(this));
            // console.log(this.games.get(channelName));
        }
    }
}

exports.Server = Server;