// RESET GAME - WHEN DOES GAME STOP AND RESET, BUTTONS FOR DO YOU WANT TO PLAY AGAIN
// UPDATE PLAYER/DEALER SCORE 





class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    getSuit() {
        return console.log(this.suit);
    }
    getCardValue() {
        return this.value;
    }
    stringifyCard() {
        return this.value + "-" + this.suit[0]; //8-C
    }
}




// FULL DECK
class Deck {
    constructor() {
        this.cardArray = [];
    }

    assembleDeck() {
        const suits = ['CLUBS', 'HEARTS', 'DIAMONDS', 'SPADES'];
        const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                this.cardArray.push(new Card(suits[j], values[i]))
            }
        }
    }

    shuffleDeck() {
        let deckArray = this.cardArray;
        for (var i = deckArray.length - 1; i > 0; i--) {
            let randIdx = Math.floor(Math.random() * (i + 1));
            let temp = deckArray[i];
            deckArray[i] = deckArray[randIdx];
            deckArray[randIdx] = temp;
        }
        this.cardArray = deckArray;
    }
    drawCard() {
        return this.cardArray.pop();
    }
}


class Player {
    constructor(player, handArray = []) {
        this.player = player;
        this.handArray = handArray;
        this.score = 0;
    }
    recieveCard(newCard) {
        let newCardImg = document.createElement("img");
        newCardImg.src = "./cards/" + newCard.stringifyCard() + ".png"
        newCardImg.className = 'cards';
        document.getElementsByClassName("player-container")[0].appendChild(newCardImg);
        this.handArray.push(newCard);
        this.updateScore(newCard);
    }
    updateScore(card) {
        if (card.value === 'A') {
            this.score += 11;
            if (this.score > 21) {
                this.score -= 10;
            }
        } else if (typeof card.value === 'string') {
            this.score += 10;
        } else {
            this.score += card.value;
        }

    }
    getScore() {
        return this.score;
    }

    // split up, extra methods, blackjack
    winOrLose() {
        console.log('testing')
        if (this.getScore() <= 20) {
            console.log('you can hit or stay, no popup')
        } else if (this.getScore() === 21) {
            console.log('BLACKJACK pop up, reset game')
        } else if (this.getScore() > 21) {
            console.log('bust muthafucka - reset game')
        }
    }
    gameOver() {
        let gameOver = document.getElementsByClassName('game-over')
        gameOver.style.display = "block";
        reload();
    }


}




class Dealer extends Player {
    constructor(player, handArray = []) {
        super(player, handArray = []);
    }

    recieveCard(newCard) {

        let newCardImg = document.createElement("img");
        newCardImg.src = "./cards/" + newCard.stringifyCard() + ".png";
        newCardImg.className = 'd-cards';
        document.getElementsByClassName("dealer-container")[0].appendChild(newCardImg);
        this.handArray.push(newCard);
        this.updateScore(newCard);

    }

    dealerTurn() {
        console.log('dealer taking turn')
        while (this.getScore() <= 17) {
            this.recieveCard(oneDeck.drawCard());
        }
        this.winOrLose();
        this.revealHiddenCard();
    }
    
    //revealing multiple same cards for dealer - calling of cards the same class, reveal card class=hidden-card
    revealHiddenCard() {
        console.log(this.handArray)
        let hiddenCardImg = document.getElementsByClassName('hidden-card')[0]
        console.log(hiddenCardImg)
        hiddenCardImg.src = "./cards/" + this.handArray[0].stringifyCard() + ".png"
        
        hiddenCardImg.className = 'cards';
    
        
    }

    recieveHiddenCard(newCard) {

        let newCardImg = document.createElement("img");

        newCardImg.src = "./cards/BACK.png";

        newCardImg.className = 'hidden-card';
        document.getElementsByClassName("dealer-container")[0].appendChild(newCardImg);
        this.handArray.push(newCard);
    }
    }

//create deck
let oneDeck = new Deck();

//storing the play button and assigning an event listener
let play = document.getElementById('press-play')
play.addEventListener('click', playGame)


// DISABLE MESSAGE POP UPS 
// let gameOver = document.getElementsByClassName('game-over')
// gameOver.style.display = "none"; 

// let dealerWins = document.getElementsByClassName('dealer-wins')
// gameOver.style.display = "none"; 

// let youWin = document.getElementsByClassName('You Win!')
// gameOver.style.display = "none"; 

// let youLose = document.getElementsByClassName('You Lose!')
// gameOver.style.display = "none"; 


function playGame() {
    // let dealer = new Player('Dealer');
    let dealer = new Dealer('Dealer');

    let playerBob = new Player('Bob');


    let play = document.getElementById('press-play')
    play.style.display = "none"; // works
    oneDeck.assembleDeck();
    oneDeck.shuffleDeck();

    playerBob.recieveCard(oneDeck.drawCard());
    playerBob.recieveCard(oneDeck.drawCard());

    dealer.recieveHiddenCard(oneDeck.drawCard());
    dealer.recieveCard(oneDeck.drawCard());

    playerBob.winOrLose();
    dealer.winOrLose();
    

    let hit = document.getElementById('hit-btn');
    hit.addEventListener('click', clickedHit.bind(playerBob))


    let stay = document.getElementById('stay-btn');
    stay.addEventListener('click', clickedStay.bind(dealer))

};




function clickedStay() {

    this.dealerTurn(); //checks dealer points
    
}


function clickedHit() {

    let newCard = oneDeck.drawCard();
    //assigns it to this player
    this.recieveCard(newCard);

    this.winOrLose();
}




// Enable pop-ups

// let bust = document.getElementsByClassName('bust')
// bust.style.display = "block"; 

// let gameOver = document.getElementsByClassName('game-over')
// gameOver.style.display = "block"; 

// let dealerWins = document.getElementsByClassName('dealer-wins')
// gameOver.style.display = "block"; 

// let youWin = document.getElementsByClassName('You Win!')
// gameOver.style.display = "block"; 

// let youLose = document.getElementsByClassName('You Lose!')
// gameOver.style.display = "block"; 