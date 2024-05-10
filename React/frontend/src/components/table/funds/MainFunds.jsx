import React, {useState, useEffect} from 'react';
import {useTable, usePagination, useFilters} from 'react-table';
import Modal from '@/components/main/modal/Modal';
import Images from '@/image/image';
import axios from "axios";
import domain from "@/domain";
import PaginationButtons from "@/components/table/components/PaginationButtons";
import MobTable from "@/components/table/components/MobTable";

function MainFunds() {
    const [data, setData] = useState([]);
    const [filterInput, setFilterInput] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUserData, setEditingUserData] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterInputVisible, setFilterInputVisible] = useState(false);
    const [fundSelect, setfundSelect] = useState();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [total, setTotal] = useState(0)
    const [nullifaer, setNullifaer] = useState(0)

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

    const [newUserData, setNewUserData] = useState({
        name: "",
        discord: "",
        link: "",
        //email: "",
    });

    const inputLabels = {
        name: "Название",
        discord: "Discord",
        link: "Сайт",
        //email: "Email",
    };

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
            data: data,
            initialState: {pageIndex: nullifaer, filters: [],},
            manualPagination: true,
            pageCount: Math.ceil(total / 10),
        },
        useFilters,
        usePagination
    );

    useEffect(() => {
        axios.get(`${domain}funds`, {
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

    useEffect(() => {
        axios.get(`${domain}funds/?page=${pageIndex + 1}&size=10`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((data1) => {
            setData(Array.isArray(data1.data.items) ? data1.data.items : []);
        })
    }, [pageIndex]);

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

        axios.post(`${domain}funds`, newUserData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .catch((error) => {
                console.error(error);
                console.log(newUserData)
            });

        setIsModalOpen(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        axios.patch(`${domain}funds/${editingUserData.id}`, editingUserData, {
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

    const toggleFilterInput = () => {
        setFilterInputVisible(!filterInputVisible);
        setFilterInput('');
    };


    const ModalContent = (
        <Modal active={isModalOpen} setActive={setIsModalOpen} className="modal-scroll">
            <button className="modal__btn-close" onClick={() => setIsModalOpen(false)}/>
            <div className="table__modal-title">
                Добавить Фонд
            </div>
            <form className="table__modal-form-wrap" onSubmit={handleSubmit}>
                {Object.keys(newUserData).map((key) => (
                    <div className="table__modal-row">
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

                <button className="btn-hover table__btn" type="submit">
                    Добавить
                </button>
            </form>
        </Modal>
    );

    const EditModalContent = editingUserData && (
        <Modal active={isEditModalOpen} setActive={setIsEditModalOpen} className="edit-modal modal-scroll modal-bg">
            <div className="table__modal-title">
                Редактировать Фонд
            </div>
            <form className="table__modal-form-wrap" onSubmit={handleEditSubmit}>
                {Object.entries(newUserData).map(([key,]) => (
                    <div className="table__modal-row">
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
        <Modal active={selectedUser} setActive={closeViewModal} className="modal-scroll modal__mob">
            <button className="modal__btn-close" onClick={closeViewModal}/>
            <button className="modal__btn-new table__top-btn" onClick={() => openEditModal(selectedUser)}>
                <img src={Images.edit} alt="edit"/>
            </button>
            <div className="table__modal-title">
                Информация о Фонде
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
                    <PaginationButtons
                        pageIndex={pageIndex}
                        pageCount={pageCount}
                        gotoPage={gotoPage}
                        setNullifaer={setNullifaer}
                    />
                </>
            ) : (
                <MobTable
                    columns={columns}
                    openViewModal={openViewModal}
                    url="funds"
                />
            )}
            {EditModalContent}
            {ModalContent}
            {ViewModalContent}
        </main>
    );
}

export default MainFunds;