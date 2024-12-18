console.log("Welcome to Recipe APP");

const searchBox = document.querySelector(".searchBox");
const submit = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeClosebtn = document.querySelector(".recipe-closeBtn");

// console.log(search, submit,recipeContainer);

const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = `<h2>Fetching recipes...</h2>`;
    try {
        const data = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const respone = await data.json();
        // console.log(respone.meals);
        recipeContainer.innerHTML = "";
        respone.meals.forEach((meal) => {
            // console.log(meal);

        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
            <img class="recipe-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h4>${meal["strMeal"]}</h4>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> category</p>
        `;

        const button = document.createElement("button");
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Add event listener to the recipe button
        button.addEventListener("click", (e) => {
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
                });
    } catch (error) {
        recipeContainer.innerHTML = `<h2>Error in Fetching recipes...</h2>
        <h4>It might be you are entering wrong name or not available recipe..</h4>
        `;
    }
};

// function to feching ingredients
const fetchIngrediants = (meal) => {
    // console.log(meal);
    let ingedientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingedientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingedientsList;
};

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName" >${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientsList">${fetchIngrediants(meal)}</ul>
    <div class="instructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>

    `;
    recipeDetailsContent.parentElement.style.display = "block";
};

recipeClosebtn.addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

submit.addEventListener("click", (e) => {
    e.preventDefault(); // this will not refresh automatically we prevent it
    // console.log("submit clicked ");
    const searchInput = searchBox.value.trim();
    fetchRecipe(searchInput);
});

