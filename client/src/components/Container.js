/**
 * @format
 */
import React from 'react';
import Filters from './Filters';
import Table from './Table';
import {
    collectProps,
    dedupeArray, 
} from '../utils';

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
            filteredRestraunts = false,
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
            const states = collectProps(sortedRestraunts, 'state');
            const genres = collectProps(sortedRestraunts, 'genre');
            const onGenreSelect = genre => {
                if (genre && genre.length) {
                    this.setState({
                        filteredRestraunts: sortedRestraunts.filter(restaurant =>
                            restaurant['genre'] === genre)
                    });
                } else {
                    this.setState({
                        filteredRestraunts: false,
                    });
                }
            };
            const onStateSelect = state => {
                if (state && state.length) {
                    this.setState({
                        filteredRestraunts: sortedRestraunts.filter(restaurant =>
                            restaurant['state'] === state)
                    });
                } else {
                    this.setState({
                        filteredRestraunts: false,
                    });
                }
            };

            return (
                <div>
                    <Filters 
                        genres={dedupeArray(genres)} 
                        states={dedupeArray(states)}
                        onGenreSelect={onGenreSelect}
                        onStateSelect={onStateSelect}
                    />
                    <Table data={ filteredRestraunts || sortedRestraunts } />
                </div>
            );
        }
    }
}
