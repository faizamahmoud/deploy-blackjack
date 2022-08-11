


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

}
// console.log(newCard.getSuit()) //clubs
// console.log(newCard.suit) //undefined, protected




// FULL DECK
class Deck {
    constructor() {
        this.cardArray = [];
    }

    assembleDeck() { //array of Card objects 

        const suits = ['CLUBS', 'HEARTS', 'DIAMONDS', 'SPADES'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];


        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                //this.cardArray.push({value:values[i], suit:suits[j]})

                this.cardArray.push(new Card(suits[j], values[i])) //creating objects for 52 cards in a deck
            }
        }

    }

    shuffleDeck() {

        let deckArray = this.cardArray;

        for (var i = deckArray.length - 1; i > 0; i--) {
            // console.log('index:', i)

            let randIdx = Math.floor(Math.random() * (i + 1)); //or .length

            let temp = deckArray[i]; //assign temp to be the last element in the array
            // console.log('let temp = deckArray[i] =  ' + deckArray[i])

            deckArray[i] = deckArray[randIdx]; //then assign  
            // console.log('let deckArray[i] = deckArray[randIdx] = ', deckArray[randIdx])

            deckArray[randIdx] = temp;
            // console.log('let deckArray[randIdx] = temp = ', deckArray[randIdx])
        }
        //pushs 52 cards onto an array and returns shuffled cards array       
        this.cardArray = deckArray;

    }

}

//VARIABLES
let player;
let dealer;
let playerHand = [];
let dealerHand = [];
let remainingCards = 0; //oneDeck
let hiddenCard;




// PLAY GAME

//Press play button
let play = document.getElementById('press-play')
play.addEventListener('click', playGame)


function playGame() {
    let play = document.getElementById('press-play');
    play.style.display = "none"; // check

    //create a deck
    const oneDeck = new Deck();
    oneDeck.assembleDeck();
    oneDeck.shuffleDeck();
    //console.log(oneDeck)


    let card = oneDeck.cardArray.pop()
    // playerHand.push(oneDeck.cardArray.pop(), oneDeck.cardArray.pop())
    // dealerHand.push(oneDeck.cardArray.pop(), oneDeck.cardArray.pop())









};
let stay = document.getElementById('stay-btn');
stay.addEventListener('click', clickedStay)
function clickedStay() {
    dealerHand.push(oneDeck.cardArray.pop())
}

// let hit = document.getElementById('hit-btn');
// hit.addEventListener('click', clickedHit)
function clickedHit() {
    //if score < 21 
    //create an element
    let newCardImg = document.createElement("img");
    console.log(newCardImg)

    newCardImg.src = "./cards/" + card + ".png";
    document.getElementById("player-cards").append(newCardImg);
    playerHand.push(card);

}
// RESET GAME - 



function gameOutcomes() {
    // 'A':[1,11] if A=1 causes bust then A=1 then subtract 10

    // DEALER SHOWS CARD AND NEEDS TO HIT UNTIL THEY HAVE ATLEAST 17, IF DEALER 17 WITH 3 CARDS AND PLAYER 18, PLAYER WINS
    // 3 OUTCOMES FOR PAYOUTS : 1. PLAYER WINS, THEY WIN THEYRE BET*2  2. LOSE ENTIIRE BET  3.PUSH - PLAYER HAS SAME BET VALUE AS 
    //DEALER - TIE 4. DEALT BLACKJACK (IF DEALER GETS BLACKJACK THEN PUSH)
}







class Player {
    constructor(dealer, player, array) {
        this.dealer = dealer;
        this.player = player;
        this.array = [];

    }
    //keeps track of score, A = 10points, need to figure out A = 1
    //input card
    score() {

        let sum = 0;
        for (let i = 0; i < this.array.length; i++) {
            if (typeof this.array[i].value === 'string') {
                this.array[i].value = 10;
                sum += this.array[i].value;
            } else {
                sum += this.array[i].value;
            }
        }
        return sum;

    }

}
