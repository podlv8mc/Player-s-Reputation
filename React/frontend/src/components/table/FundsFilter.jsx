import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const TableFilter = ({ data, onChange }) => {
    const getUniqueFunds = () => {
        const uniqueFunds = new Set();
        data.forEach(row => {
            const fund = row.fund.name;
            if (fund) {
                uniqueFunds.add(fund);
            }
        });
        return Array.from(uniqueFunds).map(fund => ({ value: fund, label: fund }));
    };

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const uniqueFunds = getUniqueFunds();
        setOptions(uniqueFunds);
    }, [data]);

    const handleChange = (selectedOption) => {
        onChange(selectedOption);
    };

    return (
        <Select
            classNamePrefix='select'
            onChange={handleChange}
            options={options}
            isClearable={true}
            placeholder="Выбрать фонд..."
        />
    );
};

export default TableFilter;
