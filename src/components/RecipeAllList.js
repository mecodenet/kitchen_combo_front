import React, { Component } from 'react';
import RecipeItem from './RecipeItem.js';
import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:3001/`
})

class RecipeAllList extends Component {
    state = {
        list: []
    }

    constructor(props){
        super(props);
        this.retrieveIngredientsList = this.retrieveIngredientsList.bind(this);
    }

    componentDidMount() {
        this.retrieveIngredientsList();
      }

    retrieveIngredientsList() {
        api.get('/recipes').then(res => {
            this.setState({list: res.data});
        });
    }

    render() {
        return (
            <div>
                <h2>All possible Recipes</h2>
                {
                    this.state.list.map((item, index) => {
                        return <RecipeItem key={index} name={item.name}/>
                    })
                }
            </div>
        );
    }
}

export default RecipeAllList;