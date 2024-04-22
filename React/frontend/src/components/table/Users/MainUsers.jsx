import React, {useMemo, useState} from 'react';
import {useTable, usePagination, useFilters} from 'react-table';
import items from '../users.json'

function MainUsers() {
    const data = useMemo(() => items.items || [], [items]);


    const columns = React.useMemo(
        () => [
            {
                Header: 'Имя пользователя',
                accessor: 'username',
            },
            {
                Header: 'Емейл',
                accessor: 'email',
            },
        ],
        []
    );


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useFilters,
        usePagination
    );


    return (
        <main id="main" className="main">
            <div className="table__top-wrap">
                <div className="table__top-box">
                    <div className="table__top-select">

                    </div>
                    <div className="table__top">

                    </div>
                </div>
            </div>

            <table className="table" {...getTableProps()}>
                <thead className="table__header-wrap">
                {headerGroups.map(headerGroup => (
                    <tr className="table__header" {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th className="table__headers" {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className="table__body-wrap" {...getTableBodyProps()}>
                {page.map(row => {
                    prepareRow(row);
                    return (
                        <tr className="table__body" {...row.getRowProps()}>
                            {row.cells.map((cell, index) => (
                                <td key={index} className="table__body-cell truncate">{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </main>
    );
}

export default MainUsers;