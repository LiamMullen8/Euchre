class Team {
    constructor(which) {
        this.which = which;
        this.players = new Array();
        this.tricks = 0;
        this.points = 0;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    addPoints(points) {
        this.points += points;
    }

}
exports.Team = Team;