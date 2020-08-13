import React, { Component } from 'react';

class RecipeItem extends Component {

    addRecipe = e => {
        e.preventDefault();
        this.props.addRecipe({id: this.props.id, name: this.props.name})
    }

    addRecipeButton = props => {
        if (props.addRecipe) {
            return <button onClick={this.addRecipe}>add misisng ingredients</button>
        }
    }

    render() {
        return (
            <div>
                {this.props.name}
                {this.addRecipeButton(this.props)}
            </div>
        );
    }
}

export default RecipeItem;