import React, {useState, useEffect} from 'react';
import {useTable, usePagination, useFilters} from 'react-table';
import Modal from '@/components/main/modal/Modal';
import Images from '@/image/image';
import axios from "axios";
import TableFilter from "@/components/table/FundsFilter";
import SelectSigns from "@/components/table/SelectSigns";

function MainTable() {
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

    const [newUserData, setNewUserData] = useState({
        nicknameOld: "",
        room_name: "",
        first_name: "",
        last_name: "",
        middlename: "",
        description: "",
        amount: "",
        gipsyteam: "",
        neteller: "",
        pokerstrategy: "",
        mail: "",
        vk: "",
        google: "",
        skrill: "",
        wallets: "",
        country: "",
        town: "",
        address: "",
        facebook: "",
        blog: "",
        forum: "",
        instagram: "",
        ecopayz: "",
        webmoney_id: "",
        comments: "",
        old: true, //old всегда должен быть последним
    });

    const inputLabels = {


        nicknameOld: "Ники",
        last_name: "Фамилия",
        first_name: "Имя",
        room_name: "Дисциплина",
        middlename: "Отчество",
        description: "Описание",
        amount: "Ущерб",
        google: "Google",
        skrill: "Skrill",
        wallets: "Wallets",
        old: "Old",
        country: "Страна",
        town: "Город",
        address: "Адрес",
        gipsyteam: "Gipsy team",
        neteller: "Neteller",
        pokerstrategy: "Poker strategy",
        mail: "E-mail",
        vk: "Вконтекте",
        facebook: "Facebook",
        blog: "Блог",
        forum: "Форум",
        instagram: "Instagram",
        ecopayz: "Ecopayz",
        webmoney_id: "Webmoney",
        comments: "Комментарии",
    };

    useEffect(() => {
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/records', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setData(Array.isArray(data.data.items) ? data.data.items : []);
        }).catch(() => {
            axios.post("http://213-134-31-78.netherlands.vps.ac/api/v1/auth/jwt/refresh", null, {
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
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/funds', {
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

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const openViewModal = (user) => {
        setSelectedUser(user);
    };

    const closeViewModal = () => {
        setSelectedUser(null);
    };

    const openEditModal = (user) => {
        setEditingUserData(user);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setNewUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdAt = new Date().toISOString()
        const userDataWithTimestamp = {
            ...newUserData,
            createdAt: createdAt,
            fund_id: selectedOption ? selectedOption.value : null,
        }

        axios.post("http://213-134-31-78.netherlands.vps.ac/api/v1/records", userDataWithTimestamp, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .catch((error) => {
                console.error(error);
            });

        setIsModalOpen(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        axios.patch(`http://213-134-31-78.netherlands.vps.ac/api/v1/records/${editingUserData.id}`, editingUserData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((response) => {
                setIsEditModalOpen(false);
            })
            .catch((error) => {
                console.error(error);
            })

    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Фонд',
                accessor: row => row.fund.name,
            },
            {
                Header: 'Создано',
                accessor: row => {
                    const createdAt = new Date(row.created_at);
                    return `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')}`;
                },
            },
            {
                Header: 'Обновлено',
                accessor: row => {
                    const updatedAt = new Date(row.updated_at);
                    return `${updatedAt.getFullYear()}-${String(updatedAt.getMonth() + 1).padStart(2, '0')}-${String(updatedAt.getDate()).padStart(2, '0')}`;
                },
            },
            {
                Header: 'Ники',
                accessor: row => row.nicknameOld,
            },
            {
                Header: 'Дисциплина',
                accessor: row => row.room_name,
            },
            {
                Header: 'ФИО',
                accessor: row => {
                    const {first_name = '', last_name = '', middlename = ''} = row;
                    return `${first_name}${last_name ? ' ' + last_name : ''}${middlename ? ' ' + middlename : ''}`;
                },
            },
            {
                Header: 'Описание',
                accessor: row => row.description,
            },
            {
                Header: 'Ущерб',
                accessor: row => row.amount,
            },
            {
                Header: 'Gipsy team',
                accessor: row => row.gipsyteam,
            },
            {
                Header: 'Neteller',
                accessor: row => row.neteller,
            },
            {
                Header: 'Poker Strategy',
                accessor: row => row.pokerstrategy,
            },
            {
                Header: 'E-mail',
                accessor: row => row.mail,
            },
            {
                Header: 'Вконтакте',
                accessor: row => row.vk,
            },
            {
                Header: 'Google',
                accessor: row => row.google,
            },
            {
                Header: 'Skrill',
                accessor: row => row.skrill,
            },
            {
                Header: 'Wallets',
                accessor: row => row.wallets,
            },
            {
                Header: 'Страна',
                accessor: row => row.country,
            },
            {
                Header: 'Город',
                accessor: row => row.town,
            },
            {
                Header: 'Адрес',
                accessor: row => row.address,
            },
            {
                Header: 'Facebook',
                accessor: row => row.facebook,
            },
            {
                Header: 'Блог',
                accessor: row => row.blog,
            },
            {
                Header: 'Форум',
                accessor: row => row.forum,
            },
            {
                Header: 'Instagram',
                accessor: row => row.instagram,
            },
            {
                Header: 'Ecopayz',
                accessor: row => row.ecopayz,
            },
            {
                Header: 'Webmoney',
                accessor: row => row.webmoney_id,
            },
            {
                Header: 'Комментарии',
                accessor: row => row.comments,
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

    const TableMobile = () => {
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
                                    <div className="table__body-cell-wrap">
                                        <td key={index} className="table__body-cell truncate">{cell.render('Cell')}</td>
                                    </div>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div className="pagination__mob-wrap">
                    <button className="pagination__mob-btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Предыдущая
                    </button>
                    <button className="pagination__mob-btn" onClick={() => nextPage()} disabled={!canNextPage}>
                        Следующая
                    </button>
                </div>
            </>
        );
    };


    const handleFilterChange = (selectedOption) => {
        setFilterValue(selectedOption ? selectedOption.value : null);
    };


    const toggleFilterInput = () => {
        setFilterInputVisible(!filterInputVisible);
        setFilterInput('');
    };


    const ModalContent = (
        <Modal active={isModalOpen} setActive={setIsModalOpen} className="modal-scroll">
            <button className="modal__btn-close" onClick={() => setIsModalOpen(false)}/>
            <div className="table__modal-title">
                Добавить пользователя
            </div>
            <form className="table__modal-form-wrap" onSubmit={handleSubmit}>
                {Object.keys(newUserData).map((key, index, array) => (
                    <div className={`table__modal-row${index === array.length - 1 ? ' hidden' : ''}`} key={key}>
                        <label className="table__modal-cell-title" htmlFor={key}>
                            {inputLabels[key]}
                        </label>
                        <input
                            className="table__modal-cell"
                            id={key}
                            name={key}
                            value={newUserData[key]}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                ))}
                <SelectSigns onSelect={setSelectedOption}/>
                <button className="btn-hover table__btn" type="submit">
                    Добавить
                </button>
            </form>
        </Modal>
    );

    const EditModalContent = editingUserData && (
        <Modal active={isEditModalOpen} setActive={setIsEditModalOpen} className="edit-modal modal-scroll modal-bg">
            <div className="table__modal-title">
                Редактировать пользователя
            </div>
            <form className="table__modal-form-wrap" onSubmit={handleEditSubmit}>
                {Object.entries(newUserData).map(([key,], index, array) => (
                    <div className={`table__modal-row${index === array.length - 1 ? ' hidden' : ''}`} key={key}>
                        <label className="table__modal-cell-title" htmlFor={key}>
                            {inputLabels[key]}
                        </label>
                        <input
                            className="table__modal-cell"
                            id={key}
                            type="text"
                            name={key}
                            value={editingUserData[key]}
                            onChange={(e) => setEditingUserData({...editingUserData, [key]: e.target.value})}
                            autoComplete="off"
                        />
                    </div>
                ))}
                <div className="table__btn-row">
                    <button className="btn-hover table__btn" onClick={closeEditModal}>
                        Отменить
                    </button>
                    <button className="btn-hover table__btn" type="submit">
                        Сохранить
                    </button>
                </div>
            </form>
        </Modal>
    );


    const ViewModalContent = selectedUser && (
        <Modal active={selectedUser} setActive={closeViewModal} className="modal-scroll">
            <button className="modal__btn-close" onClick={closeViewModal}/>
            <button className="modal__btn-new table__top-btn" onClick={() => openEditModal(selectedUser)}>
                <img src={Images.edit} alt="edit"/>
            </button>
            <div className="table__modal-title">
                Информация о пользователе
            </div>
            <div className="table__modal-form-wrap">
                {columns.map(column => (
                    <div className="table__modal-row" key={column.accessor}>
                        <div className="table__modal-cell-title">
                            {column.Header}
                        </div>
                        <div className="table__modal-cell">
                            {selectedUser && typeof column.accessor === 'function' ? column.accessor(selectedUser) : ''}
                        </div>
                    </div>
                ))}
            </div>

        </Modal>
    );

    const PreviousPageButton = ({onClick, disabled}) => (
        <button className={`pagination__btn ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
            <img src={Images.arrow} alt="arrow"/>
        </button>
    );

    const NextPageButton = ({onClick, disabled}) => (
        <button className={`pagination__btn ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
            <img src={Images.arrow} alt="arrow"/>
        </button>
    );

    const PageButtons = (
        <div className="pagination__wrap">
            <div className="pagination__box">
                <PreviousPageButton onClick={previousPage} disabled={!canPreviousPage}/>
                {Array.from({length: pageCount}, (_, i) => (
                    <button
                        key={i}
                        onClick={() => gotoPage(i)}
                        className={`pagination__btn-op ${pageIndex === i ? 'active' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <NextPageButton onClick={nextPage} disabled={!canNextPage}/>
            </div>
        </div>
    );

    return (
        <main id="main" className="main">
            <div className="table__top-wrap">
                <div className="table__top-box">
                    <div className="table__top-select">
                        <TableFilter data={data} onChange={handleFilterChange}/>
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
                                        <td key={index} className="table__body-cell truncate">{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    {PageButtons}
                </>
            ) : (
                <TableMobile/>
            )}
            {EditModalContent}
            {ModalContent}
            {ViewModalContent}
        </main>
    );
}

export default MainTable;