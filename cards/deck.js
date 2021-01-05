const { Card }= require('./card.js');

class Deck {
    constructor() {
        this.cards = new Array();
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.values = ['9', '10', 'J', 'Q', 'K', 'A'];
        this.constructDeck();
    }

    constructDeck() {
        // assert (this.cards.length === 0);
        for (const suit of this.suits) {
            for (const value of this.values) {
                this.cards.push(new Card(suit, value));
            }
        }
        // assert (this.cards.length === 24);
    }

    shuffle() {
        var currentIndex = this.cards.length, temporaryValue, randomIndex;

        while (0 != currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }
    }

    length() {
        return this.cards.length;
    }
}
exports.Deck = Deck;