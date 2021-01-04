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

    length() {
        return this.players.length;
    }

}
exports.Team = Team;