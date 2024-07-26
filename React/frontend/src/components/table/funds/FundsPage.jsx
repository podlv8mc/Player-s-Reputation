import React, {useState} from 'react';
import Table from "@/components/table/components/Table";

function FundsPage() {
    const apiLink = "funds?size=100";

    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: row => row.id,
            },
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

    return (
        <>
            <Table
                apiLink={apiLink}
                columns={columns}
                inputLabels={inputLabels}
                newUserData={newUserData}
                setNewUserData={setNewUserData}
                modalTitle="Фонд"
                modalHeader="Фонде"
            />
        </>
    );
}

export default FundsPage;
