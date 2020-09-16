/**
 * @format
 */
import React from 'react';
import { initCaps } from '../utils';
import './Table.css';

const visibleColumns = [
    'name', 
    'city', 
    'state', 
    'phone number', 
    'genre',
];

export default class Table extends React.PureComponent {
    onHeaderClick (header) {
        console.log(`Header ${header} clicked`);
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
                <tr>
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

    render () {
        const { data } = this.props;

        return (
            <div className='datagrid'>
                <table>
                    <thead>
                        { this.renderHeader(data[0]) }
                    </thead>
                    <tbody>
                        { this.renderBody(data) }
                    </tbody>
                </table>
            </div>
        );
    }
};
