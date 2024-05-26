import React, {useState} from 'react';
import Table from "@/components/table/components/Table";

function UsersPage() {
    const apiLink = "users";

    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: row => row.id,
            },
            {
                Header: 'Логин',
                accessor: row => row.username,
            },
            {
                Header: 'Имя пользователя',
                accessor: row => row.name,
            },
            {
                Header: 'Discord',
                accessor: row => row.discord,
            },
            {
                Header: 'Фонд',
                accessor: row => row.funds,
            },
            {
                Header: 'Email',
                accessor: row => row.email,
            },
        ],
        []
    );

    const [newUserData, setNewUserData] = useState({
        username: "",
        name: "",
        discord: "",
        email: "",
        password: "",
    });

    const inputLabels = {
        username: "Логин",
        name: "Имя пользователя",
        discord: "Discord",
        email: "Email",
        password: "Пароль",
    };

    return (
        <>
            <Table
                apiLink={apiLink}
                columns={columns}
                inputLabels={inputLabels}
                newUserData={newUserData}
                setNewUserData={setNewUserData}
                modalTitle="пользователя"
                modalHeader="пользователе"
            />
        </>
    );
}

export default UsersPage;