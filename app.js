const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
let score = 0;

// Select the score element
const scoreDisplay = document.getElementById("score");

const COLORS = [
    "red", "blue", "green", "orange", "purple",
    "red", "blue", "green", "orange", "purple"
];

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

let shuffledColors = shuffle(COLORS);

// Create divs for each color and add event listener
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}

// Update the score and reflect the change on the page
function updateScore(points) {
    score += points;
    scoreDisplay.innerText = `Score: ${score}`;  // Ensure score is updated in the score display
}

function handleCardClick(e) {
    if (noClicking) return;
    if (e.target.classList.contains("flipped")) return;

    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];
    updateScore(1); // Add 1 point per click

    if (!card1 || !card2) {
        currentCard.classList.add("flipped");
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2) {
        noClicking = true;
        let gif1 = card1.className;
        let gif2 = card2.className;

        if (gif1 === gif2) {
            cardsFlipped += 2;
            updateScore(10); // Add 10 points for a correct match
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);
            card1 = null;
            card2 = null;
            noClicking = false;
        } else {
            setTimeout(function () {
                card1.style.backgroundColor = "";
                card2.style.backgroundColor = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                updateScore(-5); // Subtract 5 points for an incorrect match
                card1 = null;
                card2 = null;
                noClicking = false;
            }, 1000);
        }
    }

    // Check if the game is over
    if (cardsFlipped === COLORS.length) {
        setTimeout(() => alert(`Game over! Your final score is: ${score}`), 500);
    }
}

createDivsForColors(shuffledColors);