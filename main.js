/*****************************************************************/
/*************************** Classes *****************************/
/*****************************************************************/
class Card {
    constructor ( suit, value ) {
        this.suit = suit;
        this.value = value;
    }
    getSuit () {
        return this.suit;
    }
    getCardValue () {
        return this.value;
    }
    cardDictionary () {
        switch ( this.value ) {
            case 'A':
                return 11;
            case 'K':
                return 10;
            case 'Q':
                return 10;
            case 'J':
                return 10;
            default:
                return this.value;
        }
    }
    stringifyCard () {
        return this.value + "-" + this.suit[0];
    }
}
class Deck {
    constructor () {
        this.cardArray = [];
    }

    assembleDeck () {
        const suits = ['CLUBS', 'HEARTS', 'DIAMONDS', 'SPADES'];
        const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
        for ( let i = 0; i < values.length; i++ ) {
            for ( let j = 0; j < suits.length; j++ ) {
                this.cardArray.push( new Card( suits[j], values[i] ) );
            }
        }
    }

    shuffleDeck () {
        let deckArray = this.cardArray;
        for ( var i = deckArray.length - 1; i > 0; i-- ) {
            let randIdx = Math.floor( Math.random() * ( i + 1 ) );
            let temp = deckArray[i];
            deckArray[i] = deckArray[randIdx];
            deckArray[randIdx] = temp;
        }
        this.cardArray = deckArray;
    }
    drawCard () {
        return this.cardArray.pop();
    }
}
class Player {
    constructor ( player, handArray = [] ) {
        this.player = player;
        this.handArray = handArray;
        this.totalScore = 0;
    }
    getScore () {
        return this.totalScore;
    }
    recieveCard ( newCard ) {
        let newCardImg = document.createElement( "img" );
        newCardImg.src = "./cards/" + newCard.stringifyCard() + ".png"
        newCardImg.className = 'cards';
        document.getElementsByClassName( "player-container" )[0].appendChild( newCardImg );
        this.handArray.push( newCard );
        this.tallyPoints( newCard );
    }
    tallyPoints () {
        let counter = 0;
        this.totalScore = 0;
        for ( let i = 0; i < this.handArray.length; i++ ) {
            let card = this.handArray[i];
            if ( card.value === 'A' ) {
                counter++;
            }
            if ( this.bust() ) {
                if ( counter > 0 ) {
                    counter--;
                    this.totalScore -= 10;
                }
            }
            this.totalScore += card.cardDictionary();
        }
        return this.totalScore;
    }

    getScore () {
        return this.score;
    }
    bust () {
        if ( this.totalScore > 21 ) {
            messageBox.style.display = 'flex'
            message.innerHTML = this.player + " Bust";
            return true;
        }
        return false;
    }
    blackjack () {
        if ( this.totalScore === 21 ) {
            messageBox.style.display = 'flex'
            message.innerHTML = "BLACKJACK!! " + this.player + " Win!";
            return true;
        }
        return false;
    }

    tie ( player ) {
        if ( this.totalScore === player.totalScore ) {
            messageBox.style.display = 'flex'
            message.innerHTML = "Push";
            return true;
        }
        return false;
    }

    
    compareScores ( player ) {
        if ( this.totalScore > player.totalScore ) {
            messageBox.style.display = 'flex'
            message.innerHTML = this.player + " Wins";
        } else if ( this.totalScore < player.totalScore ) {
            messageBox.style.display = 'flex'
            message.innerHTML = "You Wins";
        }
    }

    winOrLose () {
        this.blackjack();
        this.bust();
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
        this.tallyPoints(newCard);
    }

    dealerTurn() {
        this.revealHiddenCard();
        while(this.totalScore <= 17){
            this.recieveCard(oneDeck.drawCard());
            this.tallyPoints(); 
            this.winOrLose(); // T/F
            dealerScore(); 
        }
        if(!this.blackjack() && !this.bust()){
            this.tie(player); //IS IT A TIE
            // this.playerWins(player); // DOES PLAYER HAVE MORE POINTS THAN DEALER
            this.compareScores(player); // 
        }
        
    }
    revealHiddenCard() {
        let hiddenCardImg = document.getElementsByClassName('hidden-card')[0];
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



//* @desc instances of Deck, Player, and Dealer class 
let oneDeck = new Deck();
let dealer = new Dealer( 'Dealer' );
let player = new Player( 'You' );
let discardStack = [];


let messageBox = document.getElementsByClassName( 'pop-up-messages' )[0]; messageBox.style.display = "none";
let message = document.getElementsByClassName( 'messages' )[0];


/*****************************************************************/
/*************************** Events *****************************/
/*****************************************************************/

document.getElementById( 'press-play' ).addEventListener( 'click', startGame.bind( player ) ); // PRESS PLAY BUTTON
document.getElementById( 'hit-btn' ).addEventListener( 'click', clickedHit.bind( player ) );
document.getElementById( 'stay-btn' ).addEventListener( 'click', clickedStay.bind( dealer ) );
document.getElementById( 'reset-btn' ).addEventListener( 'click', resetGame );


/*****************************************************************/
/*************************** Game *****************************/
/*****************************************************************/

function resetGame () {
    document.getElementsByClassName( "player-container" )[0].innerHTML = "";
    document.getElementsByClassName( "dealer-container" )[0].innerHTML = "";
    document.getElementById( "hit-btn" ).disabled = false;
    document.getElementsByClassName( 'dealer-score' )[0].innerHTML = '';

    player.handArray = [];
    dealer.handArray = [];

    player.playerScore = 0;
    dealer.dealerScore = 0;

    playerScore();

    messageBox.style.display = "none";
    message.innerHTML = "";

    startGame();
}
function playerScore () {
    let playerScore = document.getElementsByClassName( 'player-score' )[0];
    playerScore.innerHTML = 'PLAYER: ' + player.tallyPoints();
}
function dealerScore () {
    let dealerScore = document.getElementsByClassName( 'dealer-score' )[0];
    dealerScore.innerHTML = 'DEALER: ' + dealer.tallyPoints();
}
function startGame () {
    document.getElementById( 'press-play' ).style.display = "none";
    document.getElementById( 'hit-btn' ).style.display = "block";
    document.getElementById( 'stay-btn' ).style.display = "block";
    oneDeck.assembleDeck();
    oneDeck.shuffleDeck();
    startRound();
}
function startRound () {
    // PUT CARDS DOWN ON TABLE *
    player.recieveCard( oneDeck.drawCard() );
    player.recieveCard( oneDeck.drawCard() );
    dealer.recieveHiddenCard( oneDeck.drawCard() );
    dealer.recieveCard( oneDeck.drawCard() );

    // CHECK PLAYERS POINTS BEFORE DEALER REVEALS SECOND CARD
    playerScore();
    player.winOrLose();//

}
function clickedStay () {
    playerScore();
    document.getElementsByClassName( "hit-btn" ).disabled = true;
    dealerScore();
    this.blackjack();
    this.dealerTurn();
}
function clickedHit () {
    let newCard = oneDeck.drawCard();
    this.recieveCard( newCard );
    playerScore();
    this.winOrLose();
}



