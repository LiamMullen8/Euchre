class Player {
    constructor(name) {
        this.name = name;
        this.hand = new Map();
        for (suit of ['hearts', 'diamonds', 'clubs', 'spades']) {
            this.hand[suit] = new Array();
        }
    }
}

exports.Player = Player;