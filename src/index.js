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
const cardContainer = document.querySelector('div.card-container')
const addIngredient = document.querySelector('.add')
addIngredient.addEventListener('click', (e) => addNewIngredientInput(e))

const addDirection = document.querySelector('.addDirection')
addDirection.addEventListener('click', (e) => addNewDirectionInput(e))


const form = document.querySelector('.new-recipe')
form.addEventListener('submit', handleSubmit)

const plusBtn = document.querySelectorAll('a#add')

plusBtn.forEach( btn =>
  btn.addEventListener('mouseenter', (event) => {
    btn.style.backgroundColor = 'black';
    setTimeout(() => {
      btn.style.backgroundColor = "rgb(150, 210, 150)";
    }, 500);
  }, false)
  )

// RenderFunctions
function renderCards(recipeArray){
  recipeArray.forEach(recipe => {
    createCard(recipe)
  })
}



// Callback Functions
function createCard(recipe){
  const recipeName = recipe.name
  const recipeImage = recipe.image
  const ingredientList = recipe.ingredients
  const recipieInstruct = recipe.instructions
  
  const card = document.createElement('div')
  card.setAttribute("class", "item")
  
  const recipeImageDOM = document.createElement('img')
  recipeImageDOM.src = recipeImage
  
  
  const detailsBtn = document.createElement('button')
  detailsBtn.setAttribute("id", "details-button")
  detailsBtn.setAttribute("class", recipeName)
  detailsBtn.textContent = recipeName
  
  const ingredients = document.createElement('div')
  ingredients.setAttribute('class', 'content')
  
  const ul = document.createElement('ul')
  
  ingredientList.forEach(ingredient => { 
    const li = document.createElement('li')
    li.textContent = ingredient
    ul.append(li)
  })
  
  const ol = document.createElement('ol')
  recipieInstruct.forEach(instruction => {
    const li = document.createElement('li')
    li.textContent = instruction
    ol.append(li)
  })
  
  const buttonsDiv = document.createElement('div')
  buttonsDiv.setAttribute('class', 'buttonsDiv')
  
  const favoritesButton = document.createElement('button')
  favoritesButton.setAttribute('class', 'favorites')
  favoritesButton.textContent = "Add to Favorites"
  favoritesButton.addEventListener('click', (e) => {
    recipe.tags = !recipe.tags
    favoritesButton.textContent = recipe.tags ? "Add to Favorites" : "Favorited"
    
    fetch(`http://localhost:3000/recipes/${recipe.id}`,{
      method: 'PATCH',
      body: JSON.stringify({
        tags: !recipe.tags
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(resp => resp.json())
    
  })
  
  const deleteRecipe = document.createElement('button')
  deleteRecipe.textContent = 'Delete'
  deleteRecipe.addEventListener('click', (e) => {
    fetch(`http://localhost:3000/recipes/${recipe.id}`,{
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
  ol.append(buttonsDiv)
  buttonsDiv.append(favoritesButton)
  buttonsDiv.append(deleteRecipe)
  cardContainer.append(card)
  
  // Functionality for the collapsible recipie details
  
  let coll = document.getElementsByClassName(recipeName);
  
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


function handleSubmit(e) {
  e.preventDefault()
  newRecipeTitle = document.querySelector('.recipe-name').value
  
  
  newImage = document.querySelector('.image').value
  
  newIngredient = document.querySelectorAll('input.ingredient')
  let ingredientArray = []
  newIngredient.forEach(ingredient => {
    ingredientArray.push(ingredient.value)
  })
  
  newAmount = document.querySelectorAll('input.amount')
  let amountArray = []
  newAmount.forEach(amount => {
    amountArray.push(amount.value)
  })
  ingredientMeasurement = document.querySelectorAll('select')
  let measurementArray=[]
  ingredientMeasurement.forEach(meas => {
    measurementArray.push(meas.value)
  })
  let totalIngredient = []
  
  ingredientArray.forEach((ingredient, index) => {
    const amount = amountArray[index]
    const measurement = measurementArray[index]
    totalIngredient.push(`${amount} ${measurement} ${ingredient}`)
  })
  
  const directionsObject = document.querySelectorAll('#new-direction input.direction')
  let instructionArray = []
  directionsObject.forEach(object => {
    instructionArray.push(object.value)
  })
  
  
  fetch('http://localhost:3000/recipes',{
    method: 'POST',
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
    },
    body: JSON.stringify({
      name: newRecipeTitle,
      image: newImage,
      tags: false,
      ingredients: totalIngredient,
      instructions: instructionArray,
    })
  })
  .then(resp => resp.json())
  .then(newPost => createCard(newPost))
  const deleteB = document.querySelectorAll('#delete-button')
  console.log(deleteB)
  deleteB.forEach(button =>{
    button.parentNode.remove()
  })
  e.target.reset()
}


function addNewIngredientInput(e){
  e.preventDefault()
  const newInputSection = document.createElement('div')
  newInputSection.setAttribute('id', 'new-ingredient')
  
  const ingredientInput = document.createElement('input')
  ingredientInput.setAttribute('class', 'ingredient')
  ingredientInput.setAttribute('placeholder', 'ingredient')
  
  const amountInput = document.createElement('input')
  amountInput.setAttribute('class', 'amount')
  amountInput.setAttribute('placeholder', 'amount')
  
  const dropdown = document.createElement('select')
  const  select = document.createElement('option')
  select.setAttribute('value', 'select')
  select.setAttribute('id', 'select')
  select.textContent = select.value
  const cups = document.createElement('option')
  cups.setAttribute('value', 'cups')
  cups.textContent = 'c'
  const tbsp = document.createElement('option')
  tbsp.setAttribute('value', 'tablespoons')
  tbsp.textContent = 'tbsp'
  const tsp = document.createElement('option')
  tsp.setAttribute('value', 'teaspoons')
  tsp.textContent = 'tsp'
  const gal = document.createElement('option')
  gal.setAttribute('value', 'gallon')
  gal.textContent = 'gal'
  const qt = document.createElement('option')
  qt.setAttribute('value', 'quart')
  qt.textContent = 'qt'
  const pt = document.createElement('option')
  pt.setAttribute('value', 'pint')
  pt.textContent = 'pt'
  const floz = document.createElement('option')
  floz.setAttribute('value', 'fluid ounce')
  floz.textContent = 'floz'
  const ml = document.createElement('option')
  ml.setAttribute('value', 'milliliters')
  ml.textContent = 'ml'
  const liters = document.createElement('option')
  liters.setAttribute('value', 'liters')
  liters.textContent = 'liters'
  const oz = document.createElement('option')
  oz.setAttribute('value', 'ounces')
  oz.textContent = 'oz'
  const lbs = document.createElement('option')
  lbs.setAttribute('value', 'pounds')
  lbs.textContent = "pounds"
  const g = document.createElement('option')
  g.setAttribute('value', 'grams')
  g.textContent = 'g'
  const ea = document.createElement('option')
  ea.setAttribute('value', 'each')
  ea.textContent = 'ea'
  const none = document.createElement('option')
  none.setAttribute('value', '')
  none.textContent = ''
  
  const deleteBtn = document.createElement('a')
  deleteBtn.setAttribute('href', '#')
  deleteBtn.setAttribute('id', 'delete-button')  
  deleteBtn.textContent = 'x'
  deleteBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    deleteBtn.parentNode.remove()
  })
  
  newInputSection.append(ingredientInput)
  newInputSection.append(amountInput)
  newInputSection.append(dropdown)
  dropdown.append(select)
  dropdown.append(cups)
  dropdown.append(tbsp)
  dropdown.append(tsp)
  dropdown.append(gal)
  dropdown.append(qt)
  dropdown.append(pt)
  dropdown.append(floz)
  dropdown.append(ml)
  dropdown.append(liters)
  dropdown.append(oz)
  dropdown.append(lbs)
  dropdown.append(g)
  dropdown.append(ea)
  dropdown.append(none)
  newInputSection.append(deleteBtn)
  document.querySelector('.ingredient-section').appendChild(newInputSection)
}

function addNewDirectionInput(e){
  e.preventDefault()
  const newInputSection = document.createElement('div')
  newInputSection.setAttribute('id', 'new-direction')
  
  const directionInput = document.createElement('input')
  directionInput.setAttribute('class', 'direction')
  directionInput.setAttribute('placeholder', 'Directions:')

  const deleteBtn = document.createElement('a')
  deleteBtn.setAttribute('href', '#')
  deleteBtn.setAttribute('id', 'delete-button')  
  deleteBtn.textContent = 'x'
  deleteBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    deleteBtn.parentNode.remove()
  })

  newInputSection.append(directionInput)
  newInputSection.append(deleteBtn)
  document.querySelector('.addDirections').append(newInputSection)
}

