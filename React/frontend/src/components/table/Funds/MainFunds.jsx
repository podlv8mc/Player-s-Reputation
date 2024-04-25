import React, {useState, useEffect} from 'react';
import {useTable, usePagination, useFilters} from 'react-table';
import Modal from '@/components/main/modal/Modal';
import Images from '@/image/image';
import axios from "axios";
import SelectSigns from "@/components/table/SelectSigns";

function MainFunds() {
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

    const [newUserData, setNewUserData] = useState({
        name: "",
        discord: "",
        link: "",
    });

    const inputLabels = {
        name: "Название",
        discord: "Discord",
        link: "Сайт",
    };

    useEffect(() => {
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/funds', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setData(Array.isArray(data.data.items) ? data.data.items : []);
        }).catch(() => {
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

    useEffect(() => {
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/funds', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            console.log(data);
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

        console.log(userDataWithTimestamp);
        axios.post("http://213-134-31-78.netherlands.vps.ac/api/v1/funds", userDataWithTimestamp, {
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
        axios.patch(`http://213-134-31-78.netherlands.vps.ac/api/v1/funds/${editingUserData.id}`, editingUserData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((response) => {
                console.log(response.data);
                setIsEditModalOpen(false);
            })
            .catch((error) => {
                console.error(error);
            })

    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Название',
                accessor: row => row.name,
            },
            {
                Header: 'Discord',
                accessor: row => row.discord,
            },
            {
                Header: 'Сайт',
                accessor: row => row.link,
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
            initialState: {pageIndex: 0, filters: []},
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
        <Modal active={isEditModalOpen} setActive={setIsEditModalOpen} className="edit-modal modal-scroll">
            <div className="table__modal-title">
                Редактировать пользователя
            </div>
            <form className="table__modal-form-wrap" onSubmit={handleEditSubmit}>
                {Object.entries(newUserData).map(([key,]) => (
                    <div className="table__modal-row" key={key}>
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
            {EditModalContent}
            {ModalContent}
            {ViewModalContent}
        </main>
    );
}

export default MainFunds;