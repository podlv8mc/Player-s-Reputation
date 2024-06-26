import React, {useState, useEffect} from 'react';
import {useTable, usePagination, useFilters} from 'react-table';
import axios from "axios";
import domain from "@/domain";
import Images from '@/image/image';
import Modal from '@/components/main/modal/Modal';
import TableFilter from "@/components/table/components/FundsFilter";
import SelectSigns from "@/components/table/components/SelectSigns";
import SelectRole from "@/components/table/components/SelectRole";
import PaginationButtons from "@/components/table/components/PaginationButtons";
import MobTable from "@/components/table/components/MobTable";
import AdminWrapper from "@/components/table/components/AdminWrapper";
import ChangeSelectSigns from "@/components/table/components/ChangeSelectSigns";

function Table({apiLink, columns, inputLabels, newUserData, setNewUserData, modalTitle, modalHeader}) {
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
    const [selectedFund, setSelectedFund] = useState(null);
    const [selectedFundEdit, setSelectedFundEdit] = useState(null);
    const [filterValue, setFilterValue] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [tot, setTot] = useState([]);
    const [n, setN] = useState(0);
    const [error, setError] = useState(null);
    const [deleteContent, setDeleteContent] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [fetchingFunds, setFetchingFunds] = useState([]);
    const [passwordReset, setPasswordReset] = useState(null);
    const [nullifaer, setNullifaer] = useState(0)
    let totalPages = 0;

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
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: {pageIndex: nullifaer},
            manualPagination: true,
            pageCount: n,
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
            if (totalPages === 0) {
                totalPages = Math.ceil(Number(response.data.total) / 10);
                console.log(pageIndex)
                setN(totalPages);
            }
            if (totalPages > 1) {
                axios.get(`${domain}${apiLink}/?page=${pageIndex + 1}&size=10`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                }).then(r => {
                        setData(r.data.items)
                        console.log(r.data.items)
                    }
                )
            } else {
                axios.get(`${domain}${apiLink}/?page=1&size=100`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                }).then((data1) => {
                    setData(data1.data.items);
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
    }, [nullifaer]);

    console.log(pageIndex)
    console.log(nullifaer)

    //===----- / Connection -----===//

    //===----- Copy -----===//

    useEffect(() => {
        const handleCopy = (e) => {
            e.preventDefault();
        };

        document.addEventListener('copy', handleCopy);

        return () => {
            document.removeEventListener('copy', handleCopy);
        };
    }, []);

    //===----- / Copy -----===//

    //===----- UseEffect -----===//

    useEffect(() => {
        if (Array.isArray(selectedFund)) {
            const selectedFundIds = selectedFund.map(fund => fund.value);
            setFetchingFunds(selectedFundIds);
        }
    }, [selectedFund]);

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

    //===----- Modal window logic -----===//

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

    const closeEditModal = (e) => {
        e.preventDefault();
        setIsEditModalOpen(false);
    };

    const openDeleteModal = () => {
        setDeleteModal(true)
    };

    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    const openResetPasswordModal = (user) => {
        setSelectedUser(user);
        setPasswordReset(true);
    };

    const closeResetPasswordModal = () => {
        setPasswordReset(false)
    }

    //===----- / Modal window logic -----===//

    //===----- Sending -----===//

    const handleChange = e => {
        const {name, value} = e.target;
        setNewUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        let requestPromise;
        let requestUrl;

        const createdAt = new Date().toISOString();
        const commonData = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        };

        if (apiLink === "records") {
            const userDataWithTimestamp = {
                ...newUserData,
                createdAt: createdAt,
                fund_id: selectedOption ? selectedOption.value : null,
            };
            requestUrl = `${domain}records`;
            requestPromise = axios.post(requestUrl, userDataWithTimestamp, commonData);
        } else if (apiLink === "funds") {
            const userDataWithTimestamp = {
                ...newUserData,
                email: "string@gmail.com",
            };
            requestUrl = `${domain}funds`;
            requestPromise = axios.post(requestUrl, userDataWithTimestamp, commonData);
        } else if (apiLink === "users") {
            const userDataWithTimestamp = {
                ...newUserData,
                created_at: createdAt,
                role: selectedOption ? selectedOption.value : null,
                is_active: true,
                is_superuser: false,
                is_verified: false,
                funds: selectedFund ? fetchingFunds : null,
            };
            requestUrl = `${domain}register`;
            requestPromise = axios.post(requestUrl, userDataWithTimestamp, commonData);
        } else {
            console.error("Invalid apiLink:", apiLink);
            return;
        }

        requestPromise
            .then(response => {
                setIsModalOpen(false);
                //window.location.reload()
            })
            .catch(error => {
                console.error("Request error:", error);
                if (error.response && error.response.status === 500) {
                    setError("Такой пользователь уже существует");
                } else {

                }
            })
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        };

        let dataToSend;

        if (apiLink === "users") {
            dataToSend = {...editingUserData, funds: selectedFundEdit};
            console.log(dataToSend);
        }

        axios.patch(`${domain}${apiLink}/${editingUserData.id}`, dataToSend, config)
            .then((response) => {
                //setIsEditModalOpen(false);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDeleteUser = () => {
        axios.delete(`${domain}${apiLink}/${deleteContent}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(() => {
                closeDeleteModal();
                setData(data.filter(user => user.id !== deleteContent));
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleResetPassword = async () => {
        const newPassword = generateRandomPassword();

        const userUpdateUrl = `${domain}users/${selectedUser.id}`;

        try {
            await axios.patch(userUpdateUrl, {password: newPassword, role: selectedUser.role}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            alert("Пароль был успешно сброшен и отправлен на почту.");
            closeResetPasswordModal();

        } catch (error) {
            alert("Произошла ошибка при сбросе пароля.");
        }
    };

    //===----- / Sending -----===//

    //===----- Modal Window -----===//

    const ModalContent = (
        <Modal active={isModalOpen} setActive={setIsModalOpen} className="modal-scroll">
            <button className="modal__btn-close" onClick={() => setIsModalOpen(false)}/>
            <div className="table__modal-title">
                Добавить {modalTitle}
            </div>
            <form className="table__modal-form-wrap" onSubmit={handleSubmit}>
                {apiLink === "records" ? (
                    <>
                        {Object.keys(newUserData).map((key, index, array) => (
                            <div className={`table__modal-row${index === array.length - 1 ? ' hidden' : ''}`} key={key}>
                                <label className="table__modal-cell-title" htmlFor={key}>
                                    {inputLabels[key]}
                                </label>
                                <input
                                    className="table__modal-cell"
                                    placeholder={`${inputLabels[key]}...`}
                                    id={key}
                                    name={key}
                                    value={newUserData[key]}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                        ))}
                        <SelectSigns onSelect={setSelectedOption}/>
                    </>
                ) : apiLink === "funds" ? (
                    <>
                        {Object.keys(newUserData).map((key) => (
                            <div className="table__modal-row">
                                <label className="table__modal-cell-title" htmlFor={key}>
                                    {inputLabels[key]}
                                </label>
                                <input
                                    className="table__modal-cell"
                                    placeholder={`${inputLabels[key]}...`}
                                    id={key}
                                    name={key}
                                    value={newUserData[key]}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                        ))}
                    </>
                ) : apiLink === "users" ? (
                    <>
                        {Object.keys(newUserData).map((key,) => (
                            <div className="table__modal-row">
                                <label className="table__modal-cell-title" htmlFor={key}>
                                    {inputLabels[key]}
                                </label>
                                <input
                                    className="table__modal-cell"
                                    placeholder={`${inputLabels[key]}...`}
                                    id={key}
                                    name={key}
                                    value={newUserData[key]}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                        ))}
                        <SelectSigns onSelect={setSelectedFund} isMulti={true}/>
                        <SelectRole onSelect={setSelectedOption}/>
                        {error && <div className="massage__error">{error}</div>}
                    </>
                ) : null}
                <button className="btn-hover table__btn" type="submit">
                    Добавить
                </button>
            </form>
        </Modal>
    );

    const EditModalContent = editingUserData && (
        <Modal active={isEditModalOpen} setActive={setIsEditModalOpen} className="edit-modal modal-scroll modal-bg">
            <div className="table__modal-title">
                Редактировать {modalTitle}
            </div>
            <form className="table__modal-form-wrap" onSubmit={handleEditSubmit}>
                {apiLink === "records" ? (
                    <>
                        {Object.entries(newUserData).map(([key,], index, array) => (
                            <div className={`table__modal-row${index === array.length - 1 ? ' hidden' : ''}`} key={key}>
                                <label className="table__modal-cell-title" htmlFor={key}>
                                    {inputLabels[key]}
                                </label>
                                <input
                                    className="table__modal-cell"
                                    placeholder={`${inputLabels[key]}...`}
                                    id={key}
                                    type="text"
                                    name={key}
                                    value={editingUserData[key]}
                                    onChange={(e) => setEditingUserData({...editingUserData, [key]: e.target.value})}
                                    autoComplete="off"
                                />
                            </div>
                        ))}
                    </>
                ) : apiLink === "funds" ? (
                    <>
                        {Object.entries(newUserData).map(([key,]) => (
                            <div className="table__modal-row">
                                <label className="table__modal-cell-title" htmlFor={key}>
                                    {inputLabels[key]}
                                </label>
                                <input
                                    className="table__modal-cell"
                                    placeholder={`${inputLabels[key]}...`}
                                    id={key}
                                    type="text"
                                    name={key}
                                    value={editingUserData[key]}
                                    onChange={(e) => setEditingUserData({...editingUserData, [key]: e.target.value})}
                                    autoComplete="off"
                                />
                            </div>
                        ))}
                    </>
                ) : apiLink === "users" ? (
                    <>
                        {Object.entries(newUserData).map(([key,],) => (
                            <div className="table__modal-row">
                                <label className="table__modal-cell-title" htmlFor={key}>
                                    {inputLabels[key]}
                                </label>
                                <input
                                    className="table__modal-cell"
                                    placeholder={`${inputLabels[key]}...`}
                                    id={key}
                                    type="text"
                                    name={key}
                                    value={editingUserData[key]}
                                    onChange={(e) => {
                                        setEditingUserData({...editingUserData, [key]: e.target.value})
                                    }}
                                    autoComplete="off"
                                    disabled={key === "username" || key === "password"}
                                />
                            </div>
                        ))}
                        <ChangeSelectSigns onSelect={setSelectedFundEdit} isMulti={true} currentUser={selectedUser}/>
                    </>
                ) : null}
                <div className="table__btn-row">
                    <button className="btn-hover table__btn" onClick={closeEditModal}>
                        Отменить
                    </button>
                    {/*   {apiLink === "users" ? (
                        <button className="btn-hover table__btn"
                                onClick={() => openResetPasswordModal(editingUserData)}>
                            Сбросить пароль
                        </button>
                    ) : null}
                    */}
                    <button className="btn-hover table__btn" type="submit">
                        Сохранить
                    </button>
                </div>
            </form>
        </Modal>
    );

    const ResetPassword = passwordReset && (
        <Modal active={passwordReset} setActive={closeResetPasswordModal} className="reset-password">
            <h3>
                Вы уверены что хотите сбросить пароль?
            </h3>
            <div className="table__btn-row">
                <button className="btn-hover table__btn" onClick={closeResetPasswordModal}>
                    Отменить
                </button>
                <button className="btn-hover table__btn" onClick={handleResetPassword}>
                    Сбросить пароль
                </button>
            </div>
        </Modal>
    );

    const ViewModalContent = selectedUser && (
        <Modal active={selectedUser} setActive={closeViewModal} className="modal-scroll modal__mob">
            <button className="modal__btn-close" onClick={closeViewModal}/>
            <AdminWrapper>
                <button className="modal__btn-new table__top-btn" onClick={() => openEditModal(selectedUser)}>
                    <img src={Images.edit} alt="edit"/>
                </button>
            </AdminWrapper>
            <div className="table__modal-title">
                Информация о {modalHeader}
            </div>
            <div className="table__modal-form-wrap">
                {columns.map(column => {
                    const isHidden = selectedUser && typeof column.accessor === 'function' && column.accessor(selectedUser) === selectedUser.id;

                    return (
                        <div className={`table__modal-row ${isHidden ? 'hidden' : ''}`} key={column.accessor}>
                            <div className="table__modal-cell-title">
                                {column.Header}
                            </div>
                            <div className="table__modal-cell">
                                {selectedUser && typeof column.accessor === 'function' ? column.accessor(selectedUser) : ''}
                            </div>
                        </div>
                    );
                })}

            </div>
            <AdminWrapper>
                <div className="table__btn-row">
                    <button className="btn-hover table__btn" onClick={openDeleteModal}>
                        Удалить {modalTitle}
                    </button>
                </div>
            </AdminWrapper>
        </Modal>
    );

    const DeleteModalContent = deleteContent && (
        <Modal active={deleteModal} setActive={closeDeleteModal}>
            <h3>
                Вы уверены что хотите удалить {modalTitle}?
            </h3>
            <div className="table__btn-row">
                <button className="btn-hover table__btn" onClick={closeDeleteModal}>
                    Отменить
                </button>
                <button className="btn-hover table__btn" onClick={handleDeleteUser}>
                    Удалить {modalTitle}
                </button>
            </div>
        </Modal>
    )

    //===----- / Modal Window -----===//

    //===----- Buttons -----===//

    const toggleFilterInput = () => {
        setFilterInputVisible(!filterInputVisible);
        setFilterInput('');
    };

    //===----- / Buttons -----===//

    //===----- Filter -----===//

    const handleFilterChange = (selectedOption) => {
        setFilterValue(selectedOption ? selectedOption.value : null);
    };

    //===----- / Filter -----===//

    return (
        <>
            <div className="table__top-wrap">
                <div className="table__top-box">
                    <div className="table__top-select">
                        {/* apiLink === "records" ? ({
                            // <TableFilter data={data} onChange={handleFilterChange}/>
                        }) : null*/}
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
                                {headerGroup.headers.map((column, index) => (
                                    <th
                                        key={index}
                                        className={`table__headers ${index === 0 ? 'hidden' : ''}`}
                                        {...column.getHeaderProps()}>
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
                                    onClick={() => {
                                        openViewModal(row.original)
                                        setDeleteContent(row.cells[0].value)
                                    }
                                    }>
                                    {row.cells.map((cell, index) => (
                                        <td
                                            key={index}
                                            className={`table__body-cell truncate ${index === 0 ? 'hidden' : ''}`}>
                                            {cell.render('Cell')}
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
                        setNullifaer={setNullifaer}

                    />
                </>
            ) : (
                <MobTable
                    columns={columns}
                    apiLink={apiLink}
                    openViewModal={openViewModal}
                    data={data}
                    filteredData={filteredData}
                    tot={tot}
                    setN={setN}
                />
            )}
            {EditModalContent}
            {ModalContent}
            {ViewModalContent}
            {DeleteModalContent}
            {ResetPassword}
        </>
    );
}

export default Table;