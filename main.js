// RESET GAME - WHEN DOES GAME STOP AND RESET, BUTTONS FOR DO YOU WANT TO PLAY AGAIN
// UPDATE PLAYER/DEALER SCORE 
// more than one ace in hand
// stay button
// hidden card


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


/////////////////////////////////////////////////////// DECK CLASS //////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//VARIABLES


let hiddenCard;






/////////////////////////////////////////////////////// PLAY GAME //////////////////////////////////////////////////////////////////////////////////////////////////////////

let oneDeck = new Deck();


let play = document.getElementById('press-play')
play.addEventListener('click', playGame)


function playGame() {

    let dealer = new Player('Dealer');
    let playerBob = new Player('Bob');

    let play = document.getElementById('press-play')
    play.style.display = "none"; // works
    oneDeck.assembleDeck();
    oneDeck.shuffleDeck();

    let hit = document.getElementById('hit-btn');
    hit.addEventListener('click', clickedHit.bind(playerBob)) // access player bob from clickHit()

    playerBob.recieveCard(oneDeck.drawCard());
    //hidden dealer - hidden needs to replace with the third hit
    playerBob.recieveCard(oneDeck.drawCard());
    //dealerJim

};

/////////////////////////////////////////////////////// STAND //////////////////////////////////////////////////////////////////////////////////////////////////////////


let stay = document.getElementById('stay-btn');
stay.addEventListener('click', clickedStay)

function clickedStay() {
    //dealer clickedHit dealerJim 
    //route to checks 
    //dealer clickedHit
    //route to checks 
}

/////////////////////////////////////////////////////// HIT //////////////////////////////////////////////////////////////////////////////////////////////////////////
//recieve card
function clickedHit() {
    // draws a card
    let newCard = oneDeck.drawCard();

    //assigns it to this player
    this.recieveCard(newCard);

}


/////////////////////////////////////////////////////// OUTCOME LOGIC //////////////////////////////////////////////////////////////////////////////////////////////////////////
function dealerOutcomes() {
    
    //messages for win or lose 
    if (dealerScore < 17) { 
        clickedHit(); //click hit for dealer?
    } else if (dealerScore === 21) {
        console.log('BLACKJACK')
    } else if (dealerScore > 21) {
        console.log('BUST')
    }
}

function playerOutcomes(){
    //messages for win or lose
    if (playerScore < 20) {
        // player can hit or stay 
    } else if (playerScore === 21) {
        console.log('BLACKJACK')
    } else if (playerScore() > 21) {
        console.log('BUST')
    }

}









/////////////////////////////////////////////////////// PLAYER CLASS //////////////////////////////////////////////////////////////////////////////////////////////////////////

// player name, and cards  player1.receievCard = [{card obj}] 
//dealer card, 
// score - displayed
// 


class Player {
    constructor(player, handArray = []) {
        this.player = player;
        this.handArray = handArray;
        this.score = 0;
    }
    recieveCard(newCard) { //currently giving player cards only 
        
        // if(this.dealer = 'dealer'){

        // }
        
        let newCardImg = document.createElement("img");

        newCardImg.src = "./cards/" + newCard.stringifyCard() + ".png"
        newCardImg.className = 'cards';

        document.getElementsByClassName("player-container")[0].appendChild(newCardImg);

        //check point conditions and if we're within 
        //
        this.handArray.push(newCard);

    }
    calculateScore() {
        let sum = 0;

        for (let i = 0; i < this.array.length; i++) {
            let value = this.array[i].value;
            if (value === 'A' || typeof value === 'string') {
                sum += 10;
            } else if (typeof value === 'number') {
                sum += value;
            }
        }
        this.score = sum;
    }
    // getScore() { update score
    //   this.calculateScore += class="player-score">PLAYER SCORE</div>
    //   <div class="dealer-score"
    // // }
    checkAce() {
        if (this.array[i].value === "A") {
            return true;
        }
        return false;
    }
    aceTotal() {
        let aceIsOne = 10;
        if (dealerScore > 21 && checkAce() === true) {
            //subtract score by 10 points 

        }
    }

}


//extend dealer - receiveCard()
