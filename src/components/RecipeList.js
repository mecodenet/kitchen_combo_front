import React, { Component } from 'react';
import RecipeItem from './RecipeItem.js';
import equal from 'fast-deep-equal'

class RecipeList extends Component {
    state = {
        name: "",
        list: []
    }

    constructor(props) {
        super(props);
        this.state.list = props.list;
        this.state.name = props.name;
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.list, prevProps.list))
        {
            this.setState({
                list: this.props.list
            });
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.name}</h2>
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
