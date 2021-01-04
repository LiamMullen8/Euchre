var Deck = require('../cards/deck');

class game {
    constructor() {
        this.players = new Map();
        this.team1 = new Array();
        this.team2 = new Array();

        this.players['size'] = 0;
        this.players['player1'] = 'None';
        this.players['player2'] = 'None';
        this.players['player3'] = 'None';
        this.players['player4'] = 'None';

        this.deck = new Deck.Deck();
        
    }

    addPlayer(playerName, team) {
        // add a new player to a game
        if (this.players.length >= 4) {
            // teams are full
            console.log("[join] Already 4 players in game, cannot add a new player");
            return;
        }
        if (this.players['size'] === 0) {
            // player 1 is joining
            this.players['player1'] = playerName;
            this.team1.push(playerName);
        } else if (this.players['size'] === 3){
            // player 4 is joining
            this.players['player4'] = playerName;
            if (this.team1.length === 2) {
                this.team2.push(playerName);
            } else if (this.team2.length === 2) {
                this.team1.push(playerName);
            }
        } else {
            // player 2 or player 3 is joining
            if (team === null) {
                if (this.team1.length < 2) {
                    this.team1.push(playerName);
                } else {
                    this.team2.push(playerName);
                }
            } else {
                if (this.players['player2'] === 'None') {
                    this.players['player2'] = playerName;
                } else {
                    this.players['player3'] = playerName;
                }
                if (team === 1) {
                    this.team1.push(playerName);
                } else if (team === 2) {
                    this.team2.push(playerName);
                } else {
                    console.log('[join] unknown team specified: ' + string(team));
                }
            }
        }
        this.players['size'] += 1;
    }

}

exports.game = game;