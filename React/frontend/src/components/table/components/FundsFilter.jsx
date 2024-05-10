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
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const uniqueFunds = getUniqueFunds();
        setOptions(uniqueFunds);
    }, [data]);

    const handleChange = (selectedOption) => {
        onChange(selectedOption);
        console.log(selectedOption);
    };

    const handleMenuOpen = () => {
        setIsOpen(true);
    };

    const handleMenuClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Select
                classNamePrefix='select'
                onChange={handleChange}
                options={options}
                isClearable={true}
                placeholder="Выбрать фонд..."
                onMenuOpen={handleMenuOpen}
                onMenuClose={handleMenuClose}
            />
            <div className={`stub ${isOpen ? 'active' : ''}`}>
            </div>
        </>
    );
};

export default TableFilter;