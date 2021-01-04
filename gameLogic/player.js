var { card } = require('../cards/card');

class Player {
    constructor(name) {
        this.name = name;
        this.hand = new Map();
        for (suit of ['hearts', 'diamonds', 'clubs', 'spades']) {
            this.hand[suit] = new Array();
        }
    }

    giveCard(card) {
        this.hand[card.suit] = card;
    }
}

exports.Player = Player;