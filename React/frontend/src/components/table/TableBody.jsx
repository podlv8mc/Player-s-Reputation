import React from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

function TableBody({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Update to use 'page' instead of 'page'
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state: { pageIndex, globalFilter } = {}, // Destructure globalFilter with default value
        setGlobalFilter, // Add setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 }, // Initial page index and size
        },
        useGlobalFilter, // Use the global filter hook
        usePagination // Use the pagination hook
    );

    return (
        <>
            {/* Search input */}
            <input
                type="text"
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..."
            />

            {/* Table */}
            <table className="table" {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
            </div>
        </>
    );
}

export default TableBody;
