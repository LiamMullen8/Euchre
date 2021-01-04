var Deck = require('../cards/deck');
var { Player } = require('./player');
var { Team } = require('./team');

class game {
    constructor() {
        this.players = new Map();
        this.team1 = new Team();
        this.team2 = new Team();

        this.players['size'] = 0;
        this.players['player1'] = new Player(null);
        this.players['player2'] = new Player(null);
        this.players['player3'] = new Player(null);
        this.players['player4'] = new Player(null);

        this.deck = new Deck.Deck();

        this.hasStarted = false;
    }

    start() {
        if (this.players['size'] < 4) {
            console.log('cannot start game, not enough players');
            return;
        }
        this.hasStarted = true;
        this.deck.shuffle();


    }

    deal() {
        // default dealing behavior. Deal 3 to each player, then 2 to each player.
        for (const round of [1,2]) {
            if (round === 1) {
                // deal 3 * 4 = 12 cards
                for (player of this.players.keys) {
                    // give each player 3 cards
                    for ( _ in [1, 2, 3]) {
                        this.players[player].giveCard(this.deck.cards.pop());
                    }
                }
            }
            if (round === 2) {
                // deal 2 * 4 = 8 cards
                for (player of this.players.keys) {
                    // give each player 2 cards
                    for ( _ in [1, 2]) {
                        this.players[player].giveCard(this.deck.cards.pop());
                    }
                }
            }
        }
        // deck size should be 4 now
        assert (this.deck.length === 4);
        return;
    }


    addPlayer(playerName, team) {
        if (this.hasStarted) {
            console.log("[join] game has already started");
            return;
        }

        // add a new player to a game
        if (this.players.length >= 4) {
            // teams are full
            console.log("[join] Already 4 players in game, cannot add a new player");
            return;
        }
        if (this.players['size'] === 0) {
            // player 1 is joining
            this.players['player1'].name = playerName;
            // player 1 auto-joins team 1
            this.team1.addPlayer(this.players['player1']);

        } else if (this.players['size'] === 3){
            // player 4 is joining
            this.players['player4'].name = playerName;
            if (this.team1.length === 2) {
                this.team2.addPlayer(this.players['player4']);
            } else if (this.team2.length === 2) {
                this.team1.addPlayer(this.players['player4']);
            }
        } else {
            // player 2 or player 3 is joining
            var playerNum = null
            if (this.players['player2'].name === null) {
                this.players['player2'].name = playerName;
                playerNum = 2;
            } else {
                this.players['player3'].name = playerName;
                playerNum = 3;
            }
            if (team === null) {
                // user did not specify a team to join

                if (this.team1.length < 2) {
                    if (this.playerNum === 2) {
                        this.team1.addPlayer(this.players['player2']);
                    } else {
                        this.team1.addPlayer(this.players['player3']);
                    }
                }
            } else {
                // user requests to join either team 1 or 2
                if (team === 1) {
                    if (this.team1.length >= 2) {
                        console.log('cannot join team 1 as it is full');
                        return;
                    }
                    if (playerNum === 2) {
                        this.team1.addPlayer(this.players['player2']);
                    } else {
                        this.team1.addPlayer(this.players['player3']);
                    }
                } else if (team === 2) {
                    if (this.team2.length >= 2) {
                        console.log('cannot join team 2 as it is full');
                        return;
                    }
                    if (playerNum === 2) {
                        this.team2.addPlayer(this.players['player2']);
                    } else {
                        this.team2.addPlayer(this.players['player3']);
                    }
                } else {
                    console.log('invalid team: ' + String(team));
                    return;
                }
            }
        }
        this.players['size'] += 1;
        console.log('new player added: ' + playerName);
    }

}

exports.game = game;