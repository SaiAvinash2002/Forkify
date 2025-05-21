import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    // The fetch will creates a promise and then when we give await the code will wait till the promise is accepted or rejected. But this doesn't interrupts the main thread execution.

    if (!id) return;

    // Load Spinner
    recipeView.renderSpinner(recipeContainer);

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner(recipeContainer);
    // 1) Search the query
    const query = resultsView.getQuery();

    if (!query) return;
    // Quard class

    // 2) Load the query
    await model.loadSearchResults(query);

    // 3) Render the results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);

  searchView.addHandlerSearch(controlSearchResults);
};

init();
// Instead of writing this we can use the above one
// window.addEventListener('hashchange', showRecipe);
