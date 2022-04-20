
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
document.getElementById('deal').addEventListener('click', deal)

function deal(){
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        document.getElementById('dealerFirstCard').style.visibility = 'visible'
        document.getElementById('playerFirstCard').src = data.cards[0].image
        document.getElementById('playerSecondCard').src = data.cards[1].image
        document.getElementById('dealerSecondCard').src = data.cards[2].image
    })
        .catch(err => {
        console.log(`error ${err}`)
});
}

//add option for hit or stay

//once stay have dealer down card revealed and hit until dealerTotal > 17

//compare to find winner

//reset playing field

