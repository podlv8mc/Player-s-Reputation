import React, {useState, useEffect} from 'react';
import {useTable, usePagination, useFilters} from 'react-table';
import axios from "axios";
import domain from "@/domain";
import PaginationButtons from "@/components/table/components/PaginationButtons";

function MobTable({columns, openViewModal, apiLink, tot, setN, data, filteredData}) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        gotoPage,
        pageCount,
        state: {pageIndex},
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage,
        setFilter,
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: {pageIndex: 0, filters: [], pageSize: 1},
        },
        useFilters,
        usePagination
    );

    useEffect(() => {
        axios.get(`${domain}${apiLink}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((response) => {
            console.log(response.data);
            console.log(response.data.total);
            console.log(typeof response.data.total);
            const totalPages = Math.ceil(Number(response.data.total) / 100);
            console.log("Total pages:", totalPages);
            setN(totalPages);
            if (totalPages > 1) {
                const requests = [];
                for (let im = 0; im < totalPages; im++) {
                    requests.push(
                        axios.get(`${domain}${apiLink}/?page=${im + 1}&size=100`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                            }
                        })
                    );
                }
                Promise.all(requests)
                    .then((responses) => {
                        const newData = responses.flatMap(response => response.data.items);
                        setData(newData);
                    })
                    .catch((error) => {
                        console.error("Error fetching pages data:", error);
                    });
            } else {
                console.log("Total data:", tot);
                axios.get(`${domain}${apiLink}/?page=1&size=100`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                }).then((data1) => {
                    setData(data1.data.items);
                    console.log("Page 1 data:", tot);
                }).catch((error) => {
                    console.log("Error fetching page 1 data:", error);
                });
            }

        }).catch(() => {
            axios.post(`${domain}auth/jwt/refresh`, null, {
                headers: {
                    'refresh-token': `${localStorage.getItem("refresh_token")}`,
                }
            }).then((response) => {
                localStorage.setItem("access_token", data.data.access_token);
                localStorage.setItem("refresh_token", data.data.refresh_token);
            }).catch((error) => {
                console.error("Refresh token error:", error);
                const errorMessage = document.createElement('div');
                errorMessage.className = 'authorization__wrap';
                errorMessage.textContent = 'Авторизируйтесь!';
                document.body.appendChild(errorMessage);

                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            });
        });
    }, []);

    return (
        <>
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
                        <tr className="table__body" {...row.getRowProps()}
                            onClick={() => openViewModal(row.original)}>
                            {row.cells.map((cell, index) => (
                                <td key={index}
                                    className={`table__body-cell-wrap ${index === 0 ? 'hidden' : ''}`}>
                                >
                                    <div key={index} className="table__body-cell truncate">
                                        {cell.render('Cell')}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>

            <PaginationButtons
                pageIndex={pageIndex}
                pageCount={pageCount}
                gotoPage={gotoPage}
            />
        </>
    );
}

export default MobTable;