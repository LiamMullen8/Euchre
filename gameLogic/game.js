var Deck = require('../cards/deck');
var { Player } = require('./player');
var { Team } = require('./team');

class Game {
    constructor(server) {
        this.server = server;

        this.players = new Map();
        // authors used for accessing discord functions on players
        this.authors = new Array();

        this.team1 = new Team('1');
        this.team2 = new Team('2');

        this.players.set('size', 0);
        this.players.set('player1', new Player(null));
        this.players.set('player2', new Player(null));
        this.players.set('player3', new Player(null));
        this.players.set('player4', new Player(null));

        this.playOrder = new Array();

        this.deck = new Deck.Deck();

        this.centerCard = null;

        this.hasStarted = false;

        this.currentDealer = null; // Player

        this.inPickUpPhase = false;

        this.currentTurnIndex = null;
    }

    pickItUp(message) {
        if (message.author.username != this.playOrder[this.currentTurnIndex].name) {
            message.channel.send("It is not your turn to tell the dealer to pick it up");
            return;
        }
        this.currentDealer.giveCard(this.centerCard);
    }

    pickUpLoop() {
        const dealerIndex = this.playOrder.findIndex(this.currentDealer);
        var currIndex = this.dealerIndex;
        // start to the left of the dealer
        if (currIndex == 0){
            currIndex = this.playOrder.length - 1;
        } else {
            currIndex = currIndex - 1;
        }
        const startIndex = currIndex;
        while (true) {
            if (currIndex == 0){
                currIndex = this.players.length - 1;
            } else {
                currIndex = currIndex - 1;
            }

            if (currIndex == startIndex) {break;}
        }
    }

    status() {
        // returns a string message to send to the channel detailing the state of the game
        const title = "Euchre Game Info:\n";
        var team1Info = "Team " + this.team1.which + ":\n";
        team1Info += "\tMembers: [ ";
        var t1Members = 0;
        for (const index of [0,1]) {
            if (this.team1.players.length < index + 1) {
                team1Info += "None";
            } else {
                team1Info += this.team1.players[index].name;
            }
            if (index === 0) {
                team1Info += " , ";
            }
        }
        team1Info += " ]";

        team1Info += "\n";
        team1Info += "\tPoints: " + this.team1.points + "\n\n";

        var team2Info = "Team " + this.team2.which + ":\n";
        team2Info += "\tMembers: [ ";
        var t2Members = 0;
        for (const index of [0,1]) {
            if (this.team2.players.length < index + 1) {
                team2Info += "None";
            } else {
                team2Info += this.team2.players[index].name;
            }
            if (index === 0) {
                team2Info += " , ";
            }
        }
        team2Info += " ] ";
        team2Info += "\n";
        team2Info += "\tPoints: " + this.team2.points;

        return title + team1Info + team2Info;

    }

    start(message) {
        if (this.players['size'] < 4) {
            console.log('cannot start game, not enough players');
            return;
        }
        this.hasStarted = true;
        // shuffle the deck
        this.deck.shuffle();

        // start the game with a random dealer
        this.currentDealerIndex = Math.floor(Math.random() * 4);
        console.log(this.currentDealerIndex);
        switch (this.currentDealerIndex) {
            case 0:
                this.currentDealer = this.players.get('player1');
            case 1:
                this.currentDealer = this.players.get('player2');
            case 2:
                this.currentDealer = this.players.get('player3');
            case 3:
                this.currentDealer = this.players.get('player4');
        }
        message.channel.send('Euchre game starting');
        message.channel.send(this.status());
        message.channel.send(this.currentDealer.name + ' is the dealer. Call !deal to deal cards');
    
        this.playOrder.push(this.team1.players[0]);
        this.playOrder.push(this.team2.players[0]);
        this.playOrder.push(this.team1.players[1]);
        this.playOrder.push(this.team2.players[1]);
        // game kicks off in the "pick it up" loop
        this.inPickUpPhase = true;

        const dealerIndex = this.playOrder.findIndex(this.currentDealer);
        var currIndex = this.dealerIndex;
        // start to the left of the dealer
        if (currIndex == 0){
            currIndex = this.playOrder.length - 1;
        } else {
            currIndex = currIndex - 1;
        }
        // assign the index
        this.currentTurnIndex = currIndex;
        return;
    }
    sendHand(author, hand) {
        console.log('send hand');
        var message = "Your hand is: ";
        const suits = Array.from(hand.keys());
        var i = 1;
        for (const suit of suits) {
            for (const card of hand.get(suit)) {
                message += i;
                message += ') ';
                message += '['
                message += this.server.suitCodes.get(suit)
                message += ' ';
                message += card.value;
                message += ']'
                if (i < 5) {
                    message += "  |  ";
                }
                
                i += 1;
            }
        }
        author.send(message);
        return;
    }

    deal(message) {
        // default dealing behavior. Deal 3 to each player, then 2 to each player.
        // console.log(this.players.keys());
        console.log('deck');
        console.log(this.deck.cards);
        let playerKeys = Array.from(this.players.keys()).slice(1);

        for (const round of [1,2]) {
            if (round === 1) {
                // deal 3 * 4 = 12 cards
                for (const player of playerKeys) {
                    // give each player 3 cards
                    for ( const _ in [1, 2, 3]) {
                        // console.log('fsaf');
                        // console.log(this.players);
                        // console.log(this.players.get(player));
                        // console.log('cards: ' + this.deck.cards);
                        this.players.get(player).giveCard(this.deck.cards.pop());
                    }
                }
            } else if (round === 2) {
                // deal 2 * 4 = 8 cards
                for (const player of playerKeys) {
                    // give each player 2 cards
                    // console.log(this.players.get(player));
                    for ( const _ in [1, 2]) {
                        this.players.get(player).giveCard(this.deck.cards.pop());
                    }
                }
            }
        }
        console.log(this.players.get('player1').hand);
        // deck size should be 4 now
        // assert (this.deck.length === 4);
        console.log(this.authors);
        
        for (const author of this.authors) {
            for (const player of playerKeys) {
                console.log(author.username);
                console.log(player.name);
                const currPlayer = this.players.get(player);
                if (author.username == currPlayer.name) {
                    console.log(author.username);
                    this.sendHand(author, currPlayer.hand);
                }
            }
        }
        this.centerCard = this.deck.cards.pop();
        var centerCardMessage = "Center card is: [";
        centerCardMessage += this.server.suitCodes.get(this.centerCard.suit);
        centerCardMessage += this.centerCard.value;
        centerCardMessage += ']';
        message.channel.send(centerCardMessage);

        return;
    }


    addPlayer(author, team) {
        if (this.hasStarted) {
            console.log("[join] game has already started");
            return;
        }

        // add a new player to a game
        if (this.players.get('size') >= 4) {
            // teams are full
            console.log("[join] Already 4 players in game, cannot add a new player");
            return;
        }
        const playerName = author.username;
        this.authors.push(author);

        if (this.players.get('size') === 0) {
            // player 1 is joining
            this.players.get('player1').name = playerName;
            // player 1 auto-joins team 1
            this.team1.addPlayer(this.players.get('player1'));

        } else if (this.players.get('size') === 3){
            // player 4 is joining

            this.players.get('player4').name = playerName;
            if (this.team1.length() === 2) {
                this.team2.addPlayer(this.players.get('player4'));
            } else if (this.team2.length() === 2) {
                this.team1.addPlayer(this.players.get('player4'));
            }
        } else {
            // player 2 or player 3 is joining
            var playerNum = null
            if (this.players.get('player2').name === null) {
                this.players.get('player2').name = playerName;
                playerNum = 2;
            } else {
                this.players.get('player3').name = playerName;
                playerNum = 3;
            }
            if (team === null) {
                // user did not specify a team to join
                if (this.team1.length() < 2) {
                    if (playerNum == 2) {
                        this.team1.addPlayer(this.players.get('player2'));
                    } else {
                        this.team1.addPlayer(this.players.get('player3'));
                    }
                } else {
                    if (playerNum == 2) {
                        this.team2.addPlayer(this.players.get('player2'));
                    } else {
                        this.team2.addPlayer(this.players.get('player3'));
                    }
                }
            } else {
                // user requests to join either team 1 or 2
                if (team === 1) {
                    if (this.team1.length() >= 2) {
                        console.log('cannot join team 1 as it is full');
                        return;
                    }
                    if (playerNum === 2) {
                        this.team1.addPlayer(this.players.get('player2'));
                    } else {
                        this.team1.addPlayer(this.players.get('player3'));
                    }
                } else if (team === 2) {
                    if (this.team2.length() >= 2) {
                        console.log('cannot join team 2 as it is full');
                        return;
                    }
                    if (playerNum === 2) {
                        this.team2.addPlayer(this.players.get('player2'));
                    } else {
                        this.team2.addPlayer(this.players.get('player3'));
                    }
                } else {
                    console.log('invalid team: ' + String(team));
                    return;
                }
            }
        }
        this.players.set('size', this.players.get('size') + 1);
        console.log('new player added: ' + playerName);
    }

}

exports.Game = Game;