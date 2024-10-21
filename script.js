const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restart');

let cards = [
    '1', '1', '2', '2', '3', '3', '4', '4',
    '5', '5', '6', '6', '7', '7', '8', '8'
];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle cards and initialize the game board
function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = '';
    shuffleCards();
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.innerHTML = `
            <div class="front">${card}</div>
            <div class="back"></div>
        `;
        gameBoard.appendChild(cardElement);
        cardElement.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (flippedCards.length === 2) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === cards.length / 2) {
            setTimeout(() => alert('Congratulations! You found all pairs!'), 500);
        }

        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function restartGame() {
    matchedPairs = 0;
    flippedCards = [];
    createBoard();
}

restartButton.addEventListener('click', restartGame);

// Initialize the game on page load
createBoard();
