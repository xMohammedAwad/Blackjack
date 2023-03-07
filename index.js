let messageEl = null
let playerCardsEl = null
let dealerCardsEl = null
let playerPointsEl = null
let dealerPointsEl = null

let startBtn = null;
let newCardBtn = null;
let standBtn = null;

let cardsArr = [];
let playerCardsArr = [];
let dealerCardsArr = [];

let hasChance = false;
let isWinner = false;

function getRandomCard() {
    let randomNum = Math.floor(Math.random() * 13) + 1
    if (randomNum > 10) {
        return 10
    } else if (randomNum == 1) {
        return 11
    } else {
        return randomNum
    }
}

function startGame() {
    cardsArr = [getRandomCard(), getRandomCard(), getRandomCard(), getRandomCard()];
    playerCardsArr = [cardsArr[0], cardsArr[2]]
    dealerCardsArr = [cardsArr[1], cardsArr[3]]
    hasChance = true;
    renderGame()
}

function addNewCard() {
    if (hasChance) {
        cardsArr.push(getRandomCard(), getRandomCard());
        playerCardsArr.push(cardsArr[4]);
        dealerCardsArr.push(cardsArr[5]);
        isWinner = true
        renderGame();
    }
}

function stand() {
    if (hasChance) {
        isWinner = true
        renderGame()
    }
}

function renderGame() {
    let playerTotalPoints = 0
    let dealerTotalPoints = 0

    playerCardsEl.textContent = playerCardsArr.join(" ")
    dealerCardsEl.textContent = dealerCardsArr[0] + " ?"

    for (let i = 0; i < cardsArr.length; i++) {
        if (i % 2 == 0) {
            playerTotalPoints += cardsArr[i];
        } else {
            dealerTotalPoints += cardsArr[i];
        }
        playerPointsEl.textContent = playerTotalPoints
        dealerPointsEl.textContent = "?"
    }

    if (isWinner || playerTotalPoints == 21 || dealerTotalPoints == 21) {
        checkWinner(playerTotalPoints, dealerTotalPoints)
    } else {
        messageEl.textContent = "Do you want to draw a new card?"
    }
}

function checkWinner(playerTotalPoints, dealerTotalPoints) {
    debugger
    if (playerTotalPoints > 21) {
        messageEl.textContent = "You Bust!"
        isWinner = true
    } else if (playerTotalPoints <= 21) {
        messageEl.textContent = "Do you want to draw a new card?"
        isWinner = false
        if (playerTotalPoints > dealerTotalPoints || dealerTotalPoints > 21) {
            messageEl.textContent = "Blackjack, You Win"
            isWinner = true
        } else if (playerTotalPoints < dealerTotalPoints && dealerTotalPoints < 21) {
            messageEl.textContent = "You Bust!, Game over"
            isWinner = true
        } else {
            messageEl.textContent = "You Bust!"
            isWinner = true
        }

    } else {
        messageEl.textContent = "Push , No one win"
        isWinner = true
    }
    if (isWinner) {
        dealerPointsEl.textContent = dealerTotalPoints

    }
}

function resetGame() {
    playerTotalPoints = 0
    dealerTotalPoints = 0

    playerCardsEl.textContent = ""
    dealerCardsEl.textContent = ""

    playerPointsEl.textContent = ""
    dealerPointsEl.textContent = ""

    messageEl.textContent = "Want to play a round ? "
    hasChance = false;
    isWinner = false;
}

function init() {
    messageEl = document.querySelector(".message");

    playerCardsEl = document.querySelector(".player-cards");
    dealerCardsEl = document.querySelector(".dealer-cards");

    playerPointsEl = document.querySelector(".player-points");
    dealerPointsEl = document.querySelector(".dealer-points");

    newGameBtn = document.getElementById("new-game-btn");
    resetGameBtn = document.getElementById("reset-game-btn");

    newCardBtn = document.getElementById("new-card-btn");
    standBtn = document.getElementById("stand-btn")

    newGameBtn.addEventListener("click", startGame)
    resetGameBtn.addEventListener("click", resetGame)

    newCardBtn.addEventListener("click", addNewCard)
    standBtn.addEventListener("click", stand)

}
document.addEventListener('DOMContentLoaded', init());