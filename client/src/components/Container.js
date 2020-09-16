/**
 * @format
 */
import React from 'react';
import Filters from './Filters';
import Table from './Table';
import { getObjectPropertyValues } from '../utils';

const endpoint = 'http://localhost:3000/restaurants';

const sortDataByName = prop => {
    return (obj1, obj2) => {
        const val1 = obj1[prop].toUpperCase();
        const val2 = obj2[prop].toUpperCase();

        if (val1 < val2) {
            return -1;
        }
        else if (val1 > val2) {
            return 1;
        }
        else {
            return 0;
        }
    };
};

export default class RestrauntContainer extends React.PureComponent {
    constructor(){
        super();
        this.state = {
            error: false,
            fetched: false,
            restaurants: [],
        }
    }
    
    componentDidMount () {
        fetch(endpoint)
            .then( res => res.json())
            .then( 
                data => {
                    this.setState({
                        fetched: true,
                        restaurants: data.data,
                    })
                },
                e => {
                    this.setState({
                        error: e,
                        fetched: true,
                    })
                }
            );
    }

    render () {
        const { 
            error, 
            fetched, 
            restaurants
        } = this.state;

        if (error) {
            return <div>Error: Fetching data failed: {error.message}</div>
        }
        else if (!fetched) {
            return <div>Loading ....</div>
        }
        else {
            const sortedRestraunts = restaurants.sort(sortDataByName('name'));
            const states = restaurants.map(restaurant => {
                return getObjectPropertyValues(restaurant, 'state');
            });
            const genres = restaurants.map(restaurant => {
                return getObjectPropertyValues(restaurant, 'genre');
            });

            return (
                <div>
                    <Filters genres={ [...new Set(genres)] } states={ [...new Set(states)] } />
                    <Table data={ sortedRestraunts } />
                </div>
            );
        }
    }
}
