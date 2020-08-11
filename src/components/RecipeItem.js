import React, { Component } from 'react';

class RecipeItem extends Component {
    render() {
        return (
            <div>
                {this.props.name}
            </div>
        );
    }
}

export default RecipeItem;