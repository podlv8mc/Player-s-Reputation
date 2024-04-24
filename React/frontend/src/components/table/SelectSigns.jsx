import React, { useState, useEffect } from "react";
import Select from "react-select";

function SelectSigns() {
    const [fundId, setFundId] = useState(1);
    const [selectedOption, setSelectedOption] = useState({ value: 1, label: 'Бастион' });

    const optionsFounds = [
        { value: 1, label: 'Бастион' },
        { value: 2, label: 'Пират' },
    ];

    useEffect(() => {
        setSelectedOption(optionsFounds.find(option => option.value === fundId));
    }, [fundId, optionsFounds]);

    const handleSelectChange = (selectedOption) => {
        setFundId(selectedOption.value);
    };

    return (
        <div className="table__modal-row">
            <label className="table__modal-cell-title">Fund ID</label>
            <Select
                classNamePrefix='select'
                value={selectedOption}
                onChange={handleSelectChange}
                options={optionsFounds}
            />
        </div>
    );
}

export default SelectSigns;
