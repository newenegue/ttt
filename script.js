//---Initialize global variables---
// player toggle
var p = 0;
// p0 is always user
var p0 = new Array();
var p1 = new Array();

var pNum = 2;

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

function clickCell(id) {
	// display player selection
	if(document.getElementById(id).classList.contains('p0') || document.getElementById(id).classList.contains('p1')){
		alert('Not a valid move');
	}
	else
	{
		// single player
		if(pNum == 1){
			// add class to html div
			document.getElementById(id).className += " p0";

			// add to p0 array
			p0.push(parseInt(id,10));

			// demote cell rank
			cellRank[id] -= 99;
		}
		// two player
		else if(pNum == 2) {
			if(p == 0) {
				// add class to html div
				document.getElementById(id).className += " p0";

				// add to p0 array
				p0.push(parseInt(id,10));

				// switch user
				p = 1;
			}
			else {
				// add class to html div
				document.getElementById(id).className += " p1";

				// add to p1 array
				p1.push(parseInt(id,10));

				// switch user
				p = 0;
			}
			// check winning combinations
			if(p0.length >= 3 || p1.length >= 3){
				p0.sort();
				p1.sort();
				for(i=0; i<winningCombos.length; i++) {
					// check if p0 wins
					if(p0[0] == winningCombos[i][0]) {
						if(p0[1] == winningCombos[i][1]) {
							if(p0[2] == winningCombos[i][2]) {
								alert('p0 wins');
							}
							else {
								// A.I. should pick winningCombos[i][2]
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
		}
	}
}

