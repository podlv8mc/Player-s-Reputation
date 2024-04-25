import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const TableFilter = ({ data, onChange }) => {
    // Функция для получения уникальных значений поля "Фонд"
    const getUniqueFunds = () => {
        console.log('Getting unique funds...');
        const uniqueFunds = new Set(); // Используем Set для хранения уникальных значений
        data.forEach(row => {
            const fund = row.fund.name;
            if (fund) {
                uniqueFunds.add(fund); // Добавляем значение поля "Фонд" в множество
            }
        });
        return Array.from(uniqueFunds).map(fund => ({ value: fund, label: fund }));
    };

    const [options, setOptions] = useState([]);

    useEffect(() => {
        console.log('Updating options...');
        const uniqueFunds = getUniqueFunds();
        console.log('Unique funds:', uniqueFunds);
        setOptions(uniqueFunds); // Обновляем список уникальных фондов при изменении данных
    }, [data]);

    const handleChange = (selectedOption) => {
        console.log('Selected option:', selectedOption);
        onChange(selectedOption); // Изменение передаваемого значения
    };

    console.log('Rendering TableFilter with options:', options);

    return (
        <Select
            classNamePrefix='select'
            onChange={handleChange}
            options={options}
            isClearable={true}
            placeholder="Select filter..."
        />
    );
};

export default TableFilter;