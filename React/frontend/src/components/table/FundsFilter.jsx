import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const TableFilter = ({ onChange }) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/records', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(response => {
            const options = response.data.items
                .filter(item => item.found) // Фильтруем элементы без поля found
                .map(item => ({
                    value: item.found.id,
                    label: item.found.name
                }));
            setOptions(options);
        }).catch(error => {
            console.error('Error fetching filter options:', error);
        });
    }, []);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onChange(selectedOption ? selectedOption.value : null);
    };

    return (
        <Select
            classNamePrefix='select'
            value={selectedOption}
            onChange={handleChange}
            options={options}
            isClearable={true}
            placeholder="Select filter..."
        />
    );
};

export default TableFilter;
