let dealer
let player
let deckId 
let playerWins = localStorage.getItem('playerWins') || 0
let handsPlayed = localStorage.getItem('handsPlayed') || 0
let handsPushed = localStorage.getItem('handsPushed') || 0
let game
let deck
let imageSrc = "assets/images/backOfCard.png"
//creates timer for async functions
function timer(ms) { return new Promise(res => setTimeout(res, ms)); }
// sets local storage items for tracking player stats
if (!playerWins){
    localStorage.setItem('playerWins', 0)
}
if (!handsPlayed){
    localStorage.setItem('handsPlayed', handsPlayed)
} 
if (!handsPushed){
    localStorage.setItem('handsPushed', handsPushed)
} 
document.getElementById('deal').addEventListener('click', deal)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stay').addEventListener('click', stay)
document.getElementById('hit').disabled = true
document.getElementById('stay').disabled = true

// creates class for new player
class MakeGame {
    constructor ( deckId, cardsLeft ){
        this.deckId = deckId
        this.cardsLeft = cardsLeft
    }
    // deals the first cards for the "initial deal"
    async dealFirstCards(){
        dealer.getCard()
        await timer(300)
        dealer.placeImages()
        dealer.addValueOfCard()
        dealer.placeFirstCard()
        for (let i = 0; i < 2; i++){
            player.getCard()
            await timer(300)
            player.placeImages()
            player.addValueOfCard()
            player.updateDom()
            }
        player.autoStayOn21()
    }
    //gets new deck when # of cards left is less than 15
    newDeck(){
            fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=10`)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            this.deckId = data.deck_id
            this.cardsLeft = data.remaining
          })
          .catch(err => {
              console.log(`error ${err}`)
          });
      }
      //compares scores  and updates DOM to display winner
    compareScores(){
      if (dealer.finalTotal === player.finalTotal){
          dealer.dom.innerText = ` HAND IS A PUSH.`
             handsPushed++
             localStorage.setItem('handsPushed', handsPushed)
      } else if ( dealer.finalTotal > 100 && player.finalTotal < 22){
          dealer.dom.innerText = ` PLAYER WINS!`
             playerWins++
             localStorage.setItem('playerWins', playerWins)
      } else if ( player.finalTotal > 100 && dealer.finalTotal < 22 ){
          dealer.dom.innerText = ` DEALER WINS!`
      } else if ( player.finalTotal > dealer.finalTotal){
          dealer.dom.innerText = ` PLAYER WINS!`
             playerWins++
             localStorage.setItem('playerWins', playerWins)
      } else {
          dealer.dom.innerText = ` DEALER WINS!`
      }
    }  
}

if(!game){
    game = new MakeGame(0,0)
    game.newDeck()
}

class MakePlayer {
    constructor(person){
        this.total = 0
        this.totalWithAce = 0
        this.hasAce = false
        this.person = person
        this.dom = document.getElementById(`${this.person}`)
        this.currentCard
        this.finalTotal
        this.firstCard = imageSrc
    }
    
// declares methods with player and card (passed as person parameter) classes to add value of card to pertinent total 
    addValueOfCard(){
        let value = this.getValues()
        if (value === 11 && this.hasAce === false){
        this.hasAce = true
        this.total += 1
        this.totalWithAce += 11
        } else if (value === 11 && this.hasAce === true){
            this.total +=1
            this.totalWithAce += 1
        } else {
        this.total += value
        this.totalWithAce += value
        }
        if (this.totalWithAce > 21){
            this.totalWithAce = 1000
        }
        if (this.total > 21){
            this.total = 1000

    }
    }

// declares method to extract value of card from fetch 

    getValues(){
        let x = this.currentCard.value
        if (x === 'KING' || x === 'QUEEN' || x === 'JACK'){
            return 10
            } else if (x === 'ACE') {
                return 11
            } else {
                return Number(x)
            }
        
    }

// declares function for use as methods inside the dealer and player classes to update the DOM for player and dealer (passed as arguments)

    updateDom(){
        if (this.total > 100  && this.totalWithAce > 100 ){
            this.dom.innerText = `${this.person.toUpperCase()} BUSTS! `
          } else if (this.totalWithAce === 21 || this.total === 21){
              this.dom.innerText = `${this.person.toUpperCase()} HAS 21!`
          } else if (this.hasAce === true && this.totalWithAce <= 20) {
            this.dom.innerText = `${this.person.toUpperCase()} HAS SOFT ${this.totalWithAce}. `
          } else {
              this.dom.innerText = `${this.person.toUpperCase()} HAS ${this.total}. `
          }
    }
    //creates IMG for card when card is downcard
    placeFirstCard(){
        const img = document.createElement('img')
        img.src = imageSrc
        document.getElementById(`${this.person}Images`).appendChild(img) 
    }
    //place images in the DOM
    placeImages(){
        const img = document.createElement('img')
        img.src = this.currentCard.image
        document.getElementById(`${this.person}Images`).appendChild(img) 
    }
    //fetches new card from the card API
    getCard(){
        const url = `https://deckofcardsapi.com/api/deck/${game.deckId}/draw/?count=1`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        this.currentCard = data.cards[0]
        game.cardsLeft = data.remaining
    })
        .catch(err => {
        console.log(`error ${err}`)
    });
    }
    //compares total and totalWithAce to determine which should be used for finalScore
    calculateFinalScore(){
        if (this.totalWithAce > 100){
            this.finalTotal = this.total
        } else {
            this.finalTotal = this.totalWithAce
        }
    } 
    //forces autoStay when player has 21
    autoStayOn21(){ 
        if (player.total > 100 && player.totalWithAce > 100 || player.total === 21 || player.totalWithAce === 21){
            stay()
        }
    }
}
//initiates a new game, player, and dealer. gets a new deck when the current deck has less 
function deal(){
    handsPlayed++
    localStorage.setItem('handsPlayed', handsPlayed)
    dealer = new MakePlayer(`dealer`)
    player = new MakePlayer(`player`)
    game = new MakeGame(game.deckId, game.cardsLeft)
    if (game.cardsLeft < 15){
        game.newDeck()
        } 
    let rules = document.getElementById('rules')
    if (rules){
        rules.remove()
        rules = false
    }
    // document.getElementById('rules').style.visibility = `hidden`
    document.getElementById('hit').disabled = false
    document.getElementById('stay').disabled = false
    document.getElementById('deal').disabled = true
    document.getElementById('playerImages').replaceChildren()
    document.getElementById('dealerImages').replaceChildren()
    player.dom.innerText= "PLAYER"
    dealer.dom.innerText = "DEALER"
    game.dealFirstCards()
    document.getElementById('numberOfHands').innerText = `Hands: ${handsPlayed}`
    document.getElementById('handsPushed').innerText = `Pushes: ${handsPushed}`
    document.getElementById('numberOfWins').innerText = `Wins: ${playerWins}`
}

async function hit(){
    player.getCard()
    await timer(800)
    player.addValueOfCard(player.currentCard)
    player.updateDom()
    player.placeImages()
    player.autoStayOn21()
}

async function stay(){
    document.getElementById('deal').disabled = true
    document.getElementById('hit').disabled = true
    document.getElementById('stay').disabled = true
 //   document.getElementById('rules').style.content = 'hidden'
    let i = 0
    while (dealer.total < 17 && dealer.totalWithAce <= 17 || dealer.total < 17 && dealer.totalWithAce > 100 ){
        dealer.getCard()
        await timer(750)
        if(i===0){
            const img = document.getElementById('dealerImages')
            img.removeChild(img.lastChild)
        }
        i++
        dealer.placeImages()
        dealer.addValueOfCard(dealer.currentCard)
        dealer.updateDom()
    }
    player.calculateFinalScore()
    dealer.calculateFinalScore()
    await timer (900)
    game.compareScores()
    document.getElementById('deal').disabled = false
}


