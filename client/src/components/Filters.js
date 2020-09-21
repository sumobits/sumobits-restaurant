/**
 * @format
 */
import React from 'react';
import './Filters.css';

export default class Filters extends React.PureComponent {
    render () {
        const { 
            genres,
            states, 
            onGenreSelect, 
            onStateSelect,  
        } = this.props;

        return (
            <div className='filterContainer'>
                <div className='filterState'>
                    <input className='filterStateInput' list='states' 
                        name='states' placeholder='Filter by State' onChange={e=> { console.log(onStateSelect(e.target.value)) }} />
                    <datalist id='states'>
                        {
                            states.map(state => {
                                return ( 
                                    <option key={ state } value={ state } />
                                );
                            })
                        }
                    </datalist>
                </div>
                <div className='filterGenre'>
                    <input list='genres' name='genres' 
                        placeholder='Filter by Genre' onChange={e => { onGenreSelect(e.target.value) }} />
                    <datalist id='genres'>
                        {
                            genres.map(genre => {
                                return (
                                    <option key={ genre } value={ genre } />
                                );
                            })
                        }
                    </datalist>
                </div>
            </div>
        );
    }
}
