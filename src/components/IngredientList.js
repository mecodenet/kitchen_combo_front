import React, { Component } from 'react';
import IngredientItem from '../components/IngredientItem.js';

class IngredientList extends Component {
    state = {
        ingredients: []
    }

    constructor(props) {
        super(props);
        this.state.ingredients = props.ingredients;
    }

    componentDidMount() {
        // console.log('in the fridge');
        this.setState({ingredients: this.props.ingredients});
        // console.log(this.props);
    }

    render() {
        return (
            <div>
                <h2>My fridge (Ingredients list)</h2>
                {
                    this.state.ingredients.map((item, index) => {
                        return <IngredientItem key={index} name={item.name} id={item.id} quantity={1} addToFridge={this.props.addToFridge} rmFromFridge={this.props.rmFromFridge} />
                    })
                }
            </div>
        );
    }
}

export default IngredientList;