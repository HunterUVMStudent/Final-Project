const form = document.getElementById("playerForm");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let name = document.getElementById("name").value.trim();

        if (name.length < 2) {
            alert("Name must be at least 2 characters");
            return;
        }

        localStorage.setItem("playerName", name);
        localStorage.setItem("score", 0);
        window.location.href = "games.html";
    });
}


let player = localStorage.getItem("playerName") || "Player";
let score = Number(localStorage.getItem("score")) || 0;


function updateScore(points) {
    score += points;
    localStorage.setItem("score", score);

    if (document.getElementById("score")) {
        document.getElementById("score").innerText = score;
    }

    let high = localStorage.getItem("highScore") || 0;
    if (score > high) {
        localStorage.setItem("highScore", score);
    }

    if (document.getElementById("highScore")) {
        document.getElementById("highScore").innerText =
            localStorage.getItem("highScore");
    }
}


if (document.getElementById("score")) {
    document.getElementById("score").innerText = score;
    document.getElementById("highScore").innerText =
        localStorage.getItem("highScore") || 0;
}

// PROFILE PAGE
if (document.getElementById("playerNameDisplay")) {
    document.getElementById("playerNameDisplay").innerText = player;
    document.getElementById("totalScore").innerText = score;
}


function playRPS(choice) {
    const options = ["rock", "paper", "scissors"];
    const cpu = options[Math.floor(Math.random() * 3)];

    if (
        (choice === "rock" && cpu === "scissors") ||
        (choice === "paper" && cpu === "rock") ||
        (choice === "scissors" && cpu === "paper")
    ) {
        updateScore(1);
        document.getElementById("rpsResult").innerText = "You Win!";
    } else {
        document.getElementById("rpsResult").innerText = "Try Again!";
    }
}


let secret = Math.floor(Math.random() * 10) + 1;

function checkGuess() {
    let guess = Number(document.getElementById("guessInput").value);

    if (guess === secret) {
        updateScore(2);
        document.getElementById("guessResult").innerText = "Correct!";
        secret = Math.floor(Math.random() * 10) + 1;
    } else {
        document.getElementById("guessResult").innerText = "Wrong!";
    }
}


let cards = [];
let flipped = [];

function initMemory() {
    const symbols = ["🍎", "🍌", "🍇", "🍒"];
    cards = [...symbols, ...symbols].sort(() => 0.5 - Math.random());

    const grid = document.getElementById("grid");
    if (!grid) return;

    grid.innerHTML = "";
    flipped = [];

    cards.forEach((symbol) => {
        const div = document.createElement("div");
        div.className = "card";

        div.onclick = () => flipCard(div, symbol);
        grid.appendChild(div);
    });
}

function flipCard(card, symbol) {
    if (flipped.length < 2 && !card.innerText) {
        card.innerText = symbol;
        flipped.push({ card, symbol });

        if (flipped.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    if (flipped[0].symbol === flipped[1].symbol) {
        updateScore(3);
    } else {
        flipped.forEach(c => c.card.innerText = "");
    }
    flipped = [];
}

initMemory();