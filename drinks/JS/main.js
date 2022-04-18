document.getElementById('enterButton').addEventListener('click', populateDrinks)
let strIngredients
function populateDrinks(){
    let drink =document.getElementById('drinkText').value
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      let drinkDisplay = document.getElementById('displayDrinks')
      drinkDisplay.innerHTML = ''
     //document.querySelector('img').src = data.drinks[0].strDrinkThumb
     for (let i = 0; i < data.drinks.length; i++){
            drinkDisplay.innerHTML += `<section class="drinks" ><section class="titleAndPic"><h1>${data.drinks[i].strDrink}</h1><img src='${data.drinks[i].strDrinkThumb}'></section><section class="ingredients"><h2>Ingredients</h2><p>${ingredients()}</p></section><section class="instructions"><h3>Instructions</h3><p>${splitString(data.drinks[i].strInstructions)}</section></section>`

            function ingredients(){
                let ingredients = []
                for (let iNew = 1; iNew < 16; iNew++){
                    if (data.drinks[i][`strIngredient${iNew}`] === null){break;}
                        ingredients.push(data.drinks[i][`strMeasure${iNew}`])
                        ingredients.push(`   `,data.drinks[i][`strIngredient${iNew}`], '</br>') 
                }
                
            //     let ingredientsArr =[]
            //     let measureArr = []
            //     for (const property in data.drinks[i]){
            //     if (property.includes('Ingredient') && data.drinks[i][property] !== null){
            //         ingredientsArr.push(data.drinks[i][property])
            //        // ingredients += `${data.drinks[i][property]} `
            //     }
            //     if (property.includes('Measure') && data.drinks[i][property] !== null){
            //         measureArr.push(data.drinks[i][property])
            //         //ingredients += `${data.drinks[i][property]} </br>`
            //     }
            // }
            //     for (let i = 0; i<ingredientsArr.length; i++){
            //         ingredients.push(measureArr[i] )
            //         ingredients.push(ingredientsArr[i] + '</br>')
            //     }
            console.log(ingredients)
            return ingredients.join('')
        }

    }
        function splitString(string){
            return string.split('. ').map(e => e+= ` </br>`).join('')
        }

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

