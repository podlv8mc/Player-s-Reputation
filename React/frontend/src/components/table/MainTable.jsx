import React, {useState, useEffect} from 'react';
import {useTable, usePagination, useFilters} from 'react-table';
import Modal from '@/components/main/modal/Modal';
import Images from '@/image/image';
import axios from "axios";
import Select from "react-select";

function MainTable() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterInput, setFilterInput] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUserData, setEditingUserData] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterInputVisible, setFilterInputVisible] = useState(false);


    const [newUserData, setNewUserData] = useState({
        first_name: "",
        last_name: "",
        middlename: "",
        nicknames: [
            {
                room_name: "",
                nickname: ""
            },
            null
        ],
        gipsyteam: "",
        pokerstrategy: "",
        description: "",
        amount: "",
        google: "",
        mail: "",
        vk: "",
        facebook: "",
        blog: "",
        instagram: "",
        forum: "",
        neteller: "",
        skrill: "",
        ecopayz: "",
        webmoney_id: "",
        wallets: "",
        old: true,
        nicknameOld: "",
        comments: "",
        country: "",
        town: "",
        address: "",
        fund_id: 0
    });

    const inputLabels = {
        nicknameOld: "Ники",
        last_name: "Фамилия",
        first_name: "Имя",
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
        fund_id: "Found Id",
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

    const toggleModal = () => {
        const ll = document.querySelector('.ll');
        const bb = document.querySelector('.bb');
        const modalBtn = document.querySelector('.modal__btn-new');

        if (ll.classList.contains('hidden')) {
            ll.classList.remove('hidden');
            bb.classList.add('hidden');
            modalBtn.classList.remove('hidden');
        } else {
            ll.classList.add('hidden');
            bb.classList.remove('hidden');
            modalBtn.classList.add('hidden');
        }
    };

    useEffect(() => {
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/records', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setData(Array.isArray(data.data.items) ? data.data.items : []);
        }).catch((data) => {
            alert("Авторизируйтесь!")
            window.location.href = "/"
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
            createdAt: createdAt
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
                console.log(response.data);
                setIsModalOpen(false);
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
                accessor: row => (row.nicknames && row.nicknames.length > 0) ? row.nicknames[0].room_name : '',
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
                Header: 'Old',
                accessor: row => row.old,
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
                Header: 'Found id',
                accessor: row => row.fund_id,
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
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: {pageIndex: 0},
        },
        useFilters,
        usePagination
    );

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
                {Object.keys(newUserData).map(key => (
                    <div className="table__modal-row" key={key}>
                        <label className="table__modal-cell-title" htmlFor={key}>{inputLabels[key]}</label>
                        <input
                            className="table__modal-cell"
                            id={key}
                            type="text"
                            name={key}
                            value={newUserData[key]}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                ))}
                <div className="table__modal-row">
                    <label className="table__modal-cell-title">
                        Found ID
                    </label>

                </div>
                <button className="btn-hover table__btn" type="submit">
                    Добавить
                </button>
            </form>
        </Modal>
    );

    const ViewModalContent = selectedUser && (
        <Modal active={selectedUser !== null} setActive={closeViewModal} className="modal-scroll">
            <button className="modal__btn-close" onClick={closeViewModal}/>
            <button className={`modal__btn-new table__top-btn ${isModalOpen ? 'hidden' : ''}`} onClick={toggleModal}>
                <img src={Images.edit} alt="edit"/>
            </button>
            <div className={`ll ${isModalOpen ? 'hidden' : ''}`}>
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
            </div>
            <div className={`bb hidden ${isModalOpen ? '' : 'hidden'}`}>
                <div className="table__modal-title">
                    Редактировать пользователя
                </div>
                <form className="table__modal-form-wrap" onSubmit={handleEditSubmit}>
                    {/* Определяем массив с информацией о полях */}
                    {Object.entries(newUserData).map(([key, value]) => (
                        <div className="table__modal-row" key={key}>
                            <label className="table__modal-cell-title" htmlFor={key}>{inputLabels[key]}</label>
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
                        <button className="btn-hover table__btn" onClick={toggleModal}>
                            Отменить
                        </button>
                        <button className="btn-hover table__btn" type="submit">
                            Сохранить
                        </button>
                    </div>
                </form>
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

                    </div>
                    <div className="table__top">
                        <input
                            className={filterInputVisible ? "input__search" : "input__search input__search-op"}
                            value={filterInput}
                            onChange={e => setFilterInput(e.target.value)}
                            placeholder="Поиск..."
                        />
                        <button className="table__top-btn" onClick={toggleFilterInput}>
                            <img src={Images.search} alt="search"/>
                        </button>
                        <button className="table__top-btn" onClick={openModal}>
                            <img src={Images.add} alt="add"/>
                        </button>
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
                        <tr className="table__body" {...row.getRowProps()} onClick={() => openViewModal(row.original)}>
                            {row.cells.map((cell, index) => (
                                <td key={index} className="table__body-cell truncate">{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {PageButtons}
            {ModalContent}
            {ViewModalContent}
        </main>
    );
}

export default MainTable;