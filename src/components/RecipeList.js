import React, { Component } from 'react';
import RecipeItem from './RecipeItem.js';

class RecipeList extends Component {
    state = {
        list: []
    }

    render() {
        return (
            <div>
                <h2>Possible Recipes with my fridge's ingredients</h2>
                {
                    this.state.list.map((item, index) => {
                        return <RecipeItem key={index} name={item.name}/>
                    })
                }
            </div>
        );
    }
}

export default RecipeList;