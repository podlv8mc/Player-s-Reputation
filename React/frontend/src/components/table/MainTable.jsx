import React, { useState } from 'react';
import Select from 'react-select';
import TableBody from "@/components/table/TableBody";
import axios, {Axios} from "axios";
import {data} from "autoprefixer";


function MainTable() {

    const instance = axios.create({
        baseURL: 'http://jsonplaceholder.typicode.com'
    })

    instance.get('/posts').then(data => console.log(data.data))








    const [selectedTable, setSelectedTable] = useState('table1');


    const handleChange = (selectedOption) => {
        setSelectedTable(selectedOption.value);
    };

    const tableData = {
        table1: {
            columns: [
                { Header: 'Фонд', accessor: 'fund' },
                { Header: 'Создано', accessor: 'date' },
                { Header: 'Обновлено', accessor: 'update' },
            ],
            data: [
                { fund: 'Abwbev', date: '29.09.24', update: '29.09.24' },
                { fund: 'Abwbev', date: '29.09.24', update: '29.09.24' },
            ],
        },
        table2: {
            columns: [
                { Header: 'Фонд', accessor: 'fund' },
                { Header: 'Создано', accessor: 'date' },
                { Header: 'Обновлено', accessor: 'update' },
            ],
            data: [
                { fund: 'bruh', date: '-', update: '-' },
                { fund: '-', date: '-', update: '-' },
            ],
        },
        table3: {
            columns: [
                { Header: 'Фонд', accessor: 'fund' },
                { Header: 'Создано', accessor: 'date' },
                { Header: 'Обновлено', accessor: 'update' },
            ],
            data: [
                { fund: '+', date: '+', update: '+' },
                { fund: '+', date: '+', update: 'lol' },
            ],
        },
    };

    const options = [
        { value: 'table1', label: 'Table 1' },
        { value: 'table2', label: 'Table 2' },
        { value: 'table3', label: 'Table 3' }
    ]

    return (
        <main id="main" className="main">
            <div className="">
                <Select classNamePrefix='select' value={options.find(option => option.value === selectedTable)} options={options} onChange={handleChange} />
            </div>
            <TableBody columns={tableData[selectedTable].columns} data={tableData[selectedTable].data} />
        </main>
    );
}

export default MainTable;
