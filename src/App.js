import React, { Component } from 'react';
import './App.css';
import IngredientList from './components/IngredientList.js';
import RecipeList from './components/RecipeList';
import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:3001/`
})


class App extends Component{
    state = {
        // IngredientsIds: [], // array of ingredients id
        Ingredients: [], // array of ingredients id
        RecipesPossibleHash: {},
        RecipesPossible: [],  // maintain Hash and array for props processing in RecipeList
        RecipesAll: [],
        FridgeId: 1
    }

    constructor(props) {
        super();
        this.retrieveRecipesList = this.retrieveRecipesList.bind(this);
        this.addToFridge = this.addToFridge.bind(this)
        this.rmFromFridge = this.rmFromFridge.bind(this)
        this.addRecipe = this.addRecipe.bind(this)
        this.getFridge = this.getFridge.bind(this)
    }

    componentDidMount() {
        this.getFridge();
        // this.retrieveFridgeRecipesList();
        this.retrieveRecipesList();
    }

    updateWithRecipesPossible = (recipes) => {
        let my_hash = this.state.RecipesPossibleHash;
        recipes.map((recipe) => {
            my_hash[recipe.id] = recipe;
        });
        this.setState({RecipesPossibleHash: my_hash});
        this.setState({RecipesPossible: recipes});
    }

    updateWithRecipesPossibleHash = (recipesHash) => {
        let my_array = [];
        this.setState({RecipesPossibleHash: recipesHash});
        for (var key in recipesHash) {
            my_array.push(recipesHash[key]);
        }
        this.setState({RecipesPossible: my_array});
    }

    addToFridge = (ingredient) => {
        // this.setState({Ingredients: this.state.Ingredients.concat(ingredient)})
        api.post(`/fridges/${this.state.FridgeId}/add/${ingredient.id}`).then(res => {
            this.updateWithRecipesPossible(this.state.RecipesPossible.concat(res.data))
        });
    }

    rmFromFridge = (ingredient) => {
        let index = this.state.Ingredients.indexOf(ingredient);
        if (index > -1) {
            this.setState({Ingredients: this.state.Ingredients.splice(index, 1)})
        }
        api.post(`/fridges/${this.state.FridgeId}/rm/${ingredient.id}`).then(res => {
            let my_hash = this.state.RecipesPossibleHash;
            res.data.map((recipe) => {
                delete my_hash[recipe.id]
            })
            this.updateWithRecipesPossibleHash(my_hash)
        });
    }

    getFridge() {
        api.get(`/fridges/${this.state.FridgeId}`).then(res => {
            this.setState({Ingredients: res.data.ingredients});
            this.updateWithRecipesPossible(res.data.recipes)
        });
    }

    sendFridge() {
        api.put(`/fridges/${this.state.FridgeId}`).then(res => {
            this.retrieveFridgeRecipesList();
        });
    }

    // retrieveFridgeRecipesList() {
    //     api.get(`/fridges/${this.state.FridgeId}/recipes`).then(res => {
    //         // console.log('recipes');
    //         // console.log(res.data);
    //         this.setState({RecipesPossible: res.data});
    //     });
    // }

    retrieveRecipesList() {
        api.get('/recipes').then(res => {
            this.setState({RecipesAll: res.data});
        });
    }

    addRecipe(recipe) {
        api.post(`/fridges/${this.state.FridgeId}/add_recipe/${recipe.id}`).then(res => {
            this.setState({Ingredients: res.data.ingredients});
            this.setState({RecipesPossible: this.state.RecipesPossible.concat(recipe)})
        });
    }

    render() {
        return (
            <div>
                <h1>Kitchen Fridge Combo 2020</h1>
                <IngredientList key={this.state.Ingredients} ingredients={this.state.Ingredients} addToFridge={this.addToFridge} rmFromFridge={this.rmFromFridge}/>
                <RecipeList name="Possible Recipes" list={this.state.RecipesPossible}/>
                <RecipeList name="Some recipes" list={this.state.RecipesAll} addRecipe={this.addRecipe}/>
            </div>
        );
    }
}

export default App;
