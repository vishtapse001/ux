// Constants for API endpoints
const API_URL = "https://www.themealdb.com/api/json/v1/1";
const SEARCH_URL = `${API_URL}/search.php`;
const RANDOM_URL = `${API_URL}/random.php`;
const RECIPE_OF_DAY_URL = `${API_URL}/latest.php`;

// DOM Elements
const homeLink = document.getElementById("home-link");
const searchLink = document.getElementById("search-link");
const recipeOfDayLink = document.getElementById("recipe-of-day-link");
const randomRecipesLink = document.getElementById("random-recipes-link");
const mainContent = document.getElementById("main-content");

// Event listeners for navigation
homeLink.addEventListener("click", showHomePage);
searchLink.addEventListener("click", showSearchPage);
recipeOfDayLink.addEventListener("click", showRecipeOfDayPage);
randomRecipesLink.addEventListener("click", showRandomRecipesPage);

// Initial page load
showHomePage();

// Function to fetch and display recipes by name
async function fetchRecipesByName(name) {
  try {
    const response = await fetch(`${SEARCH_URL}?s=${name}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return null;
  }
}

// Function to fetch and display a random recipe
async function fetchRandomRecipe() {
  try {
    const response = await fetch(RANDOM_URL);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    return null;
  }
}

// Function to fetch and display the recipe of the day
async function fetchRecipeOfDay() {
  try {
    const response = await fetch(RECIPE_OF_DAY_URL);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching recipe of the day:", error);
    return null;
  }
}

// Function to display recipes on the page
function displayRecipes(recipes) {
  mainContent.innerHTML = ""; // Clear previous content

  if (!recipes) {
    mainContent.innerHTML =
      "<p>Failed to fetch recipes. Please try again later.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
            <h2>${recipe.strMeal}</h2>
            <p>${recipe.strCategory}</p>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <p>${recipe.strInstructions}</p>
        `;
    mainContent.appendChild(recipeCard);
  });
}

// Event handlers for navigation links
function showHomePage(event) {
  event.preventDefault();
  mainContent.innerHTML = "<h1>Welcome to Food Recipe App</h1>";
}

async function showSearchPage(event) {
  event.preventDefault();
  const recipes = await fetchRecipesByName("chicken"); // Default search example
  displayRecipes(recipes);
}

async function showRecipeOfDayPage(event) {
  event.preventDefault();
  const recipe = await fetchRecipeOfDay();
  displayRecipes(recipe ? [recipe] : null);
}

async function showRandomRecipesPage(event) {
  event.preventDefault();
  const recipes = await fetchRandomRecipe();
  displayRecipes(recipes ? [recipes] : null);
}
