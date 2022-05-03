let dealer
let player
let deckId
let game
let deck
//creates timer for async functions
function timer(ms) { return new Promise(res => setTimeout(res, ms)); }
// creates class for new player
class MakeGame {
    constructor ( deckId, cardsLeft ){
        this.deckId = deckId
        this.cardsLeft = cardsLeft
    }

    dealFirstCards(){

    }

    newDeck(){
        if (this.cardsLeft < 15){
            fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=10`)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            this.deckId = data.deck_id
            this.cardsLeft = data.remaining
 //           localStorage.setItem('deckId', deckId)
          })
          .catch(err => {
              console.log(`error ${err}`)
          });
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
        this.domPics = document.getElementById(`${this.person}Two`)
        this.currentCard
        this.finalTotal
    }
    
// declares methods with player and card (passed as person parameter) classes to add value of card to pertinent total 
    addValueOfCard( object ){
        let value = this.getValues(this.currentCard)
        if (value === 11 && this.hasAce === false){
        this.hasAce = true
        this.total += 1
        this.totalWithAce += 11
        console.log(this.total)
        } else if (value === 11 && this.hasAce === true){
            this.total +=1
            this.totalWithAce += 1
        } else {
        this.total += value
        this.totalWithAce += value
      console.log(this.total,this.totalWithAce)
        }
        if (this.totalWithAce > 21){
            this.totalWithAce = 1000
        }
        if (this.total > 21){
            this.total = 1000

    }
    }

// declares method to extract value of card from fetch 

    getValues(x){
        console.log(x)
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



        placeImages(){
            const img = document.createElement('img')
            img.src = this.currentCard.cards[0].image
            document.getElementById(`${this.domPics}`).appendChild(img) 
        }
}



document.getElementById('deal').addEventListener('click', deal)
document.getElementById('hit').addEventListener('click', hit)
// document.getElementById('stay').addEventListener('click', stay)

function deal(){

    dealer = new MakePlayer(`dealer`)
    player = new MakePlayer(`player`)
    game = new MakeGame(game.deckId, game.cardsLeft)
    if (game.cardsLeft < 15){
        game.newDeck()
        } 
}
async function getCard(user){
    const url = `https://deckofcardsapi.com/api/deck/${game.deckId}/draw/?count=1`
fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
    await timer(200)
    console.log(data)
    user.currentCard = data
})
    .catch(err => {
    console.log(`error ${err}`)
});
}

function hit(){
    player.getCard('player')
    player.addValueOfCard()
    player.updateDom()
    player.placeImages()
}


