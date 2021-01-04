const cards = require('./card.js');

class Deck {
    constructor() {
        this.cards = new Array();
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.values = ['9', '10', 'J', 'Q', 'K', 'A'];
        this.constructDeck();
    }

    constructDeck() {
        assert (this.cards.length === 0);
        for (const suit of this.suits) {
            for (const value of this.values) {
                this.cards.push(suit, value);
            }
        }
        assert (this.cards.length === 24);
    }

    shuffle() {
        this.cards.shuffle();
    }

    length() {
        return this.cards.length;
    }
}
exports.Deck = Deck;