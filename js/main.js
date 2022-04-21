//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getDrink)

function getDrink() {
    let drink = document.querySelector('input').value


    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data.drinks[0])
            document.querySelector('h2').innerText = data.drinks[0].strDrink
            document.querySelector('img').src = data.drinks[0].strDrinkThumb
            // //the indredients

         

            let arr = [];
            for (let j = 1; j < 16; j++) {
                if (data.drinks[0]["strIngredient" + j] !== null) {
                    if (data.drinks[0]["strMeasure" + j] == null) {
                        data.drinks[0]["strMeasure" + j] = "";
                    }
                    let finalText = `${data.drinks[0]["strMeasure" + j]} ${data.drinks[0]["strIngredient" + j]
                        }`;
                    arr.push(finalText);
                }
            }
            // console.log(arr)


            //an alternate solution to getting ingredients in an array
            // const arr = []

            // for (const [key, value] of Object.entries(data.drinks[0])){
            //   if (key.includes("strIngredient") && value){
            //     arr.push(value)
            //   }
            // }
            // console.log(arr)


            let ul = document.querySelector('ul')

            for (let l = 0; l < arr.length; l++) {
                let li = document.createElement('li')
                let ingredients = document.createTextNode(arr[l])
                li.appendChild(ingredients);
                ul.appendChild(li)
            }

            document.querySelector('h3').innerText = data.drinks[0].strInstructions
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

//random drink button
document.querySelector('.random').addEventListener('click', getRandomDrink)

function getRandomDrink() {



    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data.drinks[0].strDrink)
            document.querySelector('h2').innerText = data.drinks[0].strDrink
            document.querySelector('img').src = data.drinks[0].strDrinkThumb
            let arr = [];
            for (let j = 1; j < 16; j++) {
                if (data.drinks[0]["strIngredient" + j] !== null) {
                    if (data.drinks[0]["strMeasure" + j] == null) {
                        data.drinks[0]["strMeasure" + j] = "";
                    }
                    let finalText = `${data.drinks[0]["strMeasure" + j]} ${data.drinks[0]["strIngredient" + j]
                        }`;
                    arr.push(finalText);
                }
            }
            // console.log(arr)


            let ul = document.querySelector('ul')

            for (let l = 0; l < arr.length; l++) {
                let li = document.createElement('li')
                let ingredients = document.createTextNode(arr[l])
                li.appendChild(ingredients);
                ul.appendChild(li)
            }
            document.querySelector('h3').innerText = data.drinks[0].strInstructions
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}
