import React, {useState, useEffect} from 'react';
import {useTable, usePagination, useFilters} from 'react-table';
import axios from "axios";
import domain from "@/domain";
import Images from '@/image/image';
import Modal from '@/components/main/modal/Modal';
import TableFilter from "@/components/table/components/FundsFilter";
import SelectSigns from "@/components/table/components/SelectSigns";

function Table({apiLink, columns, inputLabels, newUserData, setNewUserData }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterInput, setFilterInput] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUserData, setEditingUserData] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterInputVisible, setFilterInputVisible] = useState(false);
    const [fundSelect, setfundSelect] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [filterValue, setFilterValue] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [total, setTotal] = useState(0)
    const [nullifaer, setNullifaer] = useState(0)

    const [tot, setTot] = useState([]);
    const [n, setN] = useState(0);






    //===----- Table -----===//

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
            initialState: {pageIndex: 0, filters: []},
        },
        useFilters,
        usePagination
    );

    //===----- / Table -----===//

    //===----- Connection -----===//

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
            }  else {
                console.log("Total data:", tot);
                axios.get(`${domain}${apiLink}/?page=1&size=100`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                }).then((data1) => {
                    setTot(data1.data.items);
                    setData(tot);
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

    //===----- / Connection -----===//


    //===----- UseEffect -----===//

    useEffect(() => {
        setFilteredData(
            data.filter(item =>
                Object.values(item).some(value =>
                    value && value.toString().toLowerCase().includes(filterInput.toLowerCase())
                )
            )
        );
    }, [data, filterInput]);

    useEffect(() => {
        axios.get(`${domain}funds`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setfundSelect(data);
        }).catch(() => {

        })
    }, []);

    useEffect(() => {
        if (filterValue) {
            setFilteredData(data.filter(row => row.fund.name === filterValue));
        } else {
            setFilteredData(data);
        }
    }, [data, filterValue]);

    //===----- / UseEffect -----===//

    //===----- Resize -----===//

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    //===----- / Resize -----===//

    //===----- Modal Window -----===//



    //===----- / Modal Window -----===//

    //===----- Buttons -----===//

    const toggleFilterInput = () => {
        setFilterInputVisible(!filterInputVisible);
        setFilterInput('');
    };

    //===----- / Buttons -----===//











    //===----- Inputs -----===//
    //===----- / Inputs -----===//
    //===----- Inputs -----===//
    //===----- / Inputs -----===//
    //===----- Inputs -----===//
    //===----- / Inputs -----===//

    return (
        <>
            <div className="table__top-wrap">
                <div className="table__top-box">
                    <div className="table__top-select">

                    </div>
                    <div className="table__top">
                        <input
                            className={filterInputVisible ? "input__search" : "input__search input__search-op"}
                            value={filterInput}
                            onChange={e => setFilterInput(e.target.value)}
                            placeholder="Поиск..."
                        />
                        <button className="table__top-btn table__top-btn-1" onClick={toggleFilterInput}>
                            <img src={Images.search} alt="search"/>
                        </button>
                        <button className="table__top-btn" onClick={openModal}>
                            <img src={Images.add} alt="add"/>
                        </button>
                    </div>
                </div>
            </div>


            {windowWidth >= 800 ? (
                <h1 className="">
                    1
                </h1>
            ) : (
                <h1 className="">
                    2
                </h1>
            )}
        </>
    );
}

export default Table;