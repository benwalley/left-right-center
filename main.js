class Game {
	constructor(qtyPlayers) {
		this.qtyPlayers = qtyPlayers;
	}

	playGame() {
		this.players = [];
		this.center = 0;
		this.currentPlayer = 0;
		for(var i = 0; i < this.qtyPlayers; i++) {
			this.players.push(3)
		}

		// this.players[0] = 2;

		while(this.center < ((this.players.length * 3) - 1)) {
			this.playerTurn();
		}
			// when the game is over
			// console.log("hit final data", this.players);
			// console.log("player", this.getWinner(this.players), "won!")
			// finalData.push(players);
			return this.getWinner(this.players)
	}

	// nicely self contained function
	rollDice(qty) {
		// only roll up to 3 dice
		if(qty > 3 ) {
			qty = 3;
		}
		let finalRoll = [];
		for(var i = 0; i < qty; i++) {
			let roll = Math.ceil(Math.random() * 6);
			if( roll < 4 ) {
				finalRoll.push('pass');
			} else if (roll == 4) {
				// pass center
				finalRoll.push("center");
			} else if (roll == 5) {
				// pass center
				finalRoll.push("left");
			} else if (roll == 6) {
				// pass center
				finalRoll.push("right");
			}
		}

		return finalRoll;
	}

	passLeft() {
		this.players[this.currentPlayer] = this.players[this.currentPlayer] - 1;
		// if you're the first player
		if(this.currentPlayer == 0) {
			// pass to last player
			this.players[this.players.length - 1] = this.players[this.players.length - 1] + 1;
		} else {
			// otherwise pass to next lower player
			this.players[this.currentPlayer - 1] = this.players[this.currentPlayer -1] + 1;
		}
	}

	passRight() {
		this.players[this.currentPlayer] = this.players[this.currentPlayer] - 1;
		// if you're the last player
		if(this.currentPlayer == this.players.length - 1) {
			// pass to player 0
			this.players[0] = this.players[0] + 1;
		} else {
			// otherwise pass to next higher player
			this.players[this.currentPlayer + 1] = this.players[this.currentPlayer + 1] + 1
		}
	}

	playerTurn = () => {
		// if there is not only one chip left
		if(this.players[this.currentPlayer] != 0) {
			// roll the number of dice that is the value of your player
			var roll = this.rollDice(this.players[this.currentPlayer]);
			// for each of your dice
			for (var i = 0; i < roll.length; i++) {
				if(roll[i] === "center") {
					this.players[this.currentPlayer] = this.players[this.currentPlayer] - 1;
					this.center ++;
				} else if (roll[i] === "left") {
					this.passLeft();
				} else if (roll[i] === "right") {
					this.passRight();
				} // if it is pass, I don't need to do anything.
			}
		}

		// if you're the last player
		if(this.currentPlayer === this.players.length - 1) {
			this.currentPlayer = 0;
		} else {
			this.currentPlayer += 1;
		}
	}

	getWinner(gameData) {
		for(var i = 0; i < gameData.length; i++) {
			if(gameData[i] == 1) {
				return i;
			}
		}
	}
}

function init(numberGames, numberPlayers) {
	var winsArray = new Array(numberPlayers);
	for(var i = 0; i < winsArray.length; i++) {
		winsArray[i] = 0;
	}

	for(var i = 0; i < numberGames; i++) {
		let finalData = new Game(numberPlayers);
		winner = finalData.playGame();
		winsArray[winner] = winsArray[winner] + 1
	}

	// TODO: Find out percentages
	console.log(winsArray)
	
}


init(1000, 6);
