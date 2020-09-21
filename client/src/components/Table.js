/**
 * @format
 */
import React from 'react';
import { initCaps , sortObjectByProp} from '../utils';
import './Table.css';

const pageSize = 10;

const visibleColumns = [
    'name', 
    'city', 
    'state', 
    'phone number', 
    'genre',
];

export default class Table extends React.PureComponent {
    constructor (props) {
        super();
        this.state = {
            currentPage: 0,
            restaurants: props.data,
            sortBy: 'name',
        };
    }

    onNextPage () {
        this.setState({
            currentPage: (this.state.currentPage + pageSize),
        });
    }

    onPreviousPage () {
        if (this.state.currentPage !== 0) {
            this.setState({
                currentPage: (this.state.currentPage - pageSize),
            });
        }
    }

    onHeaderClick (header) {
        this.setState({
            sortBy: header,
        });
    }

    onRowClick (row) {
        console.log(`Row ${row.id} clicked, show modal`);
    }

    renderHeader (headerRow) {
        if (!headerRow) return;

        return (
            <tr>
                { 
                    Object.keys(headerRow).map(key => {
                        if (visibleColumns.indexOf(key) !== -1) {
                            return (
                                <th key={key} onClick={e => { this.onHeaderClick(key) }}>
                                    { initCaps(key) }
                                </th>
                            )
                        }
                        return null;
                    }) 
                }
            </tr>
        );
    }

    renderBody (rows) {
        if (!rows) return;
        
        return rows.map(row => {
            let fields = [];

            for (let key in row) {
                if (row.hasOwnProperty(key) && visibleColumns.indexOf(key) !== -1) {
                    fields.push(row[key]);
                }
            }

            return (
                <tr key={row.id} onClick={e => { this.onRowClick(row) }}>
                    {
                        fields.map(field => {
                            return(
                                <td key={row.id + '-' + field}>
                                    { field }
                                </td>
                            )
                        })
                    }
                </tr>
            )
        });
    }

    renderFooter (count) {
        const renderPageButtons = () => {
            let buttons = [];
            for (let pageCount = 0; pageCount < count; pageCount++) {
                buttons.push((
                    <li key={pageCount}>
                        <button className="active">
                            <span>
                                {pageCount + 1}
                            </span>
                        </button>
                    </li>
                ));
            }

            return buttons;
        };

        return (
                <tr className='paging'>
                    <td colSpan={ count }>
                        <ul>
                            <li>
                                <button onClick={this.onPreviousPage}>
                                    <span>Previous</span>
                                </button>
                            </li>
                            {
                                renderPageButtons()
                            }
                            <li>
                                <button onClick={this.onNextPage}>
                                    <span>Next</span>
                                </button>
                            </li>
                        </ul>
                    </td>
                </tr>
        );
    }

    render () {
        const { restaurants, sortBy } = this.state;
        const numPages = Math.ceil(restaurants.length / pageSize);

        return (
            <div className='datagrid'>
                <table>
                    <thead>
                        { this.renderHeader(restaurants[0]) }
                    </thead>
                    <tfoot>
                        { this.renderFooter(numPages) }
                    </tfoot>
                    <tbody>
                        { this.renderBody(restaurants.sort(sortObjectByProp(sortBy))) }
                    </tbody>
                </table>
            </div>
        );
    }
};
