// variables for the types of games
var playGame, simulatedGame;

class Game {
	constructor() {
		this.qtyPlayers = 6;
		this.gameMode = 'play';
		
	}

	simulateTurn() {
		this.players = [];
		this.center = 0;
		this.currentPlayer = 0;
		for(var i = 0; i < this.qtyPlayers; i++) {
			this.players.push(3)
		}

		while(this.center < ((this.players.length * 3) - 1)) {
			this.playerTurn();
		}
		
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

// <button id = "restart-play-game">Restart</button>

// 			<button id = "start-play-game">Start</button>

// 			<label>Number of players</label>
// 			<input type="number" name="number-player" value="6" id ="play-number-players" min="0">

// 			<button class="roll-dice">Roll Dice</button>

class PlayGame extends Game {
	constructor() {
		super();
		// add event listeners;
		this.addEventListeners();
		this.numberPlayers = document.getElementById("play-number-players").value;
		this.playerData = [];
	}

	addEventListeners() {
		let self = this;
		let numberPlayers = document.getElementById("play-number-players");
		let restart = document.getElementById("restart-play-game");
		let start = document.getElementById("start-play-game");
		let roll = document.getElementById("play-roll-dice");

		numberPlayers.addEventListener("change", function(e) {
			self.numberPlayers = e.target.value;
			self.start();

		})

		// restart.addEventListener("click", function(e) {
		// 	self.start();
		// })

		start.addEventListener("click", function(e) {
			self.start();
		})

		roll.addEventListener("click", function(e) {
			self.roll();
		})
	}

	restart() {
		this.start();
	}

	start() {
		this.createPlayers(this.numberPlayers);
		this.createPlayerData();
	}

	roll() {
		let roll = this.rollDice(3)
		console.log("rolled", roll)
	}

	createPlayerData = () => {
		let players = document.querySelectorAll(".player");

		for (var i = 0; i < players.length; i++) {
			this.playerData.push({
				name: "player", i,
				chips: 3
			})
		}

		for (var i = 0; i < players.length; i++) {
			let player = players[i];
			// get child elements to edit.
			let name = player.querySelector(".name");
			let dice = player.querySelector(".dice");
			let score = player.querySelector(".score");
			let chips = player.querySelector(".chips");

			name.innerHTML = this.playerData[i].name;
			chips.innerHTML = this.playerData[i].chips;
			chips.setAttribute("data-chips", this.playerData[i].chips)
		}
	}

	// create html structure for players
	createPlayers(qty) {
		let players = document.querySelector(".players");
		players.innerHTML = "";
		for(let i = 0; i < qty; i++) {
			let player = document.createElement("div");
			player.classList.add("player");
			// create child divs
			let dice = document.createElement("div");
			let name = document.createElement("div");
			let score = document.createElement("div");
			let chips = document.createElement("div");
			// Add classes
			dice.classList.add("dice");
			name.classList.add("name");
			score.classList.add("score");
			chips.classList.add("chips");

			// Add elements into player div;
			player.appendChild(name);
			player.appendChild(dice);
			player.appendChild(score);
			player.appendChild(chips);

		
			players.appendChild(player);
		}
	}
}

class SimulatedGame extends Game {
	constructor() {
		// add event listeners.
		super();
	}

	startSimulatedGame() {
		var winsArray = new Array(numberPlayers);
		for(var i = 0; i < winsArray.length; i++) {
			winsArray[i] = 0;
		}

		for(var i = 0; i < numberGames; i++) {
			let finalData = new Game(numberPlayers);
			winner = finalData.simulateGame();
			winsArray[winner] = winsArray[winner] + 1
		}

		// TODO: Find out percentages
		console.log(winsArray)
	}
}

function init() {
	// EVENT LISTENERS
	// controlls game mode toggle
	eventListeners();

	// initialize the two games
	playGame = new PlayGame();
	simulatedGame = new SimulatedGame();
	
}

function eventListeners() {
		let self = this;
		let toggles = document.querySelectorAll(".game-toggle");

		let playGame = document.querySelector(".playGame");
		let simulatedGame = document.querySelector(".simulatedGame");

		for (var i = toggles.length - 1; i >= 0; i--) {
			toggles[i].addEventListener("click", function(e) {
				if(e.target.classList.contains("toggle-play")) {
					// play game
					simulatedGame.style.display = "none";
					playGame.style.display = "block";
					// self.gameMode = "play";
					// self.startPlaying()

				} else if (e.target.classList.contains("toggle-simulate")) {
					// simulate games
					simulatedGame.style.display = "block";
					playGame.style.display = "none";
					// self.gameMode = "simulate";
					// self.startSimulatedGame();
				}
			})
		}
	}


init();
