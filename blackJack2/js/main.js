// creates class for new player
let dealer
let player
class MakeGame {
    constructor (deckId, cardsLeft, )
}

class MakePlayer {
    constructor(total, totalWithAce, hasAce){
        this.total = total
        this.totalWithAce = totalWithAce
        this.hasAce = hasAce
        this.dom = document.getElementById('player')
        this.person = 'PLAYER'
        this.currentCARD
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
        this.currentCARD
        this.finalTotal
    }
}

// declares function for use as methods inside the dealer and player (passed as person parameter) classes to add value of card to pertinent total 

function addValueOfCard(person, object){
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


// declares function for use as methods inside the dealer and player classes to extract value of card from fetch 

function getValues(x){
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

function updateDom(person){
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
document.getElementById('deal').addEventListener('click', deal)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stay').addEventListener('click', stay)

function deal(){
    dealer = new MakeDealer(0,0,false)
    player = new MakePlayer(0,0,false) 
}