
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    getSuit() {
        return this.suit;
    }
    getCardValue() {
        return this.value;
    }
    stringifyCard() {
        return this.value + "-" + this.suit[0]; 
    }
}
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
        // create a new element and set the source to a card
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
                this.score -= 10;    // NOT WORKING
            }
        } else if (typeof card.value === 'string') {
            this.score += 10;
        } else {
            this.score += card.value;
        }

    }
    tallyPoints(card) {
       let scoreboard =  document.getElementsByClassName('player-score').innerHTHML;
       scoreboard = this.score;
        
    }

    getScore() {
        return this.score;
    }

    // split up win/lose by outcome, extra methods, blackjack - game over
    winOrLose() {
        
        if (this.getScore() <= 20) {
            console.log('you can hit or stay, no popup')
        } else if (this.getScore() === 21) {
            console.log('BLACKJACK pop up, reset game')
        } else if (this.getScore() > 21) {
            console.log('bust pop up - reset game')
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

    dealerTurn() { // need delay timer 
        console.log('dealer turn method')
        // setTimeout( () => {
        //     this.revealHiddenCard();
        // }, 1000 );
        this.revealHiddenCard();
        this.recieveCard( oneDeck.drawCard() )
        this.winOrLose();
        // while ( this.getScore() <= 17 ) {
        //     setTimeout(() => {
        //         this.recieveCard( oneDeck.drawCard() );
        //         this.winOrLose();
        //     }, 1000)
        // }
    }
    //   setTimeout(() => {
    //     while (this.getScore() <= 17) {
    //         this.recieveCard(oneDeck.drawCard());
    //     }
    //     this.winOrLose();
    // }, 1000)
    
    
    
    //revealing multiple same cards for dealer - calling of cards the same class, reveal card class=hidden-card
    revealHiddenCard() {
        // console.log(this.handArray)
        let hiddenCardImg = document.getElementsByClassName('hidden-card')[0]
        // console.log(hiddenCardImg)
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


let oneDeck = new Deck();
let dealer = new Dealer('Dealer');
let playerBob = new Player('Bob');

// EVENTS
document.getElementById('press-play').addEventListener('click', startGame); // PRESS PLAY BUTTON


function startGame() {
    document.getElementById('press-play').style.display = "none"; // HIDE PLAY BUTTON
    oneDeck.assembleDeck();
    oneDeck.shuffleDeck();
}
function nextRound(){
    // PUT CARDS DOWN ON TABLE *
    playerBob.recieveCard(oneDeck.drawCard());
    playerBob.recieveCard(oneDeck.drawCard());
    dealer.recieveHiddenCard(oneDeck.drawCard());
    dealer.recieveCard(oneDeck.drawCard());

    // CHECK CONDITIONS
    playerBob.winOrLose();

    document.getElementById('hit-btn').addEventListener('click', clickedHit.bind(playerBob));
    document.getElementById('stay-btn').addEventListener('click', clickedStay.bind(dealer));
}
function clickedStay() {
    document.getElementById("hit-btn").disabled = true;  // DISABLE PLAY BUTTON
    this.winOrLose(); // CHECK DEALAER CONDITIONS
    this.dealerTurn(); // 
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


// DISABLE MESSAGE POP UPS - first make divs
// let gameOver = document.getElementsByClassName('game-over')
// gameOver.style.display = "none"; 

// let dealerWins = document.getElementsByClassName('dealer-wins')
// gameOver.style.display = "none"; 

// let youWin = document.getElementsByClassName('You Win!')
// gameOver.style.display = "none"; 

// let youLose = document.getElementsByClassName('You Lose!')
// gameOver.style.display = "none"; 


// reset () {
//     reset scoreboard
//hit and stay button
// } 
// AFTER RESET, GO TO NEXT ROUND
// WHEN X AMOUNT OF CARDS REMAIN, ASK PLAYER IF THEY WANT TO DO ANOTHER GAME - DISPLAY