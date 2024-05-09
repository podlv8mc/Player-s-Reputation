import React, {useState, useEffect} from 'react';
import {useTable, usePagination, useFilters} from 'react-table';
import axios from "axios";
import domain from "@/domain";
import PaginationButtons from "@/components/table/components/PaginationButtons";

function MobTable({columns, openViewModal, url}) {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0)
    const [nullifaer, setNullifaer] = useState(0)

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
    } = useTable(
        {
            columns,
            data: data,
            initialState: {pageIndex: nullifaer, filters: [], pageSize: 1},
            manualPagination: true,
            pageCount: Math.ceil(total / 10),
        },
        useFilters,
        usePagination
    );

    useEffect(() => {
        axios.get(`${domain}${url}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setTotal(data.data.total)

        }).catch(() => {
            axios.post(`${domain}auth/jwt/refresh`, null, {
                headers: {
                    'refresh-token': `${localStorage.getItem("refresh_token")}`,
                }
            })
                .then((response) => {
                    localStorage.setItem("access_token", data.data.access_token)
                    localStorage.setItem("refresh_token", data.data.refresh_token)
                })
                .catch((error) => {
                    console.error(error);
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'authorization__wrap';
                    errorMessage.textContent = 'Авторизируйтесь!';
                    document.body.appendChild(errorMessage);

                    setTimeout(() => {
                        window.location.href = "/";
                    }, 2000);
                })
        })
    }, []);

    //=== /useEffect ===//

    useEffect(() => {
        axios.get(`${domain}${url}/?page=${pageIndex + 1}&size=1`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data1) => {
            setData(Array.isArray(data1.data.items) ? data1.data.items : []);
        })
    }, [pageIndex]);


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
                                <td key={index} className="table__body-cell-wrap">
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
                previousPage={previousPage}
                nextPage={nextPage}
                gotoPage={gotoPage}
                setNullifaer={setNullifaer}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
            />

            {/*<div className="pagination__mob-wrap">
                <button className="pagination__mob-btn" onClick={() => {
                    previousPage()
                    setNullifaer()
                }} disabled={!canPreviousPage}
                >
                    Предыдущая
                </button>
                <button className="pagination__mob-btn" onClick={() => {
                    nextPage()
                    setNullifaer()
                }} disabled={!canNextPage}>
                    Следующая
                </button>
            </div>*/}
        </>
    );
}

export default MobTable;