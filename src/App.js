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
        RecipesPossible: [],
        RecipesAll: [],
        FridgeId: 1
    }

    constructor(props) {
        super();
        this.retrieveRecipesList = this.retrieveRecipesList.bind(this);
        this.addToFridge = this.addToFridge.bind(this)
        this.rmFromFridge = this.rmFromFridge.bind(this)
        this.getFridge = this.getFridge.bind(this)
    }

    componentDidMount() {
        this.getFridge();
        this.retrieveFridgeRecipesList();
        this.retrieveRecipesList();
    }

    addToFridge = (ingredient) => {
        // console.log(`Calling add for ${ingredient.name}`);
        this.setState({Ingredients: this.state.Ingredients.concat(ingredient)})
        api.get(`/fridges/${this.state.FridgeId}/add/${ingredient.id}`).then(res => {
            this.setState({Ingredients: res.data.ingredients});
            // console.log(res.data.ingredients);
        });
    }

    rmFromFridge = (ingredient) => {
        // console.log(`Calling rm for ${ingredient.name}`);
        let index = this.state.Ingredients.indexOf(ingredient);
        if (index > -1) {
            this.setState({Ingredients: this.state.Ingredients.splice(ingredient, 1)})
        }
        api.get(`/fridges/${this.state.FridgeId}/rm/${ingredient.id}`).then(res => {
            this.setState({Ingredients: res.data.ingredients});
            // console.log(res.data.ingredients);
        });
    }

    getFridge() {
        api.get(`/fridges/${this.state.FridgeId}`).then(res => {
            // let ingredients_ids = res.data.ingredients.map(x => x['id'])
            // this.setState({IngredientsIds: ingredients_ids});
            this.setState({Ingredients: res.data.ingredients});
            // console.log(res.data.ingredients);
            // console.log(this.state.Ingredients);
            // console.log('get fridge');
        });
    }

    sendFridge() {
        api.put(`/fridges/${this.state.FridgeId}`).then(res => {
            // console.log('send fridge');
            // console.log(res.data);
            this.retrieveFridgeRecipesList();
        });
    }

    retrieveFridgeRecipesList() {
        api.get(`/fridges/${this.state.FridgeId}/recipes`).then(res => {
            // console.log('recipes');
            // console.log(res.data);
            this.setState({RecipesPossible: res.data});
        });
    }

    retrieveRecipesList() {
        api.get('/recipes').then(res => {
            this.setState({RecipesAll: res.data});
        });
    }

    render() {
        return (
            <div>
                <h1>Kitchen Fridge Combo 2020</h1>
                <IngredientList key={this.state.Ingredients} ingredients={this.state.Ingredients} addToFridge={this.addToFridge} rmFromFridge={this.rmFromFridge}/>
                <RecipeList name={"Possible Recipes"} list={this.state.RecipesPossible}/>
                <RecipeList name="Some random recipes" list={this.state.RecipesAll}/>
            </div>
        );
    }
}

export default App;
