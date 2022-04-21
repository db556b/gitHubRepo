
//get deck
let deckId =''
//tracks total number of cards left throughout the game
let cardsLeft
//player's total w/ and w/o an ace (+11 in with ace category) and tracks if the player has been dealt an ace
let playerTotal = 0
let playerTotalWithAce = 0
let playerHasAce = false
//dealer's total w/ and w/o an ace (+11 in with ace category) and tracks if the dealer has been dealt an ace
let dealerTotal = 0
let dealerTotalWithAce = 0
let dealerHasAce = false

fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=10`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckId = data.deck_id
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

// retrieves new deck when the total cards available in the deck reaches less than 15
function newDeck(x){
  if (x < 15){
      fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=10`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      deckId = data.deck_id
      
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
  }
}
//draw starting cards, puts their image in the DOM, and adds the total value of each card to their pertinent total global variable

document.getElementById('deal').addEventListener('click', deal)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stay').addEventListener('click', stay)
document.getElementById('reset').addEventListener('click', reset)
let imageSrc = "assets/images/backOfCard.png"
function deal(){
    reset()
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        populateDeal(data)
 //       populateScores(data)
        loopThroughCards(data.cards)
        cardsLeft = data.remaining
    })
        .catch(err => {
        console.log(`error ${err}`)
});
}

//functionality of a hit in blackjack. calls function to add total to player's score and displays new card to the DOM
function hit(){
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        const img = document.createElement('img')
        img.src = data.cards[0].image
        document.getElementById('bottom').appendChild(img) 
        cardsLeft = data.remaining
        addValueOfNewCardPlayer(data.cards[0].value)
    })
        .catch(err => {
        console.log(`error ${err}`)
});
}
//functionality of a stay in blackjack. calls function to add total to dealer's score and displays new card to the DOM. On first hit replaces dealer's downcard with a newly drawn card (prevents a player from cheating and accessing the console to view the dealer's downcard)
function stay(){
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        if (imageSrc === "assets/images/backOfCard.png" ) {
            imageSrc = data.cards[0].image
            document.getElementById('dealerFirstCard').src = data.cards[0].image
            addValueOfNewCardDealer(data.cards[0].value)
        } else {
            const img = document.createElement('img')
            img.src = data.cards[0].image
            document.getElementById('top').appendChild(img) 
            cardsLeft = data.remaining
            addValueOfNewCardDealer(data.cards[0].value)
        }
    })
        .catch(err => {
        console.log(`error ${err}`)
});
}

//This function populates the initial deal of three cards to the Dom. Called in the deal() function
function populateDeal(data){
    imageSrc = "assets/images/backOfCard.png"
    const img0 = document.createElement('img')
    img0.src = data.cards[0].image
    document.getElementById('bottom').appendChild(img0)
    const img1 = document.createElement('img')
    img1.src = data.cards[1].image
    document.getElementById('bottom').appendChild(img1)
    const img3 = document.createElement('img')
    img3.setAttribute('id', 'dealerFirstCard')
    img3.src = imageSrc
    document.getElementById('top').appendChild(img3)
    const img2 = document.createElement('img')
    img2.src = data.cards[2].image
    document.getElementById('top').appendChild(img2)
}

//function to extract values of cards
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

//This function loops through the initial deal; extracts the value of each of the cards and then adds to the cumulative value of the dealer's and player's hands
function loopThroughCards(object){
    object.forEach((e,i) => {
        let value = getValues(e.value)
        console.log(value)
        if (i < 2){
            if (value === 11){
                playerHasAce = true
                playerTotal += 1
                playerTotalWithAce += 11
            } else {
                playerTotal += value
                playerTotalWithAce += value
            }
        } else {
            if (value === 11){
                dealerdealerHasAce = true
                dealerTotal += 1
                dealerTotalWithAce += 11
            } else {
                dealerTotal += value
                dealerTotalWithAce += value
        }
    }
    })
}

//this function called in the stay() function extracts the value of the card and then saves the value into the cumulative dealer hand values
function addValueOfNewCardDealer(object){
    let value = getValues(object)
    if (value === 11){
    dealerHasAce = true
    dealerTotal += 1
    dealerTotalWithAce += 11
    console.log(dealerTotal)
} else {
    dealerTotal += value
    dealerTotalWithAce += value
    console.log(dealerTotal)
}
}


//this function called in the hit() function extracts the value of the card and then saves the value into the cumulative player hand values
function addValueOfNewCardPlayer(object){
    let value = getValues(object)
    if (value === 11){
    playerHasAce = true
    playerTotal += 1
    playerTotalWithAce += 11
    console.log(playerTotal)
} else {
    playerTotal += value
    playerTotalWithAce += value
    console.log(playerTotal)
}
}
//compare to find winner

//reset playing field, DOM, and all global varibale to their initial state. currently called by event listener on the reset button/ This is for testing only and will be integrated into the stay() function once complete
function reset(){
    document.getElementById('top').replaceChildren()
    document.getElementById('bottom').replaceChildren()
    newDeck(cardsLeft)
    playerTotal = 0
    playerTotalWithAce = 0
    dealerTotal = 0
    dealerTotalWithAce = 0
    playerHasAce = false
    dealerHasAce = false

}
