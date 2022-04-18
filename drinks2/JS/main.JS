document.getElementById('ingredient1').addEventListener('click', getDrinkListOne)
document.getElementById('ingredient2').addEventListener('click', getDrinkListTwo)
document.getElementById('popDom').addEventListener('click', compare)
let ingredientOne = []
let ingredientTwo = []
let commonIngredients = []


function getDrinkListOne(){
    let drink =document.getElementById('valueIngredient1').value
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        ingredientOne = data
      console.log(data)
        
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}


function getDrinkListTwo(){
    let drink =document.getElementById('valueIngredient2').value
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        ingredientTwo = data
      console.log(data)

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}


function compare(){
    commonIngredients = []
    document.getElementById('displayDrinks').innerHTML = ''
    for (let i = 0; i < ingredientOne.drinks.length; i++){
     for (let j = 0; j < ingredientTwo.drinks.length; j++){
         if( ingredientOne.drinks[i].idDrink === ingredientTwo.drinks[j].idDrink){
         commonIngredients.push(ingredientOne.drinks[i].strDrink)
         }
    }
    }
    document.getElementById('displayDrinks').innerHTML+= `<h3> ${commonIngredients.join(' </br> ')} </h3>`
}


