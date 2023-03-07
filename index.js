let messageEl = null
let playerCardsEl = null
let dealerCardsEl = null
let playerPointsEl = null
let dealerPointsEl = null

let startBtn = null;
let newCardBtn = null;
let standBtn = null;

let cardDeck = [];
let playerCardDeck = [];
let dealerCardDeck = [];

let hasChance = false;
let playerWins = false;

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
    newCardBtn.addEventListener("click", drawNewCard)
    standBtn.addEventListener("click", stand)

}

function drawCard() {

    const randomNum = Math.floor(Math.random() * 13) + 1
    if (randomNum > 10) {
        return 10
    } else if (randomNum == 1) {
        return 11
    } else {
        return randomNum
    }

}

function startGame() {

    cardDeck = [drawCard(), drawCard(), drawCard(), drawCard()];
    playerCardDeck = [cardDeck[0], cardDeck[2]]
    dealerCardDeck = [cardDeck[1], cardDeck[3]]
    hasChance = true;
    renderGame()

}

function drawNewCard() {

    if (hasChance) {
        cardDeck.push(drawCard(), drawCard());
        playerCardDeck.push(cardDeck[4]);
        dealerCardDeck.push(cardDeck[5]);
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

    playerCardsEl.textContent = playerCardDeck.join(" ")
    dealerCardsEl.textContent = dealerCardDeck[0] + " ?"

    for (let i = 0; i < cardDeck.length; i++) {
        if (i % 2 == 0) {
            playerTotalPoints += cardDeck[i];
        } else {
            dealerTotalPoints += cardDeck[i];
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

    playerCardDeck = [];
    dealerCardDeck = [];
    cardDeck = [];

    hasChance = false;
    isWinner = false;

    playerCardsEl.textContent = ""
    dealerCardsEl.textContent = ""
    playerPointsEl.textContent = ""
    dealerPointsEl.textContent = ""
    messageEl.textContent = "Want to play a round ? "

}

document.addEventListener('DOMContentLoaded', init());