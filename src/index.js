fetch("http://localhost:3000/recipes")
.then(resp => resp.json())
.then(recipeArray => renderCards(recipeArray))

// DOM Selectors
const cardContainer = document.querySelector('div.search-result')



// Example Html Card
/* <div class="item">
            <img src="./assets/brownie.jpeg" alt="recipe img">
            <!-- <div class="flex-container"> -->
              <button type="button" class="collapsible">Open Collapsible</button>
              <div class="content">
                <p>Lorem ipsum...</p>
              </div>
            <!-- </div> -->
          </div> */


// RenderFunctions
function renderCards(recipeArray){
    recipeArray.forEach(recipe => {
        createCard(recipe)
        //console.log(recipe)
    })
}



// Callback Functions
function createCard(recipe){
    let recipeName = recipe.name
    let recipeImage = recipe.image
    
    const card = document.createElement('div')
    card.setAttribute("class", "item")
    
    const recipeImageDOM = document.createElement('img')
    recipeImageDOM.src = recipeImage
    
    const detailsBtn = document.createElement('button')
    detailsBtn.setAttribute("class", recipeName)
    const ingredients = document.createElement('div')
    ingredients.setAttribute('class', 'content')
    detailsBtn.textContent = recipeName
    
    const ingredientList = recipe.ingredients
    const ul = document.createElement('ul')

    ingredientList.forEach(ingredient => {
        let ingredientName = ingredient.ingredient
        let ingredientAmount = ingredient.amount
        let ingredientUnit = ingredient.unit
        
        const li = document.createElement('li')
        li.textContent = `${ingredientAmount} ${ingredientUnit} ${ingredientName} `
        ul.append(li)
    })
    
    const recipieInstruct = recipe.instructions

    const ol = document.createElement('ol')

    recipieInstruct.forEach(instruction => {
        const li = document.createElement('li')
        li.textContent = instruction.instruction
        ol.append(li)
    })
    

    card.append(recipeImageDOM)
    card.append(detailsBtn)
    detailsBtn.append(ingredients)
    ingredients.append(ul)
    ingredients.append(ol)
    cardContainer.append(card)
    
    let coll = document.getElementsByClassName(recipeName);
    //console.log(recipeBtn)
    
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        if (ingredients.style.display === "block") {
          ingredients.style.display = "none";
        } else {
          ingredients.style.display = "block";
        }
      });
    }

}

const form = document.querySelector('.new-recipe')
//console.log(form)
form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  newRecipeTitle = document.querySelector('.recipe-name').value
  newImage = document.querySelector('.image').value
  newIngredient = document.querySelector('.ingredient')
  let newRecipe = {
    name: newRecipeTitle,
    image: newImage,
    ingredient: newIngredient 
  }
  e.target.reset()
  console.log(newRecipe)
}