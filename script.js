//--------------------------------------------------
//---Initialize global variables---
//--------------------------------------------------
// player toggle
var p = 0;
// p0 is always user
var p0 = new Array();
var p1 = new Array();

// number of player toggle
var pNum = 1;

// all possible winning combinations
winningCombos = new Array(
   new Array(0, 1, 2),
   new Array(3, 4, 5),
   new Array(6, 7, 8),
   new Array(0, 3, 6),
   new Array(1, 4, 7),
   new Array(2, 5, 8),
   new Array(0, 4, 8),
   new Array(2, 4, 6)
  ); 

// cell ranking for A.I.
// higher is better
cellRank = [3,2,3,2,4,2,3,2,3];


//--------------------------------------------------
// markCell()
// change the color of a cell based on the player
// adds a new class to the cell div
//--------------------------------------------------
function markCell(player, cell_id) {
	if(player == 0){
		// add class to html div
		document.getElementById(cell_id).className += " p0";

		// add to p0 array
		p0.push(parseInt(cell_id,10));
	}
	else if(player == 1) {
		// add class to html div
		document.getElementById(cell_id).className += " p1";

		// add to p1 array
		p1.push(parseInt(cell_id,10));
	}
}

//--------------------------------------------------
// switchUser()
// switch user turn
//--------------------------------------------------
function switchUser(player) {
	if (player == 0) {
		p = 1;
	}
	else if (player == 1) {
		p = 0;
	}
}

//--------------------------------------------------
// demoteCell()
// AI cell rank demotion
// for selected cell
//--------------------------------------------------
function demoteCell(cell_id) {
	cellRank[cell_id] -= 99;
}

//--------------------------------------------------
// emptyCell()
// check if cell is already selected by a player
//--------------------------------------------------
function emptyCell(cell_id) {
	if(document.getElementById(cell_id).classList.contains('p0') || document.getElementById(cell_id).classList.contains('p1')){
		return false;
	}
	else {
		return true;
	}
}

//--------------------------------------------------
// checkWinner()
// check for winning conditions
//--------------------------------------------------
function checkWinner() {
	var winner = false;
	for(i=0; i<winningCombos.length; i++) {
		// check if p0 wins
		if(p0[0] == winningCombos[i][0]) {
			if(p0[1] == winningCombos[i][1]) {
				if(p0[2] == winningCombos[i][2]) {
					alert('p0 wins');
					winner = true;
					return winner;
				}
			}
		}
		// check if p1 wins
		if(p1[0] == winningCombos[i][0]) {
			if(p1[1] == winningCombos[i][1]) {
				if(p1[2] == winningCombos[i][2]) {
					alert('p1 wins');
					winner = true;
					return winner;
				}
			}
		}
	}
}

//--------------------------------------------------
// resetAll()
// Re-initialize and reset board
//--------------------------------------------------
function resetAll() {
	for(i = 0; i <= 8; i++){
		document.getElementById(i).className = "cell";
	}
	cellRank = [3,2,3,2,4,2,3,2,3];
	p0 = new Array();
	p1 = new Array();
	p = 0;
}

//--------------------------------------------------
// clickCell()
// on click of cell
//--------------------------------------------------
function clickCell(id) {
	// display player selection
	if(emptyCell(id) == true) {
		// single player
		if(pNum == 1){
			markCell(p, id);
			demoteCell(id);
			var aiCell = cellRank.indexOf(Math.max.apply(Math, cellRank));
			markCell(1, aiCell);
			demoteCell(aiCell);
			
			p0.sort();
			p1.sort();
			if(checkWinner()) {
				resetAll();
			}
		}
		// two player
		else if(pNum == 2) {
			if(p == 0) {
				markCell(p, id);
				switchUser(p);
			}
			else {
				markCell(p, id);
				switchUser(p);
			}
			if(p0.length >= 3 || p1.length >= 3){
				p0.sort();
				p1.sort();
				if(checkWinner()) {
					resetAll();
				}
			}
		}
	}
	else {
		alert("Invalid choice")
	}
}

