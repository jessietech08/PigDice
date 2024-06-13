function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    var range = maxValue - minValue + 1;
    random = random * range;
    random = Math.floor(random) + minValue;
    return random;
}
function changePlayers() {
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (currentPlayerName == player1Name) {
        document.getElementById("current").innerText = player2Name;
    }
    else {
        document.getElementById("current").innerText = player1Name;
    }
}
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    document.getElementById("score1").innerText = '0';
    document.getElementById("score2").innerText = '0';
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (!player1Name || !player2Name) {
        alert("Both players must enter a name");
    }
    document.getElementById("turn").classList.add("open");
    document.getElementById("total").value = "0";
    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");
    changePlayers();
}
function rollDie() {
    let currTotal = parseInt(document.getElementById("total").value);
}
function holdDie() {
    changePlayers();
}
