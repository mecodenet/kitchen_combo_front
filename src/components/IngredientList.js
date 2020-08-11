import React, { Component } from 'react';
import IngredientItem from '../components/IngredientItem.js';
import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:3001/`
})

class IngredientList extends Component {
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
        api.get('/fridges/1').then(res => {
            this.setState({list: res.data.ingredients});
        });
    }

    render() {
        return (
            <div>
                <h2>My fridge (Ingredients list)</h2>
                {
                    this.state.list.map((item, index) => {
                        return <IngredientItem key={index} name={item.name} quantity={1} />
                    })
                }
            </div>
        );
    }
}

export default IngredientList;