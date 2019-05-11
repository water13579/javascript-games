'use strict';

var clickSound = new Audio('click.wav')
var moveSound = new Audio('move.wav')
var congratsSound = new Audio('congrats.mp3')

function playClickSound() {
	clickSound.currentTime = 0
	clickSound.play()
}
function playMoveSound() {
	moveSound.currentTime = 0
	moveSound.play()
}
function playCongratsSound() {
	congratsSound.currentTime = 0
	congratsSound.play()
}

function displayMenu() {
	// document.getElementsByClassName('board')[0].hidden = true;

}
var slideUpMenu = () => {

	setTimeout(() => {document.getElementsByClassName('startScreen')[0].style.animation = 'slideUp 0.3s forwards'}, 10000)
}
var displayGame = () => {
	document.getElementsByClassName('startScreen')[0].hidden = true
	document.getElementsByClassName('board')[0].style.display = "block"
	document.getElementsByClassName('board')[0].style.animation = 'fadeIn 0.5s both'
}

function fadeMenu() {
	slideUpMenu()
	setTimeout(displayGame, 300)
}




var cells = document.getElementsByClassName('cell')

var turn = 0
var arr = new Array(9)
var cellsLeft = 9

document.addEventListener('click', function(event) {
	for (let cell = 0; cell < 9; cell++) {
		if (event.target === cells[cell] && !event.target.innerHTML) {
			playMoveSound()
			cells[cell].innerHTML = turn%2 ? 'O' : 'X'
			arr[cell] = turn%2 ? 'O' : 'X'
			turn++
			cellsLeft--
			var winningPositions = gameOver('X')
			if (winningPositions) {
				playCongratsSound()
				showWinner(winningPositions)
				break
			}
			var winningPositions = gameOver('O')
			if (winningPositions) {
				playCongratsSound()
				showWinner(winningPositions)
				break
			}
		}
	}
})

var winningCombinations = [
	[cells[0], cells[1], cells[2]],
	[cells[3], cells[4], cells[5]],
	[cells[6], cells[7], cells[8]],
	[cells[0], cells[3], cells[6]],
	[cells[1], cells[4], cells[7]],
	[cells[2], cells[5], cells[8]],
	[cells[0], cells[4], cells[8]],
	[cells[2], cells[4], cells[6]]
]

function gameOver(player) {
	var compare3 = (arr, idx, player) => {
		return arr[idx][0].innerHTML === arr[idx][1].innerHTML && 
		arr[idx][0].innerHTML === arr[idx][2].innerHTML &&
		arr[idx][0].innerHTML === player
		}	

	console.log(winningCombinations[0])
	for (var i = 0; i < winningCombinations.length; i++) {
		if (compare3(winningCombinations, i, player)) {
			return winningCombinations[i]
		}
	}
	
	for (var num of arr) {
		console.log(num)
		if (!num)
			return false
	}
	return 'TIE'
}

function showWinner(places) {
	for (var place of places) {
		console.log(typeof place)
		place.style.color = 'red'
	}
}


function resetGame() {
	for (var cell of cells) {
		cell.innerHTML = '';
	}
}




