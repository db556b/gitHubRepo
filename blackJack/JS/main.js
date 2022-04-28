
//get deck
let deckId = localStorage.getItem(`deckId`)
let playerWins = localStorage.getItem('playerWins') || 0
let handsPlayed = localStorage.getItem('handsPlayed') || 0
let handsPushed = localStorage.getItem('handsPushed') || 0
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
let playerDom = document.getElementById('player')
let dealerDom = document.getElementById('dealer')
let dealerFinalTotal = 0
let playerFinalTotal = 0
if (!playerWins){
    localStorage.setItem('playerWins', 0)
}
if (!handsPlayed){
    localStorage.setItem('handsPlayed', handsPlayed)
} 
if (!handsPushed){
    localStorage.setItem('handsPushed', handsPushed)
} 
if (!deckId){
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=10`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckId = data.deck_id
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    }
// retrieves new deck when the total cards available in the deck reaches less than 15
function newDeck(x){
  if (x < 15){
      fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=10`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      deckId = data.deck_id
      localStorage.setItem('deckId', deckId)
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
//document.getElementById('reset').addEventListener('click', reset)
let imageSrc = "assets/images/backOfCard.png"
function deal(){
    reset()
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
document.getElementById('deal').disabled = true
handsPlayed++
localStorage.setItem('handsPlayed', handsPlayed)
document.getElementById('numberOfWins').innerText = `Wins: ${playerWins}`
document.getElementById('numberOfHands').innerText = `Hands: ${handsPlayed}`
document.getElementById('handsPushed').innerText = `Pushes: ${handsPushed}`
localStorage.setItem('deckId', `${deckId}`)
autoStayOn21()
}

//functionality of a hit in blackjack. calls function to add total to player's score and displays new card to the DOM
function hit(){
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
      //  console.log(data)
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
async function stay(){
    document.getElementById('deal').disabled = true
    document.getElementById('hit').disabled = true
    document.getElementById('stay').disabled = true
    while (dealerTotal < 17 && dealerTotalWithAce <= 17 || dealerTotal < 17 && dealerTotalWithAce > 100 ){
        getDealerCard()
        await timer(750)
    }
   dealerScore()
   playerScore()
   await timer(600)
   compareScores()
   document.getElementById('deal').disabled = false
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
        if (i < 2){
            addValueOfNewCardPlayer(value)
        } else {
            addValueOfNewCardDealer(value)
    }
    })
    autoStayOn21()
}

//this function called in the stay() function extracts the value of the card and then saves the value into the cumulative dealer hand values and updates the dom with the values
function addValueOfNewCardDealer(object){
    let value = getValues(object)
    if (value === 11 && dealerHasAce === false){
    dealerHasAce = true
    dealerTotal += 1
    dealerTotalWithAce += 11
  //  console.log(dealerTotal)
    } else if (value === 11 && dealerHasAce === true){
        dealerTotal +=1
        dealerTotalWithAce += 1
    } else {
    dealerTotal += value
    dealerTotalWithAce += value
  //  console.log(dealerTotal)
}
if (dealerTotalWithAce > 21 ){
    dealerTotalWithAce = 1000
}
if (dealerTotal > 21){
    dealerTotal = 1000
}
updateDealerDom()
}


//this function called in the hit() function extracts the value of the card and then saves the value into the cumulative player hand values and updates the dom with the values
function addValueOfNewCardPlayer(object){
    let value = getValues(object)
    if (value === 11 && playerHasAce === false){
    playerHasAce = true
    playerTotal += 1
    playerTotalWithAce += 11
    console.log(playerTotal)
    } else if (value === 11 && playerHasAce === true){
        playerTotal +=1
        playerTotalWithAce += 1
    } else {
    playerTotal += value
    playerTotalWithAce += value
  //  console.log(playerTotal)
    }
    if (playerTotalWithAce > 21){
        playerTotalWithAce = 1000
    }
    if (playerTotal > 21){
        playerTotal = 1000
    }

    if (playerTotal > 100 && playerTotalWithAce > 100){
        stay()
    }
    autoStayOn21()
    updatePlayerDom()
    }

//This function auotmatically runs stay() when the player's total is 21
function autoStayOn21(){
    if(playerTotal === 21 || playerTotalWithAce === 21){
        stay()
    }
}
//compare to find winner
function dealerScore(){
    if (dealerTotalWithAce > 100){
        dealerFinalTotal = dealerTotal
    } else {
        dealerFinalTotal = dealerTotalWithAce
    }
}
function playerScore(){
    if (playerTotalWithAce > 100){
        playerFinalTotal = playerTotal
    } else {
        playerFinalTotal = playerTotalWithAce
    }
}
function compareScores(){
    if (dealerFinalTotal === playerFinalTotal){
        dealerDom.innerText = ` HAND IS A PUSH.`
        handsPushed++
        localStorage.setItem('handsPushed', handsPushed)
    } else if ( dealerFinalTotal > 100 && playerFinalTotal < 22){
        dealerDom.innerText = ` PLAYER WINS!`
        playerWins++
        localStorage.setItem('playerWins', playerWins)
    } else if ( playerFinalTotal > 100 && dealerFinalTotal < 22 ){
        dealerDom.innerText = ` DEALER WINS!`
    } else if ( playerFinalTotal > dealerFinalTotal){
        dealerDom.innerText = ` PLAYER WINS!`
        playerWins++
        localStorage.setItem('playerWins', playerWins)
    } else {
        dealerDom.innerText = ` DEALER WINS!`
    }
}
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
    document.getElementById('hit').disabled = false
    document.getElementById('stay').disabled = false
    document.getElementById('dealer').innerText = `DEALER`
}


// this function fetches a new card for the dealer and is called inside the loop for the stay() function
function getDealerCard(){
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
//This is a timer to delay the API fetch call inside the loop for the dealer in the stay() function
  function timer(ms) { return new Promise(res => setTimeout(res, ms)); }


  // this function updates the player's portion of the DOM to display the player's current total.
  function updatePlayerDom(){
      if (playerTotal > 100  && playerTotalWithAce > 100 ){
        playerDom.innerText = `PLAYER BUSTS! `
      } else if (playerTotalWithAce === 21 || playerTotal === 21){
          playerDom.innerText = `PLAYER HAS 21!`
      } else if (playerHasAce === true && playerTotalWithAce <= 20) {
        playerDom.innerText = `PLAYER HAS SOFT ${playerTotalWithAce}. `
      } else {
          playerDom.innerText = `PLAYER HAS ${playerTotal}. `
      }
  }
// this function updates the dealer's portion of the DOM to display the dealer's current total.
  function updateDealerDom(){
      timer(100)
    if (dealerTotal > 100 && dealerTotalWithAce > 100){
      dealerDom.innerText = `DEALER BUSTS! `
    } else if (dealerTotalWithAce === 21 || dealerTotal === 21){
        dealerDom.innerText = `DEALER HAS 21!`
    } else if (dealerHasAce === true && dealerTotalWithAce < 20) {
      dealerDom.innerText = `DEALER HAS SOFT ${dealerTotalWithAce}. `
    } else {
        dealerDom.innerText = `DEALER HAS ${dealerTotal}. `
    }
  }