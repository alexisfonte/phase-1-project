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

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
coll[i].addEventListener("click", function() {
this.classList.toggle("active");
var content = this.nextElementSibling;
if (content.style.display === "block") {
content.style.display = "none";
} else {
content.style.display = "block";
}
});
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
    
    
    const detailsBtn = document.createElement('button')
    detailsBtn.setAttribute("class", "collapsible")
    const ingredients = document.createElement('div')
    ingredients.setAttribute('class', 'content')
    detailsBtn.textContent = recipeName
    
    const p = document.createElement('p')
    p.textContent = 'ingredients'
    ingredients.append(p)
    card.append(recipeImageDOM)
    card.append(recipeFlex)
    recipeFlex.append(detailsBtn)
    detailsBtn.append(ingredients)
    cardContainer.append(card)
}
