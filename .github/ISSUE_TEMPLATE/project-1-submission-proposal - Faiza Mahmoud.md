

BLACKJACK


<!-- STATE - KEEP TRACK OF MOVES -->
- Who's turn it is
- Whether player wins the game or loses
- keeps count of points - displays them on gameboard


<!-- SET UP GLOBAL VARIABLES -->
- AI/DEALER 
- Player
- DOM events
    - for player hitting yes(hit) or no(stand) on bet
    - buttons for playing another round, yes/no

<!-- Classes/Objects -->
- Card class
- Deck class
- functions for :
    - shuffling cards
    - removing cards played from array
    - Finding a Hand’s Total Value and displaying it ***


<!-- GAME PLAY -->

- deal 2 cards for player and two for theirselves
    - starting with player, back & forth, AI has one card hidden
- AI asks player if they want to hit or stand
    - If Hit: AI deals player a card until player stands, busts, or hits 21
    - If Stand:
        - AI turns over second card
        - If sum of cards is <17, dealer will hit until <=17
            - game analyzed on who wins or loses
                - if player wins, player collects pot and then decides if they want to play another round 
                
- Next round will start, as long as there are enough cards. If not, Dealer will ask player if they want to playe another round

<!-- player moves -->
- hit - until player is satisfied, busts or hits 21
- stand
- yes/no on playing another round 

<!-- Outcomes of game -->

 - whoever has the highest card count - wins
 - blackjack on first draw- automatic wins
 - blackjack - wins
 - push (no one wins)
 - bust - player goes over 21
 - bust - AI goes over 21 - no one wins
 - AI wins - blackjack


<!-- How do you beat the dealer? -->

By drawing a hand value that is higher than the dealer’s hand value
By the dealer drawing a hand value that goes over 21.
By drawing a hand value of 21 on your first two cards, when the dealer does not.


<!-- How do you lose to the dealer?  -->
Your hand value exceeds 21.
The dealers hand has a greater value than yours at the end of the round




