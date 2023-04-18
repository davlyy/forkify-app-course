import { async } from 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import previewView from './views/previewView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime'

// if (module.hot){
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecepies(){
try{
  const id= window.location.hash.slice(1);
  if (!id) return;

  recipeView.renderSpinner();
  
  resultsView.update(model.getSearchResultsPage());
  
  await model.loadRecipe(id);
  
  
  recipeView.render(model.state.recipe)
  bookmarkView.update(model.state.bookmarks);
  
}catch(err){
    alert(err)
    recipeView.renderError();
  }
}

const controlSearchResults = async function(){
  try{

    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if(!query) return;
    

    await model.loadSearchResults(query)
    console.log(model.state.search.results);

    resultsView.render(model.getSearchResultsPage())


    paginationView.render(model.state.search);


  }catch(err){
    console.log(err);
  }
}

const controlPagination = function(goToPage){
  resultsView.render(model.getSearchResultsPage(goToPage))
  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  //Update the recipe servings (in state)
  model.updateServings(newServings)

  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
  //Update the recipeView
}

const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked)
  model.addBookmark(model.state.recipe);
    else{
 model.deleteBookmark(model.state.recipe.id)}
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks)
}

  const controlBookmarks = function(){
    bookmarkView.render(model.state.bookmarks)
  }


const controlAddRecipe = function(newRecipe){
  model.uploadRecipe(newRecipe)

}

const init = function(){
  bookmarkView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecepies)
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
}
init();



