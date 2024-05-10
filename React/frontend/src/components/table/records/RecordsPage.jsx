import React, {useState} from 'react';
import Table from "@/components/table/components/Table";

function RecordsPage() {
    const apiLink = "records";

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
        vk: "Вконтакте",
        facebook: "Facebook",
        blog: "Блог",
        forum: "Форум",
        instagram: "Instagram",
        ecopayz: "Ecopayz",
        webmoney_id: "Webmoney",
        comments: "Комментарии",
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

export default RecordsPage;