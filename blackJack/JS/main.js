
//get deck
let deckId =''
let cardsLeft
let playerTotal = 0
let playerTotalWithAce = 0
let dealerTotal = 0
let dealerTotalWithAce = 0
let playerHasAce = false
let dealerHasAce = false
fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=10`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckId = data.deck_id
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


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
//draw starting cards 

document.getElementById('deal').addEventListener('click', deal)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stay').addEventListener('click', stay)
document.getElementById('reset').addEventListener('click', reset)
let imageSrc = "assets/images/backOfCard.png"
function deal(){
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

//add option for hit or stay
function hit(){
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        const img = document.createElement('img')
        img.src = data.cards[0].image
        document.getElementById('bottom').appendChild(img) 
 //       populateScores(data)
        cardsLeft = data.remaining
    })
        .catch(err => {
        console.log(`error ${err}`)
});
}
//once stay have dealer down card revealed and hit until dealerTotal > 17
function stay(){

    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        if (imageSrc === "assets/images/backOfCard.png" ) {
            imageSrc = data.cards[0].image
            document.getElementById('dealerFirstCard').src = data.cards[0].image
        } else {
            const img = document.createElement('img')
            img.src = data.cards[0].image
            document.getElementById('top').appendChild(img) 
            cardsLeft = data.remaining
 //           populateScores(data)
        }
    })
        .catch(err => {
        console.log(`error ${err}`)
});
}
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

function loopThroughCards(object){
    for (let i = 0; i < object.length; i++){
       let value = getValues(object[i].value)
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
    console.log(dealerTotal,playerTotal, playerTotalWithAce, dealerTotalWithAce)
    }
}
//compare to find winner

//reset playing field
function reset(){
    document.getElementById('top').replaceChildren()
    document.getElementById('bottom').replaceChildren()
    newDeck(cardsLeft)
}
