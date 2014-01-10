//--------------------------------------------------
// Initialize global variables
//--------------------------------------------------
// player toggle
var p = 0;

// player tracker
var p0 = [];
var p1 = [];

// number of players
var pNum = 0;

// all winning combinations
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
cellRank = [3,2,3,2,4,2,3,2,3];

//--------------------------------------------------
// initEvents()
// initialize mouse click event handler for divs
//--------------------------------------------------
function initEvents() {
	var cells = document.getElementsByClassName('cell');
	for (var i = 0; i < cells.length; i++) {
		cells[i].onclick=clickCell;
	}

}

//--------------------------------------------------
// resetAll()
// Re-initialize and reset board
//--------------------------------------------------
function resetAll() {
	p = 0;
	p0 = [];
	p1 = [];
	cellRank = [3,2,3,2,4,2,3,2,3];
	pNum = 0;
	for(i = 0; i <= 8; i++){
		document.getElementById(i).className = "cell";
	}
	return true;
}

//--------------------------------------------------
// checkPlayers()
// check radio buttons for number of players
//--------------------------------------------------
function checkPlayers(){
	var radio = document.getElementsByName('numPlayers');
	var rLength = radio.length;

	if(pNum === 0){
		for(var i = 0; i < rLength; i++){
			if(radio[i].checked){
				pNum = radio[i].value;
				return true;
			}
		}
	}
	return false;
}

//--------------------------------------------------
// emptyCell()
// check if cell is already selected
//--------------------------------------------------
function emptyCell() {
	if(this.classList.contains('p0') || this.classList.contains('p1')){
		return false;
	}
	else {
		return true;
	}
}

//--------------------------------------------------
// isFull()
// check if all cells have been played
//--------------------------------------------------
function isFull() {
	var totLength = p0.length + p1.length;
	if(totLength == 9){
		alert("Draw");
		resetAll();
		return true;
	}
	return false;
}

//--------------------------------------------------
// switchUser()
// switch user turn
//--------------------------------------------------
function switchUser() {
	p = p === 0 ? 1 : 0;
	return true;
}

//--------------------------------------------------
// demoteCell()
// AI cell rank demotion
//--------------------------------------------------
function demoteCell(cell_id) {
	cellRank[cell_id] -= 99;
	return true;
}

//--------------------------------------------------
// markCell()
// change the color of a cell based on the player
// adds a new class to the cell div
//--------------------------------------------------
function markCell(player, cell_id) {
	var selectCell = document.getElementById(cell_id);
	var cellId = parseInt(cell_id,10);
	if(player === 0){
		// add class to html div
		selectCell.className += " p0";

		// add to p0 array
		p0.push(cellId);
		return true;
	}
	else if(player == 1) {
		// add class to html div
		selectCell.className += " p1";

		// add to p1 array
		p1.push(cellId);
		return true;
	}
	return false;
}

//--------------------------------------------------
// checkWinner()
// check for winning conditions
//--------------------------------------------------
function checkWinner() {

	// for player 1 and AI cell selection
	var empty = [];
	var taken = [];
	var i,j,k;
	for(i = 0; i < winningCombos.length; i++){
		empty = [];
		taken = [];
		for(j = 0; j < winningCombos[i].length; j++){
			// taken and empty cell list
			if(p0.indexOf(winningCombos[i][j]) > -1){
				taken.push(winningCombos[i][j]);
			}
			else{
				empty.push(winningCombos[i][j]);
			}
		}
		// increase cellRank for AI
		if(taken.length == 2 && cellRank[empty[0]] > 0){
			cellRank[empty[0]] = 10;
		}
		else if(taken.length == 3){
			alert('p0 wins');
			return true;
		}
			
	}

	// player 2 or computer winning combo check
	for(i = 0; i < winningCombos.length; i++){
		for(k = 0; k < winningCombos[i].length; k++){
			if(p1.indexOf(winningCombos[i][k]) == -1){
				break;
			}
		}
		if(k == winningCombos[i].length){
			alert('p1 wins');
			return true;
		}
	}

	return false;
}

//--------------------------------------------------
// clickCell()
// on click of cell
//--------------------------------------------------
function clickCell() {
	
	var id = this.id;
	checkPlayers();
	
	if(emptyCell.call(this) === true) {
		// single player
		if(pNum == 1){
			markCell(p, id);
			demoteCell(id);
			if(checkWinner()) {
				resetAll();
			}
			else {
				// find max priority cell
				var aiCell = cellRank.indexOf(Math.max.apply(Math, cellRank));
				markCell(1, aiCell);
				demoteCell(aiCell);
				if(checkWinner()) {
					resetAll();
				}
			}
		}
		
		// two player
		else if(pNum == 2) {
			markCell(p, id);
			switchUser();
			if(p0.length >= 3 || p1.length >= 3){
				if(checkWinner()) {
					resetAll();
				}
			}
		}
		else{
			alert('Number of players not selected!');
		}
	}
	else {
		alert("Invalid choice");
	}
	isFull();
}


