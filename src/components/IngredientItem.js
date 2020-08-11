import React, { Component } from 'react';

class IngredientItem extends Component {
    state = {
        name: '',
        quantity: 0,
        unit: ''
    }

    constructor(props){
        super(props);
        this.state.name = props.name;
        this.state.quantity = props.quantity;
    }

    handleAddQuantity = e => {
        e.preventDefault();
        this.setState({
            quantity: this.state.quantity + 1
        });
    }


    handleRemoveQuantity = e => {
        e.preventDefault();
        if(this.state.quantity > 0)
            this.setState({
                quantity: this.state.quantity - 1
            });
    }

    render() {
        return (
            <div>
                {this.state.quantity} {this.state.unit} {this.state.name}
                <button onClick={this.handleAddQuantity}>add</button>
                <button onClick={this.handleRemoveQuantity}>remove</button>
            </div>
        );
    }
}

export default IngredientItem;