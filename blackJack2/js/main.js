let dealer
let player
let deckId
let game
let deck

// creates class for new player
class MakeGame {
    constructor ( deckId, cardsLeft ){
        this.deckId = deckId
        this.cardsLeft = cardsLeft
    }

    dealFirstCards(){
        const url = `https://deckofcardsapi.com/api/deck/${game.deckId}/draw/?count=3`
        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
            console.log(data)
            // populateDeal(data)
            // loopThroughCards(data.cards)
            this.cardsLeft = data.remaining

        })
            .catch(err => {
            console.log(`error ${err}`)
    });

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
class MakeDeck{
    constructor (cardsLeft){
        this.deckId 
        this.cardsLeft = cardsLeft

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
        this.dom = document.getElementById(`${this.person.toLowerCase()}`)
        this.currentCard
        this.finalTotal
    }
    
// declares methods with player and card (passed as person parameter) classes to add value of card to pertinent total 
    addValueOfCard( object ){
        let value = getValues(object)
        if (value === 11 && this.hasAce === false){
        this.hasasAce = true
        this.total += 1
        this.totalWithAce += 11
        console.log(this.total)
        } else if (value === 11 && this.hasAce === true){
            this.total +=1
            this.totalWithAce += 1
        } else {
        this.total += value
        this.totalWithAce += value
      //  console.log(playerTotal)
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

    updateDom(person){
        if (thisperson.total > 100  && person.totalWithAce > 100 ){
            person.dom.innerText = `${this.person.toUpperCase()} BUSTS! `
          } else if (person.totalWithAce === 21 || person.total === 21){
              person.dom.innerText = `${this.person.toUpperCase()} HAS 21!`
          } else if (person.hasAce === true && person.totalWithAce <= 20) {
            person.dom.innerText = `${this.person.toUpperCase()} HAS SOFT ${person.totalWithAce}. `
          } else {
              person.dom.innerText = `${this.person.toUpperCase()} HAS ${person.total}. `
          }
    }
}



document.getElementById('deal').addEventListener('click', deal)
// document.getElementById('hit').addEventListener('click', hit)
// document.getElementById('stay').addEventListener('click', stay)

function deal(){

    dealer = new MakePlayer(`dealer`)
    player = new MakePlayer(`player`)
    game = new MakeGame(game.deckId, game.cardsLeft)
    if (game.cardsLeft < 15){
        game.newDeck()
        } 
}


