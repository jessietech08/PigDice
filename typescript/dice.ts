function generateRandomValue(minValue:number, maxValue:number):number{
    // sets random to floating point between 0 and 1
    var random = Math.random();
    
    // sets range of 6
    var range = maxValue - minValue + 1;
    random = random * range;
    random = Math.floor(random) + minValue;

    return random;
}


function changePlayers():void{
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName == player1Name) {
        document.getElementById("current").innerText = player2Name;
    }
    else {
        document.getElementById("current").innerText = player1Name;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    (<HTMLButtonElement>document.getElementById("roll")).onclick = rollDie;

    (<HTMLButtonElement>document.getElementById("hold")).onclick = holdDie;
}

function createNewGame(){
    //set player 1 and player 2 scores to 0
    document.getElementById("score1").innerText = '0';
    document.getElementById("score2").innerText = '0';

    //verify each player has a name
    let player1Name = (document.getElementById("player1") as HTMLInputElement).value;
    let player2Name = (document.getElementById("player2") as HTMLInputElement).value;

    //if both players don't have a name display error
    if (!player1Name || !player2Name) {
        alert("Both players must enter a name");
    }

    //if both players do have a name start the game!
    (<HTMLElement>document.getElementById("turn")).classList.add("open");
    (<HTMLInputElement>document.getElementById("total")).value = "0";
    //lock in player names and then change players
    (<HTMLInputElement>document.getElementById("player1")).setAttribute("disabled", "disabled");
    (<HTMLInputElement>document.getElementById("player2")).setAttribute("disabled", "disabled");
    changePlayers();
}

function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    // roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let roll = generateRandomValue(1, 6);

    // if the roll is 1
    if (roll == 1) {
        //  change players
        changePlayers();
        //  set current total to 0
        currTotal = 0;
    }
    // if the roll is greater than 1
    //  add roll value to current total
    else {
        currTotal += roll;
    }
    
    // set the die roll to value player rolled
    (document.getElementById("die") as HTMLInputElement).value = roll.toString();
    // display current total on form
    (document.getElementById("total") as HTMLInputElement).value = currTotal.toString();
}

function holdDie():void{
    let winner:number = 100;
    // get the current turn total
    let currTotal = parseInt((document.getElementById("total") as HTMLInputElement).value) || 0;
    // determine who the current player is
    let currPlayer = document.getElementById("current").innerText;
    let player1Name = (document.getElementById("player1") as HTMLInputElement).value;
    let player2Name = (document.getElementById("player2") as HTMLInputElement).value;

    let player1Score = parseInt((document.getElementById("score1") as HTMLInputElement).value) || 0;
    let player2Score = parseInt((document.getElementById("score2") as HTMLInputElement).value) || 0;

    // add the current turn total to the player's total score
    if (currPlayer == player1Name) {
        player1Score += currTotal;
        (document.getElementById("score1") as HTMLInputElement).value = (player1Score + currTotal).toString();
        if (player1Score >= winner) {
            alert("PLAYER " + player1Name + " WON GGS!");
        }
    }
    else {
        player2Score += currTotal;
        (document.getElementById("score2") as HTMLInputElement).value = (player2Score + currTotal).toString();
        if (player2Score >= winner) {
            alert("PLAYER " + player2Name + " WON GGS!");
        }
    }
    
    // reset the turn total to 0
    (document.getElementById("total") as HTMLInputElement).value = '0';

    // change players
    changePlayers();
}