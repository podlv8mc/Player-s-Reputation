import React, {useState} from 'react';
import Table from "@/components/table/components/Table";

function UsersPage() {
    const apiLink = "users";

    const columns = React.useMemo(
        () => [
            {
                Header: 'Имя пользователя',
                accessor: row => row.username,
            },
            //{
              //  Header: 'Логин',
                //accessor: row => row.name,
            //},
            {
                Header: 'Discord',
                accessor: row => row.discord,
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
        //name: "",
        discord: "",
        email: "",
        password: "",
    });

    const inputLabels = {
        username: "Имя пользователя",
        //name: "Логин",
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
            />
        </>
    );
}

export default UsersPage;