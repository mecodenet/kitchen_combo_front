import React, { Component } from 'react';
import './App.css';
import IngredientList from './components/IngredientList.js';
import RecipeList from './components/RecipeList';
import RecipeAllList from './components/RecipeAllList';


class App extends Component{

    constructor(props){
        super();
    }

    render() {
        return (
            <div>
                <h1>Kitchen Fridge Combo 2020</h1>
                <IngredientList/>
                <RecipeList list={[]}/>
                <RecipeAllList list={[]}/>
            </div>
        );
    }
}

export default App;
