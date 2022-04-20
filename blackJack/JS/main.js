
//get deck
let deckId =''
fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=5`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckId = data.deck_id
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
//draw starting cards 
let dealerDownCard 
document.getElementById('deal').addEventListener('click', deal)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stay').addEventListener('click', stay)
document.getElementById('reset').addEventListener('click', reset)

function deal(){
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        const img0 = document.createElement('img')
        img0.src = data.cards[0].image
        document.getElementById('bottom').appendChild(img0)
        const img1 = document.createElement('img')
        img1.src = data.cards[1].image
        document.getElementById('bottom').appendChild(img1)
        const img3 = document.createElement('img')
        img3.setAttribute('id', 'dealerFirstCard')
        img3.src = "assets/images/backOfCard.png"
        document.getElementById('top').appendChild(img3)
        const img2 = document.createElement('img')
        img2.src = data.cards[2].image
        document.getElementById('top').appendChild(img2)
        dealerDownCard = data.cards[3]
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
        document.getElementById('dealerFirstCard').src = dealerDownCard.image
        const img = document.createElement('img')
        img.src = data.cards[0].image
        document.getElementById('top').appendChild(img) 
    })
        .catch(err => {
        console.log(`error ${err}`)
});
}
//function to extract values of cards

//compare to find winner

//reset playing field
function reset(){
    document.getElementById('top').replaceChildren()
    document.getElementById('bottom').replaceChildren()
}
