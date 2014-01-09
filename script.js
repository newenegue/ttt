//---Initialize global variables---
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

function switchUser(player) {
	if (player == 0) {
		p = 1;
	}
	else if (player == 1) {
		p = 0;
	}
}

function demoteCell(cell_id) {
	cellRank[cell_id] -= 99;
}

function checkCell(cell_id) {
	if(document.getElementById(cell_id).classList.contains('p0') || document.getElementById(cell_id).classList.contains('p1')){
		return false;
	}
	else {
		return true;
	}
}

function checkWinner() {
	for(i=0; i<winningCombos.length; i++) {
		// check if p0 wins
		if(p0[0] == winningCombos[i][0]) {
			if(p0[1] == winningCombos[i][1]) {
				if(p0[2] == winningCombos[i][2]) {
					alert('p0 wins');
				}
			}
		}
		// check if p1 wins
		if(p1[0] == winningCombos[i][0]) {
			if(p1[1] == winningCombos[i][1]) {
				if(p1[2] == winningCombos[i][2]) {
					alert('p1 wins');
				}
			}
		}
	}
}

function clickCell(id) {
	// display player selection
	if(checkCell(id) == true) {
		// single player
		if(pNum == 1){
			markCell(p, id);
			demoteCell(id);
			var aiCell = cellRank.indexOf(Math.max.apply(Math, cellRank));
			markCell(1, aiCell);
			demoteCell(aiCell);
			p0.sort();
			p1.sort();
			checkWinner();
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
				checkWinner();
				// checkWinner(p1);
			}
		}
	}
	else {
		alert("Invalid choice")
	}
}

