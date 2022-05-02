// creates class for new player

class MakeGame {
    constructor (deckId, cardsLeft ){
        this.deckId = deckId
        this.cardsLeft = cardsLeft
    }

    // declares methods with player and card (passed as person parameter) classes to add value of card to pertinent total 

    addValueOfCard(person, object){
        let value = getValues(object)
        if (value === 11 && person.hasAce === false){
        person.hasasAce = true
        person.total += 1
        person.totalWithAce += 11
        console.log(person.total)
        } else if (value === 11 && person.hasAce === true){
            person.total +=1
            person.totalWithAce += 1
        } else {
        person.total += value
        person.totalWithAce += value
      //  console.log(playerTotal)
        }
        if (person.totalWithAce > 21){
            person.totalWithAce = 1000
        }
        if (person.total > 21){
            person.total = 1000

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
        if (person.total > 100  && person.totalWithAce > 100 ){
            person.dom.innerText = `${person.person} BUSTS! `
          } else if (person.totalWithAce === 21 || person.total === 21){
              person.dom.innerText = `${person.person} HAS 21!`
          } else if (person.hasAce === true && person.totalWithAce <= 20) {
            person.dom.innerText = `${person.person} HAS SOFT ${person.totalWithAce}. `
          } else {
              person.dom.innerText = `${person.person} HAS ${person.total}. `
          }
    }
// retrieves new deck when the total cards available in the deck reaches less than 15


    deal(){
        this.reset()
        const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`
        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
            console.log(data)
            populateDeal(data)
            loopThroughCards(data.cards)
            cardsLeft = data.remaining

        })
            .catch(err => {
            newDeck(2)
            deal()
            console.log(`error ${err}`)
    });

    }
}

class MakeDeck {
    constructor (deckId,cardsLeft){
        this.deckId = deckId
        this.cardsLeft = cardsLeft
    }
    newDeck(x){
        if (x < 15){
            fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=10`)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            this.deckId = data.deck_id
 //           localStorage.setItem('deckId', deckId)
          })
          .catch(err => {
              console.log(`error ${err}`)
          });
        }
      }
}
class MakePlayer {
    constructor(total, totalWithAce, hasAce){
        this.total = total
        this.totalWithAce = totalWithAce
        this.hasAce = hasAce
        this.dom = document.getElementById('player')
        this.person = 'PLAYER'
        this.currentCard
        this.finalTotal
    }
}
//creates class for new dealer

class MakeDealer {
    constructor(total, totalWithAce, hasAce){
        this.total = total
        this.totalWithAce = totalWithAce
        this.hasAce = hasAce
        this.dom = document.getElementById('dealer')
        this.person = 'DEALER'
        this.currentCard
        this.finalTotal
    }
}

const game = new MakeGame (0,0,0)

document.getElementById('deal').addEventListener('click', deal)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stay').addEventListener('click', stay)

function deal(){
    const game = new MakeGame(game.deckId, game.cardsLeft)
    const dealer = new MakeDealer(0,0,false)
    const player = new MakePlayer(0,0,false) 
}


