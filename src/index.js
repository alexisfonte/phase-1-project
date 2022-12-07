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

fetch("http://localhost:3000/recipes")
.then(resp => resp.json())
.then(recipeArray => renderCards(recipeArray))

// DOM Selectors
const cardContainer = document.querySelector('div.search-result')
const addIngredient = document.querySelector('.add')
addIngredient.addEventListener('click', (e) => addNewIngredientInput(e))

const form = document.querySelector('.new-recipe')
form.addEventListener('submit', handleSubmit)

let currentRecipe = {}



// RenderFunctions
function renderCards(recipeArray){
    recipeArray.forEach(recipe => {
        createCard(recipe)
    })
}



// Callback Functions
function createCard(recipe){
  currentRecipe = recipe

  const recipeName = recipe.name
  const recipeImage = recipe.image
  const ingredientList = recipe.ingredients
  const recipieInstruct = recipe.instructions
    
    const card = document.createElement('div')
    card.setAttribute("class", "item")
    
    const recipeImageDOM = document.createElement('img')
    recipeImageDOM.src = recipeImage
    
    const detailsBtn = document.createElement('button')
    detailsBtn.setAttribute("class", recipeName)
    detailsBtn.textContent = recipeName
    
    const ingredients = document.createElement('div')
    ingredients.setAttribute('class', 'content')
    
    const ul = document.createElement('ul')
    
    ingredientList.forEach(ingredient => {
        let ingredientName = ingredient.ingredient
        let ingredientAmount = ingredient.amount
        let ingredientUnit = ingredient.unit
        
        const li = document.createElement('li')
        li.textContent = `${ingredientAmount} ${ingredientUnit} ${ingredientName} `
        ul.append(li)
    })
    

    const ol = document.createElement('ol')
    recipieInstruct.forEach(instruction => {
        const li = document.createElement('li')
        li.textContent = instruction.instruction
        ol.append(li)
    })
    
  
    const deleteRecipe = document.createElement('button')
    deleteRecipe.textContent = 'delete'
    deleteRecipe.addEventListener('click', (e) => {
      fetch(`http://localhost:3000/recipes/${currentRecipe.id}`,{
        method: 'DELETE'
      })
      .then(resp => resp.json())
      card.remove()
    })
    
    card.append(recipeImageDOM)
    card.append(detailsBtn)
    detailsBtn.append(ingredients)
    ingredients.append(ul)
    ingredients.append(ol)
    ol.append(deleteRecipe)
    cardContainer.append(card)
    
    // Functionality for the collapsible recipie details

    let coll = document.getElementsByClassName(recipeName);
 
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        currentRecipe = recipe
        this.classList.toggle("active");
        if (ingredients.style.display === "block") {
          ingredients.style.display = "none";
        } else {
          ingredients.style.display = "block";
        }
      });
    }
    
}

function handleSubmit(e) {
  e.preventDefault()
  newRecipeTitle = document.querySelector('.recipe-name').value
  newImage = document.querySelector('.image').value
  newIngredient = document.querySelector('.ingredient').value
  ingredientMeasurement = document.querySelector('.measurement').value
  newDirections = document.querySelector('.directions').value
  newAmount = document.querySelector('.amount').value
  
  fetch('http://localhost:3000/recipes',{
    method: 'POST',
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
    },
        body: JSON.stringify({
          name: newRecipeTitle,
        image: newImage,
        ingredients:  [{
          ingredient: newIngredient,
          amount: newAmount,
          unit: ingredientMeasurement,
        }],
        instructions: [{
          instruction: newDirections,
      }]
    })
  })
  .then(resp => resp.json())
  .then(newPost => createCard(newPost))
  e.target.reset()
}

function addNewIngredientInput(e){
  e.preventDefault()
  console.log(e)
  const newInputSection = document.createElement('div')
  
  const ingredientInput = document.createElement('input')
  ingredientInput.setAttribute('class', 'ingredient')
  ingredientInput.setAttribute('placeholder', 'ingredient')
  
  const amountInput = document.createElement('input')
  amountInput.setAttribute('class', 'amount')
  amountInput.setAttribute('placeholder', 'amount')
  console.log(amountInput)

  const deleteBtn = document.createElement('a')
  deleteBtn.setAttribute('href', '#')  
  deleteBtn.textContent = 'x'
  newInputSection.append(ingredientInput)
  newInputSection.append(amountInput)
  newInputSection.append(deleteBtn)
  document.querySelector('.ingredient-section').appendChild(newInputSection)
}