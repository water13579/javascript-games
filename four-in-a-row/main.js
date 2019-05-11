'use strict';

function createCells() {
	for (var row = 0; row < 6; row++) {
		for (var col = 0; col < 7; col++) {
			let newCell = document.createElement('div')
			newCell.classList.add('cell')
			newCell.style.background = 'white'
			newCell.setAttribute('id', `${row * 7 + col}`)
			document.getElementById('board').appendChild(newCell)
		}
	}
}

var turn = 0

function makeMove(event, dropList) {
	var color
	if (turn%2) 
		color = 'red'
	else
		color = 'yellow'

	for (var area  = 0; area < 7; area++) {
		console.log(dropList[0])
		console.log(dropList[area].left < event.clientX && dropList[area].right > event.clientX)
		if (dropList[area].left < event.clientX && dropList[area].right > event.clientX) {

			putLowest(area, color)
			turn++
		}
	}

	// if (event.target.style.background === 'white') {
	// 	putLowest(event, color)
	// 	turn++
	// }

	gameOver()
}


function putLowest(area, color) {
	var cells = document.getElementsByClassName('cell') 
	var num = area 

	for (var i = 41; i >= 0; i -= 7) {
		if (cells[i-6+num].style.background === 'white') {
			cells[i-6+num].style.background = color
			break
		}
	}
	
}


function gameOver() {
	let cells = document.getElementsByClassName('cell')

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 4; j++) {
			if (cells[j + 7*i].style.background === cells[j+1 + 7*i].style.background && 
				cells[j + 7*i].style.background === cells[j+2 + 7*i].style.background &&
				cells[j + 7*i].style.background === cells[j+3 + 7*i].style.background &&
				cells[j + 7*i].style.background !== 'white') {
				// console.log(cells[j + 7*i].style.background)
				setTimeout(1)
				var newChild = document.createElement('div')
				newChild.classList.add('hrLine')
				cells[j + 7*i].appendChild(newChild)
				alert(`${cells[j + 7*i].style.background} is winning!`)

			}
		}
	}

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 7; j++) {
			if (cells[j + 7*i].style.background === cells[j + 7*(i+1)].style.background && 
				cells[j + 7*i].style.background === cells[j + 7*(i+2)].style.background &&
				cells[j + 7*i].style.background === cells[j + 7*(i+3)].style.background &&
				cells[j + 7*i].style.background !== 'white') {
				setTimeout(10)
				var newChild = document.createElement('div')
				newChild.classList.add('vrLine')
				cells[j + 7*i].appendChild(newChild)
				alert(`${cells[j + 7*i].style.background} is winning!`)
			}
		}
	} 

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 4; j++) {
			// console.log(`${j + 7*i} ` + `${j+1 + 7*(i+1)} ` + `${j+2 + 7*(i+2)} ` + `${j+3 + 7*(i+3)}`)
			if (cells[j + 7*i].style.background === cells[j+1 + 7*(i+1)].style.background && 
				cells[j + 7*i].style.background === cells[j+2 + 7*(i+2)].style.background &&
				cells[j + 7*i].style.background === cells[j+3 + 7*(i+3)].style.background &&
				cells[j + 7*i].style.background !== 'white') {
				var newChild = document.createElement('div')
				newChild.classList.add('slantLine')
				cells[j + 7*i].appendChild(newChild)
				// console.log(cells[j + 7*i].style.background)
				setTimeout(100)
				alert(`${cells[j + 7*i].style.background} wins!`)

			}
		}
	}

	for (var i = 0; i < 3; i++) {
		for (var j = 3; j < 7; j++) {
			// console.log(`${j + 7*i} ` + `${j+1 + 7*(i+1)} ` + `${j+2 + 7*(i+2)} ` + `${j+3 + 7*(i+3)}`)
			if (cells[j + 7*i].style.background === cells[j-1 + 7*(i+1)].style.background && 
				cells[j + 7*i].style.background === cells[j-2 + 7*(i+2)].style.background &&
				cells[j + 7*i].style.background === cells[j-3 + 7*(i+3)].style.background &&
				cells[j + 7*i].style.background !== 'white') {
				// console.log(cells[j + 7*i].style.background)
				var newChild = document.createElement('div')
				newChild.classList.add('slantLineUp')
				cells[j + 7*i].appendChild(newChild)
				setTimeout(100)
				alert(`${cells[j + 7*i].style.background} wins!`)

			}
		}
	}

}


var dropList = []

window.onload = function () {
	createCells()
	var cells = document.getElementsByClassName('cell')
	for (var i = 0; i < 7; i++) {
		var box = cells[i].getBoundingClientRect()
		dropList.push({right: box.right, left: box.left})
	}
	var coin = document.getElementById("coin")
	coin.style.left = '50%'
	var borderLeft, borderRight
	var x, y 
	var color
	color = (turn%2) ? 'red' : 'yellow'
	document.getElementById('coin').style.background = color
	window.addEventListener('mousemove', function(event) {
		let board = document.getElementById('board').getBoundingClientRect()
		borderLeft = board.left
		borderRight = board.right 

		x = event.clientX

		if (typeof x !== 'undefined' && x < borderRight - 20 && x > borderLeft) {
			coin.style.left = x - 35 + 'px' 
		}
	}, false)
	window.addEventListener('click', function(event) {
		dropList = []
		for (var i = 0; i < 7; i++) {
			var box = cells[i].getBoundingClientRect()
			dropList.push({right: box.right, left: box.left})
		}
		makeMove(event, dropList)
		color = (turn%2) ? 'red' : 'yellow'
		document.getElementById('coin').style.background = color
	})
}
