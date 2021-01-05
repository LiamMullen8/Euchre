var { card } = require('../cards/card');

class Player {
    constructor(name) {
        this.name = name;
        this.hand = new Map();
        for (const suit of ['hearts', 'diamonds', 'clubs', 'spades']) {
            this.hand.set(suit, new Array());
        }
    }

    giveCard(card) {
        this.hand.get(card.suit).push(card);
    }

    discardLowestCard() {
        
    }
}

exports.Player = Player;