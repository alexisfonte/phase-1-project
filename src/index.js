fetch("http://localhost:3000/recipes")
.then(resp => resp.json())
.then(recipeArray => renderCards(recipeArray))

// DOM Selectors
const cardContainer = document.querySelector('div.search-result')

// Example Html Card
// <div class="item">
//             <img src="./assets/brownie.jpeg" alt="recipe img">
//             <div class="flex-container">
//               <h1 class="title">Recipe Title</h1>
//               <a class="details-btn" href="#">View Recipe</a>
//             </div>
//           </div>


// RenderFunctions
function renderCards(recipeArray){
    recipeArray.forEach(recipe => {
        createCard(recipe)
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

       const recipeFlex = document.createElement('div')
       recipeFlex.setAttribute("class", "flex-container")

       const recipeNameDOM = document.createElement('h1')
       recipeNameDOM.setAttribute("class", "title")
       recipeNameDOM.textContent = recipeName

       const detailsBtn = document.createElement('a')
       detailsBtn.setAttribute("class", "details-btn")
       detailsBtn.setAttribute("href", "#")
       detailsBtn.textContent = "View Recipe"

       cardContainer.append(card)
       card.append(recipeImageDOM)
       card.append(recipeFlex)
       recipeFlex.append(recipeNameDOM)
       recipeFlex.append(detailsBtn)
}