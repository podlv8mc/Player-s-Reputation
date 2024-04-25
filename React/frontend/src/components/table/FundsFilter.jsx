import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const TableFilter = ({ data, onChange }) => {
    // Функция для получения уникальных значений поля "Фонд"
    const getUniqueFunds = () => {
        const uniqueFunds = new Set(); // Используем Set для хранения уникальных значений
        data.forEach(row => {
            const fund = row.fund.name;
            if (fund) {
                uniqueFunds.add(fund); // Добавляем значение поля "Фонд" в множество
            }
        });
        return Array.from(uniqueFunds).map(fund => ({ value: fund, label: fund }));
    };

    const [options, setOptions] = useState(getUniqueFunds()); // Получаем уникальные фонды при монтировании компонента

    const handleChange = (selectedOption) => {
        onChange(selectedOption); // Изменение передаваемого значения
    };

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
